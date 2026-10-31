const currentPage = () => {
  const path = window.location.pathname.split("/").pop() || "index.html";
  if (path === "package.html") return "packages.html";
  return path;
};

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const light = this.getAttribute("theme") === "light";
    const active = currentPage();
    const links = [
      ["packages.html", "Trips"],
      ["gallery.html", "Gallery"],
      ["about.html", "About"],
      ["contact.html", "Contact"]
    ];
    this.innerHTML = `
      <header class="site-header ${light ? "site-header--light" : ""}" data-header>
        <a class="brand" href="index.html" aria-label="Xplore home">
          <span class="brand-mark">X</span><span>XPLORE</span>
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
          <span></span><span></span><span class="sr-only">Toggle menu</span>
        </button>
        <nav class="site-nav" id="site-nav" aria-label="Main navigation">
          ${links.map(([href, label]) => `<a href="${href}" ${active === href ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
        </nav>
        <a class="header-cta" href="contact.html">Plan a trip <span>↗</span></a>
      </header>`;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="footer-top shell">
          <div class="footer-brand">
            <a class="brand brand--footer" href="index.html"><span class="brand-mark">X</span><span>XPLORE</span></a>
            <p>Journeys made for people who want to feel a place, not simply pass through it.</p>
          </div>
          <div class="footer-column"><span class="eyebrow">Discover</span><a href="about.html">About us</a><a href="packages.html">Trip packages</a><a href="gallery.html">Gallery</a></div>
          <div class="footer-column"><span class="eyebrow">Favourites</span><a href="package.html?id=bali">Tropical paradise</a><a href="package.html?id=nepal">Mountain odyssey</a><a href="package.html?id=kenya">Wildlife safari</a></div>
          <div class="footer-column"><span class="eyebrow">Contact</span><a href="tel:+1234567890">+123 456 7890</a><a href="mailto:hello@xplore.example">hello@xplore.example</a><span>123 Wanderer Street<br>Any State, Earth</span></div>
        </div>
        <div class="footer-bottom shell"><span>© 2026 Xplore learning project</span><span>Independent educational implementation</span><a href="#top">Back to top ↑</a></div>
      </footer>`;
  }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);

