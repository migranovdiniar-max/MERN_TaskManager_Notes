const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');


const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
})


app.get('/api/notes', (req, res) => {
  res.json(notes);
});


app.get('/api/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));

  res.send(note);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});