// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

dotenv.config();

const app = express();

// Подключение к БД
connectDB();

// Парсинг JSON
app.use(express.json());

// Главная страница (можно убрать или сделать красивее)
app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

// Роуты
app.use('/api/users', userRoutes);

// Пока оставляем тестовый маршрут с заметками (потом уберёшь)
app.get('/api/notes', (req, res) => {
  res.json(require('./data/notes'));
});

// Важно! 404 и обработчик ошибок — САМЫЕ ПОСЛЕДНИЕ
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});