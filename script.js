"use strict";

let myLibrary = [];

function Book(title, author, pages, language, year, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.language = language;
  this.year = year;
  this.read = read;
  // this.info = function () {
  //   return `The ${this.title} by ${this.author} contains ${this.pages} and ${
  //     this.read ? `has been read` : `has not been read`
  //   }`;
  // };
}

function addBookToLibrary(obj) {
  myLibrary.push(obj);
}

const toggleButton = document.querySelector(".slider");
const bookCard = document.querySelector(".book");

// formButton.addEventListener("click", openForm);

// function openForm() {
//   document.getElementById("popupDiv").style.display = "block";
// }

// function closeForm() {
//   document.getElementById("popupForm").style.display = "none";
// }

function toggleClick() {
  const colorClass = bookCard.classList.contains("readColor");

  switch (colorClass) {
    case true:
      bookCard.classList.add("notReadColor");
      bookCard.classList.remove("readColor");
      break;

    case false:
      bookCard.classList.add("readColor");
      bookCard.classList.remove("notReadColor");
      break;
  }
}

// toggleButton.addEventListener("click", toggleClick);

//Open modal

const modalButton = document.querySelector(".newBookButton");
const modal = document.querySelector(".modalForm");
const form = document.querySelector(".form");
let modalDisplay = false;

function openModal() {
  modalDisplay = true;
  modal.style.display = "block";
  console.log("Hello", modalDisplay);
}
modalButton.addEventListener("click", openModal);

//Close Modal

const submitButton = document.getElementById("submitButton");

function closeModal() {
  document.querySelector(".modalForm").style.display = "none";
  modalDisplay == false;
  console.log("Bye", modalDisplay);
}

modal.addEventListener("click", function (event) {
  if (!event.target.closest(".form")) {
    closeModal();
  }
});

//Create Object with form submission

form.addEventListener("submit", callbackFunction);

// function callbackFunction(event) {
//   event.preventDefault();
//   const myFormData = new FormData(event.target);

//   const formDataObj = Object.fromEntries(myFormData.entries());
//   formDataObj.prototype = Object.create(Book.prototype);
//   const book = new Book(formDataObj);
//   console.log(book);
// }

function callbackFunction(event) {
  event.preventDefault();
  let newBook = new Book(
    document.getElementById("book_title").value,
    document.getElementById("book_author").value,
    document.getElementById("book_pages").value,
    document.getElementById("book_language").value,
    document.getElementById("book_year").value,
    document.getElementById("read_book").value
  );
  console.log(newBook);
  addBookToLibrary(newBook);
  console.log(myLibrary);
  createBook();
}

const rowLabelArray = [
  "Author:",
  "Number of Pages:",
  "Language:",
  "Year Published:",
];

let rowInputArray = [];

function createBook() {
  const bookContainer = document.querySelector(".bookContainer");
  let book = document.createElement("div");
  book.classList.add("book");
  book.setAttribute("id", `${myLibrary.length}`);
  bookContainer.appendChild(book);

  let topBookRow = document.createElement("div");
  topBookRow.classList.add("topBookRow");
  book.appendChild(topBookRow);

  let removeButton = document.createElement("button");
  removeButton.classList.add("removeBookButton");
  topBookRow.appendChild(removeButton);
  removeButton.textContent = "X";

  let bookTitle = document.createElement("div");
  bookTitle.classList.add("bookTitle");
  book.appendChild(bookTitle);
  bookTitle.textContent = myLibrary[myLibrary.length - 1].title;

  let index = myLibrary.length - 1;

  Object.values(myLibrary[index]).forEach((val) => rowInputArray.push(val));

  for (let i = 0; i <= rowLabelArray.length - 1; i++) {
    let bookRow = document.createElement("div");
    bookRow.classList.add("bookRow");
    book.appendChild(bookRow);

    let bookRowLabel = document.createElement("div");
    bookRowLabel.classList.add("bookRowLabel");
    bookRow.appendChild(bookRowLabel);
    bookRowLabel.textContent = rowLabelArray[i];

    let bookRowInput = document.createElement("div");
    bookRowInput.classList.add("bookRowInput");
    bookRow.appendChild(bookRowInput);
    bookRowInput.textContent = rowInputArray[i + 1];
  }

  rowInputArray = [];
}

///Mark as Read rowlabels

//Form Reset button

//Form cancel button

//Styling
