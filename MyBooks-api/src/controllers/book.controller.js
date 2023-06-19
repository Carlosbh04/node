const fs = require('fs');
const Book = require('../models/book');

let books = [];

try {
  const data = fs.readFileSync('books.json', 'utf8');
  books = JSON.parse(data);
} catch (err) {
  console.error('Error al leer el archivo JSON:', err);
}

const getBooks = (req, res) => {
  res.send(books);
};

const getBookById = (req, res) => {
  const { id } = req.params;
  console.log('ID recibido:', id); // Verifica si el ID se recibe correctamente
  const book = books.find((book) => book.id_book == id);

  if (book) {
    res.send(book);
  } else {
    console.log('Libros disponibles:', books); // Verifica los libros cargados en el array
    res.status(404).send('No existe ningún libro con la id solicitada');
  }
};

const addBook = (req, res) => {
  const { title, type, author, price, photo, id_book, id_user } = req.body;
  const book = new Book(title, type, author, price, photo, id_book, id_user);
  books.push(book);

  saveBooksToJson();

  const answer = 'Libro añadido correctamente';
  res.redirect('/book'); // Redirigir al cliente a la página de libros
};

const updateBook = (req, res) => {
  const { id } = req.params;
  const { title, type, author, price, photo, id_book, id_user } = req.body;
  const book = books.find((book) => book.id_book == id);

  if (book) {
    if (title) book.title = title;
    if (type) book.type = type;
    if (author) book.author = author;
    if (price) book.price = price;
    if (photo) book.photo = photo;
    if (id_book) book.id_book = id_book;
    if (id_user) book.id_user = id_user;

    saveBooksToJson();

    const answer = 'Libro modificado correctamente';
    res.redirect('/book'); // Redirigir al cliente a la página de libros
  } else {
    const answer = 'No existe ningún libro con la id solicitada';
    res.status(404).send(answer);
  }
};

const deleteBook = (req, res) => {
  const bookId = req.params.id; 
  let answer = false;

  // Buscar el índice del libro en el arreglo books
  const index = books.findIndex(book => book.id_book === bookId);

  if (index !== -1) {
    // Eliminar el libro del arreglo books
    const deletedBook = books.splice(index, 1)[0];
    answer = true;

    // Actualizar el archivo JSON
    saveBooksToJson();

    console.log('Libro eliminado correctamente');
  }

  res.send(answer);
};


const searchBookById = (id) => {
  return books.find((book) => book.id_book == id);
};

const saveBooksToJson = () => {
  try {
    const jsonData = JSON.stringify(books, null, 2);
    fs.writeFileSync('books.json', jsonData, 'utf8');
    console.log('Libros guardados en el archivo JSON');
  } catch (err) {
    console.error('Error al guardar los libros en el archivo JSON:', err);
  }
};

module.exports = { getBooks, getBookById, addBook, updateBook, deleteBook, searchBookById };
