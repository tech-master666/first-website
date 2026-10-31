import { trips, defaultItinerary } from "./data.js";

const params = new URLSearchParams(window.location.search);
const trip = trips.find(item => item.id === params.get("id")) || trips[0];
const itinerary = trip.itinerary || defaultItinerary;
const formatPrice = value => new Intl.NumberFormat("en-US").format(value);

document.title = `${trip.title} — Xplore`;
document.querySelector("[data-package-hero]").style.setProperty("--package-image", `url('${trip.image}')`);
document.querySelector("[data-package-title]").textContent = trip.title;
document.querySelector("[data-package-location]").textContent = trip.location;
document.querySelector("[data-package-duration]").textContent = trip.duration;
document.querySelector("[data-package-description]").textContent = trip.description;
document.querySelector("[data-package-price]").textContent = `$${formatPrice(trip.price)}`;
document.querySelector("[data-package-season]").textContent = trip.season;
document.querySelector("[data-package-intro]").textContent = trip.intro || `This seven-day route through ${trip.location} is designed around local knowledge, generous pacing and a clear sense of place.`;

const includes = trip.includes || ["Boutique accommodation", "Daily breakfast", "Local transfers", "English-speaking guide", "Curated activities"];
const excludes = trip.excludes || ["International flights", "Visa and travel insurance", "Personal purchases"];
document.querySelector("[data-package-includes]").innerHTML = includes.map(item => `<li><span>✓</span>${item}</li>`).join("");
document.querySelector("[data-package-excludes]").innerHTML = excludes.map(item => `<li><span>×</span>${item}</li>`).join("");
document.querySelector("[data-itinerary]").innerHTML = itinerary.map(([day, title, copy], index) => `
  <article class="itinerary-row reveal" style="--delay:${index * 45}ms">
    <span class="itinerary-day">DAY ${day}</span><h3>${title}</h3><p>${copy}</p><span class="itinerary-line"></span>
  </article>`).join("");

