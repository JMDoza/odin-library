const myLibrary = [];
const predefinedData = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    numOfPages: 180,
    hasRead: true,
    index: 0,
  },
  {
    title: "Ulysses",
    author: "James Joyce",
    genre: "Fiction",
    numOfPages: 1000,
    hasRead: false,
    index: 1,
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
const readButton = document.querySelector(".book-card-edge");
const trashButton = document.querySelector(".delete-icon");

const circleSVG = `<svg
                  class="circle-checked"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <title>check-circle</title>
                  <path
                    d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
                  />
                </svg>`;

const trashSVG = `<svg
                class="delete-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <title>delete</title>
                <path
                  d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                />
              </svg>`;

function Book(title, author, genre, numOfPages, hasRead) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.numOfPages = numOfPages;
  this.hasRead = hasRead;
}

Book.prototype.toggleReadStatus = function () {
  this.hasRead = !this.hasRead;
};

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

function findBookIndex(element) {
  const bookCard = element.closest(".book-card");
  const bookInfo = bookCard.querySelector(".book-card-info");

  const title = bookInfo.querySelector(".title").textContent;
  const author = bookInfo
    .querySelector(".author")
    .textContent.replace("Author: ", "");
  const genre = bookInfo
    .querySelector(".genre")
    .textContent.replace("Genre: ", "");
  const pages = bookInfo
    .querySelector(".pages")
    .textContent.replace("Pages: ", "");

  const bookIndex = myLibrary.findIndex(
    (book) =>
      book.title == title &&
      book.author == author &&
      book.numOfPages == pages &&
      book.genre == genre
  );

  return bookIndex;
}

function addReadEventListener(element) {
  element.addEventListener("click", (event) => {
    const bookIndex = findBookIndex(event.currentTarget);

    myLibrary[bookIndex].toggleReadStatus();

    element.innerHTML = myLibrary[bookIndex].hasRead ? circleSVG : "";
  });
}

function addDeleteEventListener(element) {
  element.addEventListener("click", (event) => {
    const bookIndex = findBookIndex(event.currentTarget);

    myLibrary.splice(bookIndex, 1);
    populateLibrary();
  });
}

function createBookCard(title, author, genre, numOfPages, hasRead) {
  const bookCardContainer = document.createElement("div");
  bookCardContainer.className = "book-card-container";

  const bookCard = document.createElement("div");
  bookCard.className = "book-card";

  const bookCardEdge = document.createElement("div");
  bookCardEdge.className = "book-card-edge";

  const circleBorder = document.createElement("div");
  circleBorder.className = "circle-border";

  const bookCardInfo = document.createElement("div");
  bookCardInfo.className = "book-card-info";

  const titleP = document.createElement("h2");
  titleP.className = "title";
  titleP.textContent = title;

  const authorP = document.createElement("p");
  authorP.className = "author";
  authorP.textContent = `Author: ${author}`;

  const genreP = document.createElement("p");
  genreP.className = "genre";
  genreP.textContent = `Genre: ${genre}`;

  const pagesP = document.createElement("p");
  pagesP.className = "pages";
  pagesP.textContent = `Pages: ${numOfPages}`;

  addReadEventListener(circleBorder);

  bookCardInfo.appendChild(titleP);
  bookCardInfo.appendChild(authorP);
  bookCardInfo.appendChild(genreP);
  bookCardInfo.appendChild(pagesP);
  bookCardInfo.innerHTML += trashSVG;

  addDeleteEventListener(bookCardInfo.querySelector("svg"));

  circleBorder.innerHTML = hasRead ? circleSVG : "";
  bookCardEdge.appendChild(circleBorder);

  bookCard.appendChild(bookCardEdge);
  bookCard.appendChild(bookCardInfo);
  bookCardContainer.appendChild(bookCard);

  return bookCardContainer;
}

predefinedData.forEach(({ title, author, genre, numOfPages, hasRead }) => {
  addBookToLibrary(title, author, genre, numOfPages, hasRead);
});

function populateLibrary() {
  const libraryContainer = document.querySelector(".library-container");

  libraryContainer.innerHTML = "";

  const fragment = document.createDocumentFragment();

  myLibrary.forEach(({ title, author, genre, numOfPages, hasRead }) => {
    const bookCard = createBookCard(title, author, genre, numOfPages, hasRead);
    fragment.appendChild(bookCard);
  });

  libraryContainer.appendChild(fragment);
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
