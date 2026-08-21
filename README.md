# Dario Curreri CV

Personal curriculum vitae website: [dariocurr.github.io](https://dariocurr.github.io/).

Site uses static HTML, CSS, and JavaScript. GitHub Pages serves published files.

## Local development

Serve repository root with any static-file server. No build step exists.

Install dependencies and run tests:

```sh
npm ci
npm test
```

## Project layout

- `index.html` contains page content.
- `src/css/cv.css` contains site styling.
- `src/js/` contains browser utilities.
- `tests/` contains Jest coverage.

Resume download links point toward [resume repository](https://github.com/dariocurr/resume).

## Deployment

Push static-site changes to `gh-pages` publishing branch. GitHub Pages serves
repository without Jekyll through `.nojekyll`.
