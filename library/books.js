export const books = [
  {
    id: "book-01",
    title: "成色",
    paper: "#d9dcc7",
    ink: "#294438",
    height: 0.78,
    pages: [
      "p1",
      "p2",
      "p3",
      "p4",
      "p5",
      "p6",
      "p7",
      "p8",
      "p9",
    ],
  },
];

export function bookUrl(id) {
  return `book.html?book=${encodeURIComponent(id)}`;
}

export function selectedBook(search) {
  const id = new URLSearchParams(search).get("book");
  return books.find((book) => book.id === id) ?? null;
}
