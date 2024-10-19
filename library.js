const myLibrary = [];
const tempData = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { title: "Ulysses", author: "James Joyce" },
  { title: "In Search of Lost Time", author: "Marcel Proust" },
  { title: "One Hundred Years of Solitude", author: "Gabriel García Márquez" },
];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function addBookToLibrary(title, author) {
  let userTitle = title ? title : prompt("Enter book Title:");
  let userAuthor = author ? author : prompt("Enter book Author");

  const book = new Book(userTitle, userAuthor);

  myLibrary.push(book);
}

function populateLibrary() {
  tempData.forEach((book) => {
    addBookToLibrary(book.title, book.author)
  })
}

populateLibrary()