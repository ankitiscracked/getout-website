# Getout Website

Public landing page for the Getout desktop application, hosted on Cloudflare Workers.

## Setup

1. **Install dependencies**
   ```bash
   bun install
   ```

2. **Development**
   ```bash
   bun run dev
   ```
   Vite will serve on `http://localhost:5173`

3. **Build**
   ```bash
   bun run build
   ```
   Creates optimized build in `dist/`

4. **Deployment to Cloudflare Workers**

   First, configure your domain in `wrangler.toml`:
   ```toml
   [env.production]
   routes = [
     { pattern = "yourdomain.com/*", zone_name = "yourdomain.com" }
   ]
   ```

   Then deploy:
   ```bash
   bun run deploy
   ```

## Configuration

### DMG Download Link

Update the `DMG_URL` in `src/App.tsx` to point to your actual DMG file location:

```typescript
const DMG_URL = 'https://your-cdn.com/getout.dmg'
```

**Options for hosting the DMG:**
- **GitHub Releases** (recommended): Upload to GitHub and use the direct download link
- **Cloudflare R2**: Object storage with CDN
- **AWS S3**: Simple Storage Service with CloudFront
- **Any public CDN**: As long as it supports direct downloads

### Screenshot

Replace the placeholder image URL in `src/App.tsx`:
```typescript
<img src="https://your-screenshot-url.png" ... />
```

## Design Tokens

The website uses the same design system as the main app:
- **--color-main**: `stone-800` (primary text/UI)
- **--color-secondary**: `stone-600` (secondary text)
- **--color-shade**: `stone-100` (light background)
- **--color-muted**: `stone-300` (borders/dividers)
- **--color-focused**: `stone-200` (hover states)

All styling uses Tailwind CSS with custom theme tokens. See `src/index.css` for definitions.

## Structure

```
website/
├── src/
│   ├── App.tsx          # Main landing page component
│   ├── main.tsx         # React entry point
│   └── index.css        # Tailwind + design tokens
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── wrangler.toml        # Cloudflare configuration
└── tsconfig.json        # TypeScript configuration
```

## Notes

- The download button uses native browser download behavior
- No analytics or tracking included (feel free to add)
- Mobile-responsive design
- Minimal dependencies (React + Tailwind)
