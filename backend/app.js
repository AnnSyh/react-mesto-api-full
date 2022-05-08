require('dotenv').config();
// const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const BodyParser = require('body-parser');
const { errors } = require('celebrate');
// const auth = require('./middlewares/auth'); // авторизация
const cenralErrors = require('./middlewares/central-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const routes = require('./routes/routes');

const { PORT = 3000 } = process.env; // Слушаем 3000 порт

// функция обработки ошибок при подключении к серверу mongo
async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
  } catch (error) {
    console.log(error);
  }
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`); // Если всё работает, консоль покажет, какой порт приложение слушает
  });
}

// миддлвары
app.use(BodyParser.json()); // подключили миддлвару кот достает значения из тела запроса
// app.use(auth); // авторизация

app.use(requestLogger); // подключаем логгер запросов
// за ним идут все обработчики роутов

// подключаем роуты и всё остальное...
app.use(express.json());
app.use(routes);

app.use(errorLogger); // ошибки логов
// errorLogger нужно подключить после обработчиков роутов и
// до обработчиков ошибок

// централизованная обработка ошибок
app.use(errors());
app.use(cenralErrors);

// запуск сервера
main();
