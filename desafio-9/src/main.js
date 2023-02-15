/* Consigna: 
Continuando con el desafío de la clase anterior, vamos a incorporar un mecanismo sencillo que permite loguear un cliente por su nombre, mediante un formulario de ingreso.
Luego de que el usuario esté logueado, se mostrará sobre el contenido del sitio un cartel con el mensaje “Bienvenido” y el nombre de usuario.
Este cartel tendrá un botón de deslogueo a su derecha.
Verificar que el cliente permanezca logueado en los reinicios de la página, mientras no expire el tiempo de inactividad de un minuto, que se recargará con cada request.
En caso de alcanzarse ese tiempo, el próximo request de usuario nos llevará al formulario de login.
Al desloguearse, se mostrará una vista con el mensaje de 'Hasta luego' más el nombre y se retornará automáticamente, luego de dos segundos, a la vista de login de usuario.

La solución entregada deberá persistir las sesiones de usuario en Mongo Atlas.
Verificar que en los reinicios del servidor, no se pierdan las sesiones activas de los clientes.
Mediante el cliente web de Mongo Atlas, revisar los id de sesión correspondientes a cada cliente y sus datos.
Borrar una sesión de cliente en la base y comprobar que en el próximo request al usuario se le presente la vista de login.
Fijar un tiempo de expiración de sesión de 10 minutos recargable con cada visita del cliente al sitio y verificar que si pasa ese tiempo de inactividad el cliente quede deslogueado.


*/

const express = require('express')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const productRouter = require('../routes/productRouter')
const sessionRouter = require('../routes/sessionRouter')

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const { products } = require('../class/productContainer')
const { chats } = require('../class/chatContainer')


//-------- middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.use(expressSession({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://taber:Aa000001@coderhouse.xfpha7a.mongodb.net/session',
    mongoOptions: advancedOptions
  }),
  secret: 'secret-pin',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000
  }
}))


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
  socket.emit('mensajes', await chats.getAll())

  //----- nuevo mensaje desde el cliente
  socket.on('newMsj', async mensaje => {
      mensaje.date = new Date().toLocaleString()
      await chats.add( mensaje )
      
      io.sockets.emit('mensajes', await chats.getAll())
  })

})


//--------------------------------------------------
//-------------------- SESSION ROUTER sessionRouter
app.use('/session', sessionRouter)


//-------------------- API REST ROUTER productRouter
app.use('/api', productRouter)



//-----------------------------------------SERVER ON
const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
