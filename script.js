"use strict";

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `The ${this.title} by ${this.author} contains ${this.pages} and ${
      this.read ? `has been read` : `has not been read`
    }`;
  };
}

function addBookToLibrary(obj) {
  myLibrary.push(obj);
}

const toggleButton = document.querySelector(".slider");
const bookCard = document.querySelector(".book");

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

toggleButton.addEventListener("click", toggleClick);
