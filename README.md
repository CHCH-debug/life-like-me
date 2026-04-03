# Life Like Me

`Life Like Me` is a static prototype for a reality-first healing product.

It is not a habit tracker and not a content app.
Its goal is to help low-energy users return to real life through one small, concrete action.

## Structure

```text
life-like-me-site/
  index.html
  assets/
    app.js
    styles.css
  scripts/
    serve.mjs
  .nojekyll
  .gitignore
  README.md
```

## Local Preview

```powershell
node scripts/serve.mjs
```

Open:

```text
http://127.0.0.1:4173/
```

## GitHub Pages

This repo is already arranged for GitHub Pages:

1. Push all files to the repo root
2. In GitHub: `Settings -> Pages`
3. Choose `Deploy from a branch`
4. Select `main` and `/(root)`
5. Save

The site should then be available at:

```text
https://<your-github-username>.github.io/<repo-name>/
```

## Notes

- The site uses only relative asset paths, so it works on GitHub Pages project sites.
- `.nojekyll` avoids GitHub Pages processing surprises for static assets.
- No framework or build step is required for this version.
