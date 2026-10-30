# Aitor Sáez Tornay — Portfolio

A one-page portfolio presenting Aitor's transition from industrial automation and robotics into web application development, cloud and software engineering.

The site is plain HTML5, CSS and vanilla JavaScript. There is no framework, no build step, no npm install, no CDN, no analytics and no cookies.

## What is included

- Hero introduction with the positioning line from the CV
- About section, including this website as the first portfolio project
- Career transition timeline: Industrial Automation and Robotics → Technical Problem-Solving → Web Application Development → Cloud and Software Engineering
- Field-project gallery grouped by region, with a region filter, five photos, a lightbox, an on-demand K2022 video and intentional no-photo location cards
- Technical skills grouped by CV category
- AWS Academy Cloud Foundations section
- AI-assisted development section
- Current learning goals
- Contact links for email, GitHub and LinkedIn
- Accessible mobile navigation, keyboard-operable lightbox, scroll reveal, active nav highlighting and a scroll-driven timeline
- Reduced-motion support, visible focus styles and semantic landmarks

## File structure

```text
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   └── img/
│       ├── favicon.svg
│       ├── og-cover.png
│       ├── README.txt
│       └── projects/
│           ├── chicago-robot-cell.jpg
│           ├── chicago-teach-pendant.jpg
│           ├── hibrido-robot-detail.jpg
│           ├── k2022.jpg
│           ├── london-handle-bucket-assembly.jpg
│           ├── networking-commissioning.jpg
│           ├── portfolio-website.png
│           └── programming-plc.jpg
├── cv.txt
├── Curriculum Vitae - Aitor Sáez Tornay (2).pdf
├── .gitignore
└── README.md
```

`cv.txt` is the extracted text used as the factual source. The CV PDF and `cv.txt` are not modified by the site. Both are listed in `.gitignore` so they are not published by accident.

## Local preview

From the project root:

```bash
python3 -m http.server 8000
```

On Windows, if `python3` is not available:

```powershell
py -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Opening `index.html` directly also works, but a local server is recommended so relative paths behave like GitHub Pages.

## Deploy to GitHub Pages

1. The repository is already configured as `asaeztornay/aitor-portfolio`. Push this project to the `main` branch. The CV PDF, `cv.txt` and the local prompt file are listed in `.gitignore`; keep them private unless you intend to publish them.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch **main** and folder **/ (root)**.
5. Save. GitHub will publish the site at:

```text
https://asaeztornay.github.io/aitor-portfolio/
```

6. The canonical, Open Graph, Twitter and JSON-LD URLs are already set to `https://asaeztornay.github.io/aitor-portfolio/`. If you rename the repository or use a custom domain, update them together with `og:image` and `twitter:image`.

The site has no build step, so GitHub Pages can serve it directly from the repository root.

## Troubleshooting

If a change works locally but not on GitHub Pages, the browser or the Pages CDN may still be serving cached CSS or JavaScript. Hard-refresh with **Ctrl+F5** (or **Cmd+Shift+R** on macOS). When you change `css/styles.css` or `js/main.js`, update the `?v=YYYYMMDD` query string on both files in `index.html` so browsers fetch the new versions.

## Photos and video

Five field/event photos are published in `assets/img/projects/`:

- `chicago-robot-cell.jpg` — Chicago robot cell
- `chicago-teach-pendant.jpg` — Chicago teach pendant
- `hibrido-robot-detail.jpg` — Quito line detail
- `london-handle-bucket-assembly.jpg` — London handle and bucket assembly
- `k2022.jpg` — K2022 trade fair

Two hands-on photos appear in the Skills section:

- `programming-plc.jpg` — PLC programming and diagnostics in CODESYS
- `networking-commissioning.jpg` — laptops connected to a control cabinet during commissioning

They were auto-oriented, resized to a maximum of 1600 px on the long edge, re-encoded as JPEG at quality 82 and stripped of metadata. Each is under 500 KB.

The remaining locations (Washington, Los Angeles, Toronto, Quebec, Mexico, Cali, Guayaquil, Manta, Trinidad and Tobago, Netherlands, Germany) use intentional "field location" cards instead of photo placeholders. Washington links to Berry Global in Cumberland, Maryland, using the map link supplied by Aitor.

The K2022 card also includes an on-demand video: **K2022 — The future of food packaging** by IML Solutions & Netstal (Vimeo, 2:25). The Vimeo player is not loaded until the visitor presses **Watch the K2022 video**. It uses `dnt=1`, is removed from the page when the dialog closes, and a direct Vimeo link is provided as a fallback.

The unoptimized originals were moved to `../WebAitorSaez-originals/`, outside this repository. The `.gitignore` still lists their old root filenames in case they are ever copied back. `assets/img/README.txt` documents every photo, its card, caption, alt text and source file.

Do not use stock photos. Do not add client names, dates, metrics or technical details that are not in the CV or supplied by Aitor.

## Accessibility notes

- Semantic landmarks: `header`, `nav`, `main`, `section`, `figure`/`figcaption` where photos are added, and `footer`.
- One `h1`; section headings use `h2` and card headings use `h3`/`h4` without skipping levels.
- Skip link to `#main`.
- Mobile menu button uses `aria-expanded` and `aria-controls`; it closes on Escape, on link click and on outside click.
- Active navigation uses `aria-current="location"`.
- Filter buttons use `aria-pressed`; the result count is announced with `role="status"`.
- The lightbox uses a native `<dialog>`, closes on Escape or backdrop click, and returns focus to the trigger.
- The video dialog follows the same pattern: it loads the Vimeo player only when opened, closes on Escape or backdrop click, removes the iframe to stop playback, and returns focus to the trigger.
- `prefers-reduced-motion: reduce` disables the animation and forces the timeline to its completed state.
- Focus styles are visible on all interactive elements.

## SEO

- `lang="en"`
- Unique title and meta description
- Viewport and theme-color
- Open Graph and Twitter card tags
- Canonical placeholder
- JSON-LD `Person` with name, email and an empty `sameAs` array

## Known TODOs

These are intentionally not invented:

- **LinkedIn URL** — set to `https://www.linkedin.com/in/aitor-saez-tornay-765793150/`, found from Aitor's public profile. Confirm it is the correct profile before publishing.
- **Cali and Quebec** — both are written exactly as supplied. The sources do not state the country or province; confirm before publishing.
- **Project dates** — not supplied, so they are not shown.
- **Client names** — omitted except Berry Global, which Aitor supplied with the Washington map link.

## Content sources

- `cv.txt` — name, positioning, profile, skills, experience, education, AWS Academy, AI-assisted development, languages and availability.
- Repository remote — GitHub username `asaeztornay` and repository name `aitor-portfolio`, used for the profile link and the GitHub Pages URL.
- Public LinkedIn profile — the LinkedIn URL, which should be confirmed before publishing.
- User-supplied Vimeo URL — the K2022 video by IML Solutions & Netstal; its title, author and duration were read from Vimeo's public oEmbed metadata.
- User messages — field-project locations, the Chicago and Quito captions, K2022 participation, the London handle/bucket process, the Washington/Berry Global map link, the photo files and their intended cards, and the instruction to present this website as the first portfolio project.

No employers, dates, projects, metrics, certificates, testimonials or photos were invented.
