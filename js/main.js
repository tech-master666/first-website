import { trips } from "./data.js";

const formatPrice = value => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

function tripCard(trip, index = 0) {
  return `<article class="trip-card reveal" style="--delay:${index * 70}ms">
    <a class="trip-card__image" href="package.html?id=${trip.id}" aria-label="View ${trip.title}">
      <img src="${trip.image}" alt="${trip.location} travel landscape" loading="lazy">
      <span class="trip-card__index">${String(index + 1).padStart(2, "0")}</span>
      <span class="round-link">↗</span>
    </a>
    <div class="trip-card__body">
      <div><p class="meta">${trip.location} · ${trip.duration}</p><h3>${trip.title}</h3></div>
      <p class="trip-price">from <strong>${formatPrice(trip.price)}</strong></p>
    </div>
  </article>`;
}

document.querySelectorAll("[data-trips]").forEach(container => {
  const limit = Number(container.dataset.limit || trips.length);
  container.innerHTML = trips.slice(0, limit).map(tripCard).join("");
});

const header = document.querySelector("[data-header]");
if (header) {
  const toggle = header.querySelector(".menu-toggle");
  const nav = header.querySelector(".site-nav");
  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
    document.body.classList.toggle("menu-open", !open);
  });
  window.addEventListener("scroll", () => header.classList.toggle("is-scrolled", window.scrollY > 24), { passive: true });
}

const observer = "IntersectionObserver" in window
  ? new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 })
  : null;
document.querySelectorAll(".reveal").forEach(element => observer ? observer.observe(element) : element.classList.add("is-visible"));

document.querySelectorAll("[data-demo-form]").forEach(form => {
  const status = form.querySelector("[data-form-status]");
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      status.textContent = "Please complete the required fields.";
      return;
    }
    status.textContent = "Thanks — this demo validated your details, but no data was sent.";
    status.classList.add("is-success");
    form.reset();
  });
});

const testimonialTrack = document.querySelector("[data-testimonial-track]");
if (testimonialTrack) {
  const cards = [...testimonialTrack.children];
  let active = 0;
  const show = next => {
    active = (next + cards.length) % cards.length;
    cards.forEach((card, index) => card.classList.toggle("is-active", index === active));
    document.querySelector("[data-testimonial-count]").textContent = `${String(active + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
  };
  document.querySelector("[data-testimonial-prev]")?.addEventListener("click", () => show(active - 1));
  document.querySelector("[data-testimonial-next]")?.addEventListener("click", () => show(active + 1));
  show(0);
}

const gallery = document.querySelector("[data-gallery]");
if (gallery) {
  const items = [...gallery.querySelectorAll(".gallery-item")];
  document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach(item => item.classList.remove("is-active"));
    button.classList.add("is-active");
    const filter = button.dataset.filter;
    items.forEach(item => item.hidden = filter !== "all" && item.dataset.category !== filter);
  }));

  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImage = lightbox?.querySelector("img");
  const closeLightbox = () => { lightbox?.close(); document.body.classList.remove("menu-open"); };
  items.forEach(item => item.addEventListener("click", () => {
    lightboxImage.src = item.querySelector("img").src;
    lightboxImage.alt = item.querySelector("img").alt;
    lightbox.querySelector("figcaption").textContent = item.querySelector("span").textContent;
    lightbox.showModal();
    document.body.classList.add("menu-open");
  }));
  lightbox?.querySelector("button").addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
}

document.querySelectorAll("[data-year]").forEach(node => node.textContent = new Date().getFullYear());

