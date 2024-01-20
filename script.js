console.log('testing');

//constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

function Display() {}

// Add methods to display prototype

Display.prototype.add = function (book) {
  console.log('adding to UI');
  tableBody = document.getElementById('tableBody');
  let uiString = `<tr>
                    <th>${book[0].name}</th>
                    <th>${book[0].author}</th>
                    <th>${book[0].type}</th>
                  </tr>`;

  tableBody.innerHTML += uiString;
};

//Implement the clear function
Display.prototype.clear = function () {
  let libraryForm = document.getElementById('libraryForm');
  libraryForm.reset();
};

//Implementing the validate function
Display.prototype.validate = function (book) {
  if (book[0].name.length < 2 || book[0].author.length < 2) {
    return false;
  } else {
    return true;
  }
};

Display.prototype.show = function (type, displayMessage) {
  document.getElementById('message');
  message.innerHTML = `  
  <div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>Message: </strong> ${displayMessage}
    <button type="button"
    class="btn-close"
    data-bs-dismiss="alert"
    aria-label="Close">
    </button>
  </div>`;

  setTimeout(() => {
    message.innerHTML = '';
  }, 2000);
};

// Add submit event listener to form
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
  console.log('You have submitted library form');
  let name = document.getElementById('bookName').value;
  let author = document.getElementById('author').value;

  let type;

  let fiction = document.getElementById('fiction');
  let programming = document.getElementById('programming');
  let cooking = document.getElementById('cooking');

  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }

  let books = new Book(name, author, type);

  var book1 = [];

  book1.push(books);

  localStorage.setItem('book1', JSON.stringify(book1));

  var book = JSON.parse(localStorage.getItem('book1'));

  console.log(book);

  let display = new Display();
  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show('success', 'Your book has been sucessfully added');
  } else {
    display.show('danger', 'Sorry! you cannot add this book.');
  }

  e.preventDefault();
}
