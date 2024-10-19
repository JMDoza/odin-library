const myLibrary = [
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

function createBookCard(title, author) {
  const newDiv = document.createElement("div");
  const newH3 = document.createElement("h3");
  const newP = document.createElement("p");

  newDiv.className = "book-card";
  newH3.textContent = title;
  newP.textContent = author;

  newDiv.appendChild(newH3);
  newDiv.appendChild(newP);

  return newDiv;
}

function populateLibrary() {
  const libraryContainer = document.querySelector(".library-container");

  myLibrary.forEach(({ title, author }) => {
    const bookCard = createBookCard(title, author);
    libraryContainer.appendChild(bookCard);
  });
}

populateLibrary();
