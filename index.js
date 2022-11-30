const express = require('express');

let phrase = 'Frase inicial';

const app = express();
app.use(express.json());

app.delete('/api/palabras/:pos', (req, res) => {
  const { pos } = req.params;

  const phraseAsArray = phrase.split(' ');
  const index = pos - 1;
  const removedWord = phraseAsArray.splice(index, 1)[0];

  res.json({
    removida: removedWord,
  });
});

app.put('/api/palabras/:pos', (req, res) => {
  const { pos } = req.params;
  const { palabra } = req.body;

  const phraseAsArray = phrase.split(' ');
  const index = pos - 1;
  const anterior = phraseAsArray[index];
  phraseAsArray[index] = palabra;

  phrase = phraseAsArray.join(' ');

  res.json({
    actualizada: palabra,
    anterior,
  });
});

app.get('/api/frase', (req, res) => {
  res.json({ frase: phrase });
});

app.get('/api/palabras/:pos', (req, res) => {
  const phraseAsArray = phrase.split(' ');
  const { pos } = req.params;
  const index = pos - 1;

  res.json({ buscada: phraseAsArray[index] });
});

app.post('/api/palabras', (req, res) => {
  console.log(req.body)
  const { palabra } = req.body;

  const phraseAsArray = phrase.split(' ');
  phraseAsArray.push(palabra);

  phrase = phraseAsArray.join(' ');

  res.json({
    agregada: palabra,
    pos: phraseAsArray.length,
    frase: phrase,
  })
});

app.listen(8080, () => console.log(`I'm here!`));









