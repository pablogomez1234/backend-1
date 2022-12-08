// >> Consigna: Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:
// GET '/api/productos' -> devuelve todos los productos.
// GET '/api/productos/:id' -> devuelve un producto según su id.
// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
// DELETE '/api/productos/:id' -> elimina un producto según su id.


const express = require('express');

class Contenedor {
  constructor() {
    this.id = 0;
    this.content = [];
  }

  save = (item) => {
    item.id = this.id;
    this.content.push(item);
    this.id ++;

    return item.id;
  }

  getById = (id) => {
    const item = this.content.find(element => element.id === id);
    return item ? item : null;
  }

  getAll = () => this.content;

  deleteById = (id) => {
    const updatedContent = this.content.filter(element => element.id !== id);
    this.content = updatedContent;
  }

  deleteAll = () => {
    this.content = [];
  }
}

const app = express();
const teamsRouter = express.Router();
const playersRouter = express.Router();

app.use(express.json());

const teamsClass = new Contenedor();
const playersClass = new Contenedor();

teamsRouter.post('/', (req, res) => {
  const team = req.body;
  const id = teamsClass.save(team);

  res.send(id.toString());
});

teamsRouter.get('/', (req, res) => {
  const teams = teamsClass.getAll();

  res.json(teams);
});

teamsRouter.get('/:teamId', (req, res) => {
  const teamId = req.params.teamId;
  const teams = teamsClass.getById(Number(teamId));

  res.json(teams);
});

playersRouter.post('/', (req, res) => {
  const player = req.body;
  const id = playersClass.save(player);

  res.send(id.toString());
});

playersRouter.get('/', (req, res) => {
  const players = playersClass.getAll();

  res.json(players);
})

app.use('/api/teams', teamsRouter);
app.use('/api/players', playersRouter);

app.listen(8080);

