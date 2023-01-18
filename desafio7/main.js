/* Consigna: Tomando como base las clases Contenedor en memoria y en archivos, desarrollar un nuevo contenedor con idénticos métodos pero que funcione sobre bases de datos, utilizando Knex para la conexión. Esta clase debe recibir en su constructor el objeto de configuración de Knex y el nombre de la tabla sobre la cual trabajará. Luego, modificar el desafío entregable de la clase 11”Chat con Websocket”, y:
cambiar la persistencia de los mensajes de filesystem a base de datos SQLite3.
cambiar la persistencia de los productos de memoria a base de datos MariaDB.
Desarrollar también un script que utilizando knex cree las tablas necesarias para la persistencia en cuestión (tabla mensajes en sqlite3 y tabla productos en mariaDb).
>> Notas:
Definir una carpeta DB para almacenar la base datos SQLite3 llamada ecommerce
 */

const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')
const router = require('./routes/router')
const path = require ("path")

const { chat, products } = require('./class/claseProducto')


const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)


//-------- middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))



//-------------------------------------------------
//------------------------------------------SOCKET
io.on('connection', async socket => {
  console.log('Nuevo cliente conectado!')

  //------ tabla inicial al cliente
  socket.emit('productos', await products.getAll())
 
  //------ nuevo producto desde cliente
  socket.on('update', async producto => {
    await products.add( producto )
    io.sockets.emit('productos', await products.getAll())
  })

  
  //----- chat inicial al cliente
  socket.emit('mensajes', await chat.getAll());

  //----- nuevo mensaje desde el cliente
  socket.on('newMsj', async mensaje => {
      mensaje.date = new Date().toLocaleString()
      await chat.add( mensaje )
      io.sockets.emit('mensajes', await chat.getAll());
  })

})


//---------------------------------------------------
//-----------------------------------------------HTML
app.set('views', path.resolve(__dirname, '../public'))


//--------------------------------------------------
//-------------------- API REST ROUTER router
app.use('/api', router)



//-----------------------------------------SERVER ON
const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))