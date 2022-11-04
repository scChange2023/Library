"use strict";

//Object constructor

let myLibrary = [];

function Book(title, author, pages, language, year, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.language = language;
  this.year = year;
  this.read = read;
}

function addBookToLibrary(obj) {
  myLibrary.push(obj);
}

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

//Close Modal on submit button click

const submitButton = document.getElementById("submitButton");

function closeModal() {
  document.querySelector(".modalForm").style.display = "none";
  modalDisplay == false;

  console.log("Bye", modalDisplay);
}

//Close Modal on outside form click
modal.addEventListener("click", function (event) {
  if (!event.target.closest(".form")) {
    closeModal();
  }
});

//Create Book Fucntion upon submit button click
function callbackFunction() {
  // event.preventDefault();

  //Declaring variables of form values
  let bookTitle = document.getElementById("book_title").value;
  let bookAuthor = document.getElementById("book_author").value;
  let pages = document.getElementById("book_pages").value;
  let language = document.getElementById("book_language").value;
  let year = document.getElementById("book_year").value;

  //If values exist add form to Library, create Book
  if (bookTitle && bookAuthor && pages && language && year) {
    //New Object
    let newBook = new Book(
      bookTitle,
      bookAuthor,
      pages,
      language,
      year,
      document.getElementById("read_book").checked
    );

    console.log(newBook);
    addBookToLibrary(newBook);
    console.log(myLibrary);
    createBook();
  }
}

//Array of book labels- to be iterated over in createBook function
const rowLabelArray = [
  "Author:",
  "Number of Pages:",
  "Language:",
  "Year Published:",
  "Mark as Read",
];

//Empty array for form values to be pushed to
let rowInputArray = [];

//Declared as global variable for removeBookButton eventListener
const bookContainer = document.querySelector(".bookContainer");

function createBook() {
  //Create book container
  let book = document.createElement("div");
  book.classList.add("book");
  book.setAttribute("id", `${myLibrary.length - 1}`);
  bookContainer.appendChild(book);

  //Create Top Row- includes remove book button
  let topBookRow = document.createElement("div");
  topBookRow.classList.add("topBookRow");
  book.appendChild(topBookRow);

  //remove book button
  let removeButton = document.createElement("button");
  removeButton.classList.add("removeBookButton");
  topBookRow.appendChild(removeButton);
  removeButton.textContent = "X";

  //Create book Title
  let bookTitle = document.createElement("div");
  bookTitle.classList.add("bookTitle");
  book.appendChild(bookTitle);
  bookTitle.textContent = myLibrary[myLibrary.length - 1].title;

  //Declaring index of myLibrary- object pushed to myLibrary addBookToLibrary()

  let index = myLibrary.length - 1;

  //Loop through object values- push to rowInputArray
  Object.values(myLibrary[index]).forEach((val) => rowInputArray.push(val));

  //Not looping over rowLabelArray to include "MArk as read" as there is 1 toggle row
  for (let i = 0; i <= rowLabelArray.length - 2; i++) {
    //Creating book Rows
    let bookRow = document.createElement("div");
    bookRow.classList.add("bookRow");
    book.appendChild(bookRow);
    //Creating book Labels
    let bookRowLabel = document.createElement("div");
    bookRowLabel.classList.add("bookRowLabel");
    bookRow.appendChild(bookRowLabel);
    bookRowLabel.textContent = rowLabelArray[i];
    //Creating book Inputs
    let bookRowInput = document.createElement("div");
    bookRowInput.classList.add("bookRowInput");
    bookRow.appendChild(bookRowInput);
    bookRowInput.textContent = rowInputArray[i + 1];
  }

  //Emptying rowInput array for next form submission

  //Creating one toggleRow- outside of loop
  let toggleRow = document.createElement("div");
  toggleRow.classList.add("toggleRow");
  book.appendChild(toggleRow);

  let toggleDiv = document.createElement("div");
  toggleDiv.classList.add("bookRowLabel");
  toggleRow.appendChild(toggleDiv);
  toggleDiv.textContent = rowLabelArray[4];

  let toggleLabel = document.createElement("label");
  toggleLabel.classList.add("switch");
  toggleLabel.setAttribute("id", "readLabel");
  toggleLabel.setAttribute("for", "readInput");
  toggleRow.appendChild(toggleLabel);

  let toggleInput = document.createElement("input");
  toggleInput.setAttribute("type", "checkbox");
  toggleInput.setAttribute("id", "readInput");
  toggleInput.setAttribute("name", "readInput");
  toggleLabel.appendChild(toggleInput);
  //If book has been read- check checkbox on bookcard
  if (rowInputArray[5] === true) {
    toggleInput.checked = true;
    book.classList.add("readColor");
  }

  rowInputArray = [];
}

//Declaring cancel form button and adding event listener to close
let cancelFormButton = document.querySelector(".formCancelButton");

cancelFormButton.addEventListener("click", closeModal);

//Delete Button- identifies book id of clicked removeBookButton-deletes elemnt and removes object from myLibrary array

bookContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("removeBookButton")) {
    let grandParent = event.target.parentNode.parentNode;
    console.log(grandParent.id);
    let deletedElement = document.getElementById(grandParent.id);
    if (myLibrary.length > 0) {
      deletedElement.remove();
      myLibrary[grandParent.id] = "";
      console.log(myLibrary);
    }
  }

  //Check Color
  else if ((event.target.id = "readInput")) {
    let grandParent = event.target.parentNode.parentNode.parentNode;
    console.log(grandParent);
    let bookCard = document.getElementById(grandParent.id);
    console.log(bookCard);
    let colorClass = bookCard.classList.contains("readColor");

    switch (colorClass) {
      case true:
        bookCard.classList.add("notReadColor");
        bookCard.classList.remove("readColor");
        if (myLibrary[grandParent.id]) myLibrary[grandParent.id].read = false;
        break;

      case false:
        bookCard.classList.add("readColor");
        bookCard.classList.remove("notReadColor");
        if (myLibrary[grandParent.id]) myLibrary[grandParent.id].read = true;
        break;
    }
  }
});
