const fs = require('fs');
const Book = require('../models/book');

const filePath = 'books.json';
let books = {};

function loadBooks() {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

function saveBooks() {
  const data = JSON.stringify(books);
  fs.writeFileSync(filePath, data);
}

books = loadBooks(); // Cargar los libros desde el archivo JSON

const getBook = (req, res) => {
  const { id } = req.query;

  if (id) {
    const book = books[id];
    if (book) {
      res.send(book);
    } else {
      res.status(404).send('No existe ningún libro con la id solicitada');
    }
  } else {
    res.send(Object.values(books));
  }
};

const createBook = (req, res) => {
  const { title, type, author, price, photo, id_user, id_book } = req.body;
  const newBook = new Book(title, type, author, price, photo, id_user, id_book);
  books[id_book] = newBook;
  saveBooks(); // Guardar la lista actualizada en el archivo JSON
  res.send(newBook); // Devolver el libro creado como respuesta
};

const updateBook = (req, res) => {
  const { id_book, new_id_book, title, type, author, price, photo, id_user } = req.body;
  const book = books[id_book];

  if (book) {
    if (new_id_book) {
      books[new_id_book] = book;
      delete books[id_book];
      book.id_book = new_id_book;
    }
    if (title) book.title = title;
    if (type) book.type = type;
    if (author) book.author = author;
    if (price) book.price = price;
    if (photo) book.photo = photo;
    if (id_user) book.id_user = id_user;

    saveBooks(); // Guardar la lista actualizada en el archivo JSON
    res.send(book); // Devolver el libro modificado como respuesta
  } else {
    res.status(404).send('Libro no encontrado');
  }
};

const deleteBook = (req, res) => {
  const { id_book } = req.body;

  if (books[id_book]) {
    const book = books[id_book];
    delete books[id_book];
    saveBooks(); // Guardar la lista actualizada en el archivo JSON
    res.send(book); // Devolver el libro eliminado como respuesta
  } else {
    res.status(404).send('Libro no encontrado');
  }
};

module.exports = { getBook, createBook, updateBook, deleteBook };
