function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function UI() {}

UI.prototype.addBookToUI = function (book) {
  const UItable = document.querySelector("#book-list");

  const row = document.createElement("tr");

  row.innerHTML = `
	<td>${book.title}</td>
	<td>${book.author}</td>
	<td>${book.isbn}</td>
	<td><a href="#" class="delete">X</a></td>
	`;

  UItable.appendChild(row);
};

UI.prototype.clearFields = function () {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#isbn").value = "";
};

UI.prototype.showMessage = function (message, className) {
  const div = document.createElement("div");
  div.classList.add(className);
  div.appendChild(document.createTextNode(message));

  const container = document.querySelector(".container");
  container.insertBefore(div, form);

  setTimeout(function () {
    document.querySelector(`.${className}`).remove();
  }, 2000);
};

UI.prototype.deleteBook = function (target) {
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
  }
};
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
  ui.showMessage("Thanks for adding book!", "success");
  ui.clearFields();
});

const bookList = document.querySelector("#book-list");
bookList.addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showMessage("Successfuly deleted!", "success");
  e.preventDefault();
});
