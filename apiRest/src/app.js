const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/user.router');
const errorHandling = require('./errors/errorHandling');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/', userRouter);

app.use(errorHandling.handle404);

module.exports = app;
