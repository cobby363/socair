# Socair — Irish PAYE relief helper

Local-first web app: plain-English checklist, claim guides, and indicative tax-back estimates for Irish PAYE workers.

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Notes

- No myAccount connection, no ads in this build
- Checklist answers persist in `localStorage`
- Estimate amounts default to `sessionStorage` unless “Remember figures” is checked
- Calculator constants live in `src/data/taxYear2026.ts`
