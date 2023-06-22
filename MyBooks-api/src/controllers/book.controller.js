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
  const { id_book } = req.body;
  const book = books.find((book) => book.id_book == id_book);

  if (book) {
    // Actualizar los campos del libro utilizando los datos del cuerpo de la solicitud
    if (req.body.title) book.title = req.body.title;
    if (req.body.type) book.type = req.body.type;
    if (req.body.author) book.author = req.body.author;
    if (req.body.price) book.price = req.body.price;
    if (req.body.photo) book.photo = req.body.photo;
    if (req.body.id_user) book.id_user = req.body.id_user;

    saveBooksToJson();

    res.redirect('/book'); // Redirigir al cliente a la página de libros
  } else {
    res.status(404).send('No existe ningún libro con la id solicitada');
  }
};

const deleteBook = (req, res) => {
  const { id_book } = req.body;

  let answer;
  let i = 0;
  while (i < books.length) {
    if (id_book == books[i].id_book) {
      books.splice(i, 1);
      answer = "Libro eliminado correctamente";
      saveBooksToJson();
      break;
    }
    i++;
  }

  if (answer) {
    res.send({ success: true, message: answer });
  } else {
    res.status(404).send('No existe ningún libro con la id solicitada');
  }
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
