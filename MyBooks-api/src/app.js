const express = require('express');
const cors = require('cors');
const bookRouter = require('./routers/book.router');
const errorHandler = require('./errors/errorHandling');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/book', bookRouter);

// Agrega el middleware errorHandler después de todas las rutas y middlewares anteriores
app.use(errorHandler);

module.exports = app;
