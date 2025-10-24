# Deployment Guide - Northstar Politics Website

## ⚠️ IMPORTANT: Prevent White Screen Issues

### The Golden Rules:

1. **NEVER manually edit the script tag in `index.html`**
   - It should ALWAYS be: `<script type="module" src="/src/main.tsx"></script>`
   - DO NOT use production asset references like `/assets/index-*.js`

2. **NEVER commit the `dist/` folder**
   - It's auto-generated and git-ignored
   - GitHub Actions builds it fresh on each deployment

3. **NEVER deploy manually**
   - Just push to `main` branch
   - GitHub Actions handles everything automatically

---

## Development Workflow

### Local Development
```bash
npm run dev
```
- Runs on http://localhost:3000
- Hot reload enabled
- Uses `/src/main.tsx` entry point

### Testing Production Build Locally
```bash
npm run build
npm run preview
```
- Builds to `dist/` folder
- Preview the production version locally

### Deploying to Production

**Simple Method (Recommended):**
1. Make your changes
2. Commit: `git add . && git commit -m "Your message"`
3. Push: `git push origin main`
4. GitHub Actions automatically builds and deploys!

**What Happens Automatically:**
- GitHub Actions runs `npm run build`
- Only the `dist/` folder contents get deployed
- Your site updates in ~2-3 minutes

---

## File Structure

```
northstar-website/
├── public/              # Static assets (copied to dist/ during build)
│   ├── images/         # All images
│   ├── CNAME          # Custom domain config
│   └── 404.html       # 404 page
├── src/                # Source code (development)
│   ├── components/
│   ├── pages/
│   └── main.tsx       # Entry point
├── dist/               # Production build (NEVER commit this!)
├── index.html          # Development HTML (uses /src/main.tsx)
└── .github/workflows/  # Deployment automation
```

---

## Troubleshooting

### White Screen After Deployment?
**Cause:** Wrong `index.html` script reference

**Fix:**
1. Check `index.html` has: `<script type="module" src="/src/main.tsx"></script>`
2. NOT: `<script src="/assets/index-*.js">`
3. Commit the fix and push again

### Images Not Loading?
**Cause:** Images not in `public/` folder

**Fix:**
1. Move images to `public/images/`
2. Reference as `/images/filename.png` in code
3. Rebuild and deploy

---

## Key Files to Remember

- **`index.html`** - Development entry (uses `/src/main.tsx`)
- **`dist/index.html`** - Auto-generated production entry (uses hashed assets)
- **`.github/workflows/deploy.yml`** - Deployment automation
- **`public/`** - Static files that get copied to production

---

## Questions?

If the site shows a white screen, check:
1. Browser console for errors
2. GitHub Actions tab for build failures  
3. This file for deployment rules

**Remember:** The root `index.html` is for development only. Production uses `dist/index.html` which is auto-generated!


