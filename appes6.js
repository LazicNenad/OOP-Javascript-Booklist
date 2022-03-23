class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToUI(book) {
    const UItable = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
		<td><a href="#" class="delete">X</a></td>
		`;

    UItable.appendChild(row);
  }

  clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  showMessage(message, className) {
    const div = document.createElement("div");
    div.classList.add(className);
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    container.insertBefore(div, form);

    setTimeout(function () {
      document.querySelector(`.${className}`).remove();
    }, 2000);
  }

  deleteBook(target) {
    if (target.classList.contains("delete")) {
      target.parentElement.parentElement.remove();
    }
  }
}

class Storage {
  static getBooks() {
    let books;

    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static setBook(book) {
    let books = Storage.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static displayBooks() {
    let books = Storage.getBooks();
    books.forEach((book) => {
      const ui = new UI();

      ui.addBookToUI(book);
    });
  }

  static removeBook(isbn) {
    console.log(isbn);
    let books = Storage.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

window.addEventListener("DOMContentLoaded", (e) => {
  Storage.displayBooks();
});

// Event Listener on form submit
const form = document.querySelector("#book-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get values from fields
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // Make book object
  const book = new Book(title, author, isbn);

  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showMessage("Please fill in the fields", "error");
    return;
  } else {
  }
  ui.addBookToUI(book);
  Storage.setBook(book);
  ui.showMessage("Thanks for adding book!", "success");
  ui.clearFields();
});

const bookList = document.querySelector("#book-list");
bookList.addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteBook(e.target);
  Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.showMessage("Successfuly deleted!", "success");
  e.preventDefault();
});
