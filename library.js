const myLibrary = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    numOfPages: 180,
    hasRead: true,
  },
  {
    title: "Ulysses",
    author: "James Joyce",
    genre: "Fiction",
    numOfPages: 1000,
    hasRead: true,
  },
  {
    title: "In Search of Lost Time",
    author: "Marcel Proust",
    genre: "Fiction",
    numOfPages: 4300,
    hasRead: true,
  },
  {
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    genre: "Fiction",
    numOfPages: 500,
    hasRead: true,
  },
];

const myForm = document.querySelector(".form-container");

function Book(title, author, genre, numOfPages, hasRead) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.numOfPages = numOfPages;
  this.hasRead = hasRead;
}

function addBookToLibrary(title, author, genre, numOfPages, hasRead) {
  let userTitle = title;
  let userAuthor = author;
  let userGenre = genre;
  let userNumOfPages = numOfPages;
  let userHasRead = hasRead;

  const book = new Book(
    userTitle,
    userAuthor,
    userGenre,
    userNumOfPages,
    userHasRead
  );

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

  libraryContainer.innerHTML = "";

  myLibrary.forEach(({ title, author, genre, numOfPages, hasRead }) => {
    const bookCard = createBookCard(title, author);
    libraryContainer.appendChild(bookCard);
  });
}

myForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(myForm);

  const title = formData.get("bookTitle");
  const author = formData.get("bookAuthor");
  const genre = formData.get("bookGenre");
  const numOfPages = formData.get("bookPages");
  const hasRead = formData.get("bookRead") ? true : false;

  addBookToLibrary(title, author, genre, numOfPages, hasRead);
  populateLibrary();
});

populateLibrary();
