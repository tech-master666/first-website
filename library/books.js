export const books = [
  {
    id: "book-01",
    title: "成色",
    paper: "#d9dcc7",
    ink: "#294438",
    height: 0.78,
    width: 1,
    cover: "photo",
    foot: "ACTION",
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
  {
    id: "book-02",
    title: "百年孤独",
    paper: "#2e4a3f",
    ink: "#e6dfc8",
    height: 0.92,
    width: 1.35,
    cover: "vertical",
    bands: true,
    titlePos: "top",
    foot: "南海出版公司",
    orig: "CIEN AÑOS DE SOLEDAD",
    authorLines: ["[哥伦比亚] 加西亚·马尔克斯 著", "范晔 译"],
    pages: [],
  },
  {
    id: "book-03",
    title: "西西弗斯神话",
    paper: "#3c4653",
    ink: "#e8e6da",
    height: 0.66,
    width: 0.8,
    cover: "minimal",
    coverPaper: "#e9e6db",
    coverInk: "#23272e",
    bandFoot: true,
    titleLines: ["西西弗斯", "神话"],
    orig: "LE MYTHE DE SISYPHE",
    author: "[法] 阿尔贝·加缪",
    pages: [],
  },
  {
    id: "book-04",
    title: "如何杀死我最好的朋友",
    paper: "#161616",
    ink: "#f2f0ea",
    height: 0.82,
    width: 1.15,
    cover: "bold",
    accent: "#d43a2f",
    titlePos: "top",
    bold: true,
    foot: "中国友谊出版公司",
    titleLines: ["如何杀死", "我最好的", "朋友"],
    author: "宋小君",
    tag: "黑色幽默短篇小说集",
    pages: [],
  },
];

export function bookUrl(id) {
  return `book.html?book=${encodeURIComponent(id)}`;
}

export function selectedBook(search) {
  const id = new URLSearchParams(search).get("book");
  return books.find((book) => book.id === id) ?? null;
}
