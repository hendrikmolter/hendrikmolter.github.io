# Homepage – how to publish and update

## Files
- `index.html` – all page text (bio, positions, teaching, service, talks)
- `publications.js` – publication list (one line per paper)
- `style.css` – layout and colours (main colour: `--accent` at the top)
- `main.js` – renders publications, filter buttons, email link, BibTeX downloads
- `venues.js` – proceedings details (full name, series, volume, publisher) used for the BibTeX entries
- `photo.svg` – portrait (polygon drawing recoloured to the site palette). Replace it to change the picture; if it is missing the page shows "HM".

## Publish on GitHub Pages
1. Create a repository named `<your-github-username>.github.io`.
2. Upload all files from this folder to the repository root.
3. Open *Settings → Pages*, select "Deploy from a branch", branch `main`, folder `/ (root)`.
4. After a minute the site is live at `https://<your-github-username>.github.io`.

The same files work on any static web host (e.g. a university web server): just copy the folder.

## Add a new paper
Add a line to `publications.js`, e.g.

```js
["c","2026","Alice, HM, Bob","Paper Title","ICALP 2026: 1:1–1:20","https://doi.org/...","https://arxiv.org/abs/...", "Best Paper Award"],
```
Type: `j` journal, `c` conference, `o` other. `HM` becomes your name in bold. The award field is optional.

For arXiv links, use the form `https://arxiv.org/abs/<id>` without a version suffix (no `v1`, `v2`, ...), so the link always points to the newest version.

## BibTeX
The BibTeX button next to each paper is generated from `publications.js`.
Journal papers need nothing extra. For a paper at a new conference, add one line to
`venues.js` (key = the venue as written before the colon, e.g. `"ICALP 2027"`),
otherwise that paper simply gets no BibTeX button.
