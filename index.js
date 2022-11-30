const express = require('express');
const Contenedor = require('./contenedor');
const app = express();



const server = app.listen(process.env.PORT || PORT, () => {
  console.log(`server listening on PORT ${PORT}`);
});

server.on('error', err => console.log(`error: ${err}`));

const products = new Contenedor('products.txt'),

app.get('/productos', async (req, res) => {
  const productos = await products.getAll();
  res.send(productos);
});

app.get('/productoRandom', async (req, res) => {
  const productos = await products.getAll();
  let numeroRandom = Match.floor(Match.random() = productos.length);
  res.send(productos[numeroRandom]);
});



app.listen(8080, () => {
  console.log("El servidor está inicializado en el puerto 8080");
 });
 
