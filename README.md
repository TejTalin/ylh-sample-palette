# YLH UI Sample — Command Palette

Full multi-page Next.js site using YLH's real color tokens and fonts, with a minimal top bar plus a Cmd/Ctrl+K command palette for navigation, a subtle architectural grid-paper background, and 3D parallax tilt on every card as the cursor moves across it. Working light/dark mode toggle included.

## Run locally
```bash
npm install
npm run dev
```

## Deploy to GitHub Pages
1. Push as its own repo named exactly `ylh-sample-palette` (or update `basePath` in `next.config.js`).
2. `npm run build` → creates `out/`.
3. Use GitHub Actions or push `out/` to a `gh-pages` branch.
4. Enable GitHub Pages: Settings → Pages → Source.

## What's distinct about this sample
- Navigation: Cmd/Ctrl+K command palette (also has a visible "Navigate" button for non-keyboard users)
- Background: static architectural grid-paper, no constant motion
- Animation style: precise clip-path wipes, numbered sections
- Cursor interaction: 3D parallax tilt on every card


