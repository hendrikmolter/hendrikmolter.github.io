// ---------- BibTeX (generated from publications.js + venues.js) ----------
const Bib = (function () {
  const TEX = { "ä":'{\\"a}', "ö":'{\\"o}', "ü":'{\\"u}', "Ä":'{\\"A}', "Ö":'{\\"O}', "Ü":'{\\"U}', "ß":"{\\ss}",
    "é":"{\\'e}", "è":"{\\`e}", "á":"{\\'a}", "à":"{\\`a}", "À":"{\\`A}", "É":"{\\'E}", "ý":"{\\'y}",
    "ř":"{\\v{r}}", "č":"{\\v{c}}", "š":"{\\v{s}}", "ž":"{\\v{z}}", "ó":"{\\'o}", "í":"{\\'i}", "ñ":"{\\~n}" };
  const tex = s => s.replace(/[^\x00-\x7f]/g, c => c === "–" ? "--" : c === "—" ? "---" : (TEX[c] || c));
  const ascii = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ß/g, "ss").replace(/[^A-Za-z]/g, "");
  // keep capitalisation of acronyms and words like "NP-oracles", "k-Cores", "Bron-Kerbosch"
  const protect = s => s.split(" ").map(w => /[A-Z]/.test(w.slice(1)) || /^[a-z]-[A-Z]/.test(w) ? `{${w}}` : w).join(" ");
  const STOP = new Set(["a", "an", "the", "on", "in", "of", "to", "how", "which", "towards", "as"]);
  const keys = new Map();
  function key(p) {
    const first = p.authors.split(", ")[0].replace("HM", "Hendrik Molter").split(" ").pop();
    const word = p.title.toLowerCase().split(/[^a-z0-9]+/).find(w => w && !STOP.has(w)) || "";
    let k = ascii(first) + p.year + word, base = k, i = 1;
    const id = p.title + "|" + p.venue;
    while (keys.has(k) && keys.get(k) !== id) k = base + "abcdefghij"[i++];
    keys.set(k, id);
    return k;
  }
  function entry(p) {
    const authors = p.authors.split(", ").map(a => a === "HM" ? "Hendrik Molter" : a);
    const f = [["author", tex(authors.join(" and "))], ["title", tex(protect(p.title))]];
    let type;
    if (p.type === "j") {
      type = "article";
      const m = p.venue.match(/^(.*?) (\d+)(?:\(([^)]+)\))?(?::\s*(.+?))? \((\d{4})\)$/);
      f.push(["journal", tex(m[1])], ["volume", m[2]]);
      if (m[3]) f.push(["number", m[3]]);
      if (m[4]) f.push(["pages", tex(m[4])]);
    } else if (p.type === "o" && p.venue.startsWith("PhD thesis")) {
      type = "phdthesis";
      f.push(["school", "Technical University of Berlin"], ["isbn", "978-3-7983-3172-3"]);
    } else {
      const cut = p.venue.indexOf(": ");
      const vkey = cut < 0 ? p.venue : p.venue.slice(0, cut), pages = cut < 0 ? "" : p.venue.slice(cut + 2);
      const v = VENUES[vkey];
      if (!v) return null;                       // unknown venue: no BibTeX button
      type = v.type || "inproceedings";
      f.push(["booktitle", v.booktitle ? tex(v.booktitle) : `Proceedings of the ${protect(tex(v.name))} ({${vkey.replace(/ \d{4}$/, "")}} ${p.year})`]);
      if (v.series) f.push(["series", v.series], ["volume", v.volume]);
      if (pages) f.push(["pages", tex(pages)]);
      if (v.publisher) f.push(["publisher", v.publisher]);
    }
    f.push(["year", p.year]);
    if (p.link.includes("doi.org/")) f.push(["doi", p.link.split("doi.org/")[1]]);
    if (p.arxiv) f.push(["eprint", p.arxiv.split("/abs/")[1]], ["archivePrefix", "arXiv"]);
    const w = Math.max(...f.map(([n]) => n.length));
    return `@${type}{${key(p)},\n` + f.map(([n, v]) => `  ${n.padEnd(w)} = {${v}}`).join(",\n") + "\n}\n";
  }
  function download(p) {
    const text = entry(p);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "application/x-bibtex" }));
    a.download = key(p) + ".bib";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  return { entry, download, key };
})();

