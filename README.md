# Mayar Mamdouh Mohamed — Portfolio
Static site: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5 (CDN). No build step.

## Run locally
Open `index.html` in a browser, or run `python -m http.server 8000` in this folder and visit http://localhost:8000.

## Customize
- Colors: CSS variables at the top of `css/style.css`.
- Projects: `js/projects.js`. Skills and courses: `js/main.js`.
- Replace every `[Add ...]` placeholder (email in `index.html`, graduation year, project details, GitHub/demo links).
- CV: put the PDF at `assets/resume/Mayar-Mamdouh-Mohamed-CV.pdf`.
- Contact form: set the form's `data-endpoint` to a Formspree URL, or edit `sendForm()` in `js/contact.js` for EmailJS/custom backend.
- Update the canonical URL and Open Graph URL in `index.html` after deploying.

## Upload to GitHub
```
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

## Deploy (GitHub Pages)
Repo Settings → Pages → Source: Deploy from branch → `main` / root. The site appears at `https://<username>.github.io/<repo>/`. Netlify or Vercel also work by dropping in the folder.
