import { selectedBook } from "./books.js";
import { PHOTOS } from "./photos.js";

const book = selectedBook(window.location.search);
const title = book?.title ?? "Book not found";

document.title = `${title} — Photo Books Library`;
document.querySelector("#reader-title").textContent = title;

const photos = book?.pages ?? [];

if (!book || photos.length === 0) {
  document.querySelector("#empty-state").hidden = false;
  document.querySelector("#empty-title").textContent = book ? "Empty book" : title;
  document.querySelector("#empty-description").textContent = book
    ? "No pages yet."
    : "Return to the library to choose a book.";
} else {
  document.querySelector("#reader").hidden = false;

  const bookElement = document.querySelector("#book");

  const cover = document.createElement("article");
  cover.className = "book-page cover-page";
  cover.dataset.density = "hard";
  const coverInner = document.createElement("div");
  coverInner.className = "cover-inner";
  coverInner.style.background = book.paper;
  coverInner.style.color = book.ink;
  const coverTitle = document.createElement("div");
  coverTitle.className = "cover-title";
  coverTitle.textContent = book.title;
  coverInner.appendChild(coverTitle);
  cover.appendChild(coverInner);
  bookElement.appendChild(cover);

  const pendingPhotos = new Map();
  photos.forEach((src, i) => {
    const page = document.createElement("article");
    page.className = "book-page photo-page";
    const img = document.createElement("img");
    if (PHOTOS[src]) {
      img.src = PHOTOS[src];
    } else {
      img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACw=";
      pendingPhotos.set(src, img);
    }
    img.alt = `${book.title} — photo ${i + 1}`;
    page.appendChild(img);
    const num = document.createElement("p");
    num.className = "page-number";
    num.textContent = String(i + 1).padStart(2, "0");
    page.appendChild(num);
    bookElement.appendChild(page);
  });

  const back = document.createElement("article");
  back.className = "book-page";
  back.dataset.density = "hard";
  const backInner = document.createElement("div");
  backInner.style.background = book.paper;
  backInner.style.height = "100%";
  back.appendChild(backInner);
  bookElement.appendChild(back);

  const pageWidth = Number(bookElement.dataset.pageWidth) || 471;
  const pageHeight = Number(bookElement.dataset.pageHeight) || 640;

  const pageFlip = new St.PageFlip(bookElement, {
    width: pageWidth,
    height: pageHeight,
    size: "stretch",
    minWidth: Math.max(1, Math.round(pageWidth * 0.56)),
    maxWidth: Math.max(1, Math.round(pageWidth * 1.04)),
    minHeight: Math.max(1, Math.round(pageHeight * 0.56)),
    maxHeight: Math.max(1, Math.round(pageHeight * 1.04)),
    drawShadow: true,
    flippingTime: 760,
    usePortrait: true,
    startZIndex: 10,
    autoSize: true,
    maxShadowOpacity: 0.42,
    showCover: true,
    mobileScrollSupport: false,
    clickEventForward: true,
    useMouseEvents: true,
    swipeDistance: 24,
    showPageCorners: true,
    disableFlipByClick: false,
  });

  const previousButton = document.querySelector("#previous");
  const nextButton = document.querySelector("#next");
  const pageStatus = document.querySelector("#page-status");
  let currentPage = 0;
  let isTurning = false;

  function updateControls() {
    const pageCount = pageFlip.getPageCount();
    const lastPage = pageCount - 1;
    previousButton.disabled = currentPage === 0 || isTurning;
    nextButton.disabled = currentPage === lastPage || isTurning;
    if (currentPage === 0) {
      pageStatus.textContent = "Cover";
    } else if (currentPage === lastPage) {
      pageStatus.textContent = "Back cover";
    } else {
      pageStatus.textContent = `${String(currentPage + 1).padStart(2, "0")} / ${String(pageCount).padStart(2, "0")}`;
    }
  }

  pageFlip.on("flip", (event) => {
    currentPage = Number(event.data);
    updateControls();
  });

  pageFlip.on("changeState", (event) => {
    isTurning = event.data !== "read";
    updateControls();
  });

  pageFlip.loadFromHTML(bookElement.querySelectorAll(".book-page"));
  if (pendingPhotos.size) {
    import("./photos-rest.js")
      .then(({ PHOTOS_REST }) => {
        pendingPhotos.forEach((img, key) => {
          if (PHOTOS_REST[key]) img.src = PHOTOS_REST[key];
        });
      })
      .catch(() => {});
  }
  updateControls();

  const at = Number(new URLSearchParams(window.location.search).get("at"));
  if (Number.isInteger(at) && at > 0 && at < pageFlip.getPageCount()) {
    pageFlip.turnToPage(at);
  }

  previousButton.addEventListener("click", () => {
    if (!isTurning) pageFlip.flipPrev("bottom");
  });

  nextButton.addEventListener("click", () => {
    if (!isTurning) pageFlip.flipNext("bottom");
  });

  window.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || isTurning) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      pageFlip.flipPrev("bottom");
    }
    if (event.key === "ArrowRight" || event.key === " ") {
      event.preventDefault();
      pageFlip.flipNext("bottom");
    }
  });
}
