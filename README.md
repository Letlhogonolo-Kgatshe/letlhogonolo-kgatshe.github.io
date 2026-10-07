# Letlhogonolo Kgatshe: Portfolio

Personal portfolio of **Letlhogonolo Kgatshe**, a final-year Computer Science student in Cape Town and aspiring data analyst.

**Live:** https://letlhogonolo-kgatshe.github.io/

## What's on it

- **Selected projects:** Smart-X (IoT data ingestion and anomaly detection) and SAFE (a FinTech hackathon entry) as featured case studies, plus GLMS, Penny Wise, ABC Retail, Cyber Aware Chatbot and a freelance website (Entice Feed). Each links to its source and demo.
- **Skills** grouped by use, with data and databases first.
- **Experience:** tutoring (40 students a week across 6 modules), mentoring and career centre work.
- **Academic record:** averages per year, with an expandable chart of every module mark.

## Tech

Plain HTML, CSS and JavaScript with no build step or framework. Space Grotesk and Inter fonts. It supports light and dark mode, adapts to phones, respects reduced motion, includes a skip link and a custom 404 page, and is hosted on GitHub Pages.

## Run locally

```bash
npx http-server .
```

## Updating

- **Module marks:** edit the `modules` array in `script.js`. The yearly cards and the chart are generated from it.
- **Projects:** add an `<article class="card">` in `index.html` and put its screenshot in `img/projects/`.
