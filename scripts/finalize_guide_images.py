"""Pick stable official aliases + properly redact user screenshots."""
from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OFF = ROOT / "public" / "guide-shots" / "official"
USER = ROOT / "public" / "guide-shots" / "user"
ASSETS = Path(r"C:\Users\catha\.cursor\projects\empty-window\assets")


def font(size: int = 15):
    try:
        return ImageFont.truetype("arial.ttf", size)
    except OSError:
        return ImageFont.load_default()


def cover(im: Image.Image, box: tuple[int, int, int, int], label: str = "") -> None:
    draw = ImageDraw.Draw(im)
    draw.rounded_rectangle(box, radius=5, fill="#C5CEC8", outline="#7A8B83")
    if label:
        draw.text((box[0] + 8, box[1] + 4), label, fill="#24352F", font=font(14))


def set_alias(alias: str, src_name: str) -> None:
    src = OFF / src_name
    if not src.exists():
        print(f"missing {src_name}")
        return
    shutil.copy2(src, OFF / alias)
    print(f"alias {alias} <- {src_name}")


def redact_overview() -> None:
    src = ASSETS / "image-39f9e0c2-bbdb-4ddd-b2f8-7980bb6ce254.png"
    im = Image.open(src).convert("RGB")
    w, h = im.size
    # Employer name on card (left of Employment ID)
    cover(im, (210, 330, 470, 358), "Example employer")
    # Credit euro amounts on the two credit cards
    cover(im, (250, 525, 360, 552), "€X,XXX")
    cover(im, (560, 525, 670, 552), "€X,XXX")
    # Also cover any residual on second line if layout shifted
    cover(im, (250, 505, 360, 525), "")
    cover(im, (560, 505, 670, 525), "")
    out = USER / "manage-tax-overview.png"
    im.save(out, optimize=True)
    print(f"redacted {out.name} {w}x{h}")


def redact_jobs() -> None:
    src = ASSETS / "image-0c4fbe09-6419-4ccd-b0bc-f171203be490.png"
    im = Image.open(src).convert("RGB")
    w, h = im.size
    # Employer + tax ref line
    cover(im, (55, 365, 520, 405), "Example employer (redacted)")
    # Start date value
    cover(im, (55, 455, 280, 495), "Start date: redacted")
    out = USER / "jobs-pensions.png"
    im.save(out, optimize=True)
    print(f"redacted {out.name} {w}x{h}")


def copy_safe() -> None:
    mapping = {
        "paye-services-card.png": "image-5a15e0d8-6318-45a7-9f1c-8ccf1ce8f25f.png",
        "tax-services-grid.png": "image-1aee7040-32bf-4485-9d86-a5475cbddc70.png",
        "review-prior-years.png": "image-b0811f97-4ac5-4f2f-bf41-0e041012eaa0.png",
        "receipts-tracker-home.png": "image-93816683-17e8-464b-9209-650eda9beee2.png",
        "add-receipt-expense.png": "image-9490c3b0-03d2-40a5-be7f-297166879aec.png",
    }
    for dest, src in mapping.items():
        shutil.copy2(ASSETS / src, USER / dest)
        print(f"safe {dest}")


if __name__ == "__main__":
    # Primary: official Revenue manual extracts (stable names)
    set_alias("official-current-credits.png", "38-06-04_p9_7.png")
    set_alias("official-receipts-tracker.png", "38-06-04_p11_8.png")
    set_alias("official-credit-categories.png", "38-06-04_p19_23.png")
    set_alias("official-add-credits-btn.png", "38-06-04_p9_7.png")
    set_alias("official-receipts-from-2020.png", "38-06-06_p5_5.png")
    set_alias("official-paye-card.png", "38-06-04_p11_9.png")
    # homepage from 38-06-06 may be huge marketing shot — keep as optional
    set_alias("official-revenue-home.png", "38-06-06_p1_1.png")

    copy_safe()
    redact_overview()
    redact_jobs()
    print("done")
