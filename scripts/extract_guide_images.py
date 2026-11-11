"""Extract official Revenue screenshots and redact user-provided captures."""
from __future__ import annotations

import shutil
from pathlib import Path

import pymupdf
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(r"C:\Users\catha\.cursor\projects\empty-window\assets")
PDF_DIR = Path(r"C:\Users\catha\AppData\Local\Temp\socair-revenue-pdfs")
OFFICIAL = ROOT / "public" / "guide-shots" / "official"
USER = ROOT / "public" / "guide-shots" / "user"
OFFICIAL.mkdir(parents=True, exist_ok=True)
USER.mkdir(parents=True, exist_ok=True)


def extract_official() -> list[dict]:
    kept: list[dict] = []
    # Clear previous official extracts
    for p in OFFICIAL.glob("*.png"):
        p.unlink()

    for pdf_path in sorted(PDF_DIR.glob("*.pdf")):
        doc = pymupdf.open(pdf_path)
        img_i = 0
        for page_index, page in enumerate(doc):
            for img in page.get_images(full=True):
                xref = img[0]
                try:
                    pix = pymupdf.Pixmap(doc, xref)
                except Exception:
                    continue
                if pix.n >= 5:
                    pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
                w, h = pix.width, pix.height
                if w < 320 or h < 140:
                    continue
                # Prefer landscape UI shots / avoid tiny logos
                if w * h < 80_000:
                    continue
                img_i += 1
                name = f"{pdf_path.stem}_p{page_index + 1}_{img_i}.png"
                dest = OFFICIAL / name
                pix.save(str(dest))
                kept.append(
                    {
                        "file": name,
                        "w": w,
                        "h": h,
                        "pdf": pdf_path.name,
                        "page": page_index + 1,
                    }
                )
                print(f"official {name} ({w}x{h}) from {pdf_path.name} p{page_index + 1}")
        doc.close()
    return kept


def cover(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], label: str = "") -> None:
    x0, y0, x1, y1 = box
    draw.rounded_rectangle(box, radius=6, fill="#D7DDD9", outline="#9AA8A1")
    if label:
        try:
            font = ImageFont.truetype("arial.ttf", 16)
        except OSError:
            font = ImageFont.load_default()
        draw.text((x0 + 10, y0 + max(4, (y1 - y0) // 2 - 8)), label, fill="#3D534B", font=font)


def redact_user_images() -> None:
    # Safe copies (no personal stats)
    safe = {
        "paye-services-card.png": "image-5a15e0d8-6318-45a7-9f1c-8ccf1ce8f25f.png",
        "tax-services-grid.png": "image-1aee7040-32bf-4485-9d86-a5475cbddc70.png",
        "review-prior-years.png": "image-b0811f97-4ac5-4f2f-bf41-0e041012eaa0.png",
        "receipts-tracker-home.png": "image-93816683-17e8-464b-9209-650eda9beee2.png",
        "add-receipt-expense.png": "image-9490c3b0-03d2-40a5-be7f-297166879aec.png",
    }
    for dest_name, src_name in safe.items():
        src = ASSETS / src_name
        if src.exists():
            shutil.copy2(src, USER / dest_name)
            print(f"user safe {dest_name}")

    # Overview — redact employer name + credit amounts
    overview_src = ASSETS / "image-39f9e0c2-bbdb-4ddd-b2f8-7980bb6ce254.png"
    if overview_src.exists():
        im = Image.open(overview_src).convert("RGBA")
        w, h = im.size
        draw = ImageDraw.Draw(im)
        # Employer card title area (relative)
        cover(draw, (int(w * 0.22), int(h * 0.38), int(w * 0.48), int(h * 0.42)), "Example employer")
        # Credit amounts
        cover(draw, (int(w * 0.34), int(h * 0.62), int(w * 0.46), int(h * 0.67)), "€X,XXX")
        cover(draw, (int(w * 0.62), int(h * 0.62), int(w * 0.74), int(h * 0.67)), "€X,XXX")
        im.convert("RGB").save(USER / "manage-tax-overview.png", optimize=True)
        print(f"user redacted manage-tax-overview.png ({w}x{h})")

    # Jobs — redact employer + tax ref + start date
    jobs_src = ASSETS / "image-0c4fbe09-6419-4ccd-b0bc-f171203be490.png"
    if jobs_src.exists():
        im = Image.open(jobs_src).convert("RGBA")
        w, h = im.size
        draw = ImageDraw.Draw(im)
        cover(draw, (int(w * 0.06), int(h * 0.62), int(w * 0.55), int(h * 0.70)), "Example employer (redacted)")
        cover(draw, (int(w * 0.06), int(h * 0.78), int(w * 0.28), int(h * 0.86)), "Start date: redacted")
        im.convert("RGB").save(USER / "jobs-pensions.png", optimize=True)
        print(f"user redacted jobs-pensions.png ({w}x{h})")


def pick_official_aliases(kept: list[dict]) -> None:
    """Copy useful extracts to stable filenames for the app."""
    # Prefer larger landscape-ish shots; assign by heuristic + order in manuals
    aliases: dict[str, Path] = {}
    # Sort by area descending within each pdf
    by_pdf: dict[str, list[dict]] = {}
    for item in kept:
        by_pdf.setdefault(item["pdf"], []).append(item)
    for items in by_pdf.values():
        items.sort(key=lambda x: x["w"] * x["h"], reverse=True)

    # Manual 38-06-04 typically has Manage your tax / receipts tracker UI shots
    m04 = by_pdf.get("38-06-04.pdf", [])
    m06 = by_pdf.get("38-06-06.pdf", [])

    def take(items: list[dict], idx: int) -> Path | None:
        if idx < len(items):
            return OFFICIAL / items[idx]["file"]
        return None

    mapping = {
        "official-paye-manage-tax.png": take(m04, 0),
        "official-receipts-tracker.png": take(m04, 1) or take(m06, 0),
        "official-add-receipt.png": take(m04, 2) or take(m06, 1),
        "official-receipt-details.png": take(m04, 3) or take(m06, 2),
        "official-manage-receipts.png": take(m04, 4) or take(m06, 3),
        "official-myaccount-signin.png": take(m06, 0),
    }
    for alias, src in mapping.items():
        if src and src.exists():
            shutil.copy2(src, OFFICIAL / alias)
            print(f"alias {alias} <- {src.name}")


if __name__ == "__main__":
    kept = extract_official()
    pick_official_aliases(kept)
    redact_user_images()
    print("done")