// ---------- Email (assembled in JS to reduce spam harvesting) ----------
(function () {
  const a = document.getElementById("email");
  if (!a) return;
  const addr = a.dataset.u + "@" + a.dataset.d;
  a.href = "mailto:" + addr;
  a.textContent = addr;
})();

// ---------- Publications ----------
(function () {
  const MY_NAME = "Hendrik Molter";
  const TYPE_LABEL = { j: "Journal", c: "Conference", p: "Preprint", o: "Other" };
  const list = document.getElementById("pub-list");
  const stats = document.getElementById("pub-stats");

  const pubs = PUBLICATIONS.map(([type, year, authors, title, venue, link, arxiv, award]) =>
    ({ type, year, authors, title, venue, link, arxiv, award }));

  const count = t => pubs.filter(p => p.type === t).length;
  stats.textContent = `${count("j")} journal · ${count("c")} conference papers`;

  const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function render(filter) {
    const shown = pubs.filter(p => filter === "all" || p.type === filter);
    const years = [...new Set(shown.map(p => p.year))].sort((a, b) => b - a);
    const order = { p: 0, j: 1, c: 2, o: 3 };
    list.innerHTML = years.map(y => {
      const items = shown.filter(p => p.year === y).sort((a, b) => order[a.type] - order[b.type]);
      return `<h3 class="year">${y}</h3><ul class="pubs">` + items.map(p => {
        const authors = p.authors.split(", ").map(a =>
          a === "HM" ? `<span class="me">${MY_NAME}</span>` : esc(a)).join(", ");
        const links = [
          p.link ? `<a class="link" href="${p.link}">${p.link.includes("doi.org") ? "DOI" : "Link"}</a>` : "",
          p.arxiv ? `<a class="link" href="${p.arxiv}">arXiv</a>` : "",
          Bib.entry(p) ? `<a class="link bib" href="#" data-i="${pubs.indexOf(p)}">BibTeX</a>` : "",
        ].join("");
        return `<li class="pub">
          <div class="pub-title">${p.link ? `<a href="${p.link}">${esc(p.title)}</a>` : esc(p.title)}</div>
          <div class="pub-authors">${authors}</div>
          <div class="pub-venue">${esc(p.venue)}</div>
          <div class="pub-meta">
            <span class="badge ${p.type}">${TYPE_LABEL[p.type]}</span>
            ${p.award ? `<span class="badge award">★ ${esc(p.award)}</span>` : ""}
            ${links}
          </div>
        </li>`;
      }).join("") + "</ul>";
    }).join("");
  }

  list.addEventListener("click", e => {
    const b = e.target.closest("a.bib");
    if (!b) return;
    e.preventDefault();
    Bib.download(pubs[+b.dataset.i]);
  });
  document.querySelectorAll(".filters .chip").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filters .chip").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      render(btn.dataset.filter);
    });
  });
  render("all");
})();

// ---------- Highlight current section in sidebar ----------
// The current section is the last one whose top has scrolled past a line
// near the top of the window (at the very bottom of the page: the last one).
(function () {
  const links = [...document.querySelectorAll(".nav a")];
  const secs = [...document.querySelectorAll("main section")];
  const mark = id => links.forEach(l => l.classList.toggle("current", l.getAttribute("href") === "#" + id));
  function update() {
    const line = 120;
    let cur = secs[0];
    for (const s of secs) if (s.getBoundingClientRect().top <= line) cur = s;
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) cur = secs[secs.length - 1];
    mark(cur.id);
  }
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(() => { update(); ticking = false; }); }
  }, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
