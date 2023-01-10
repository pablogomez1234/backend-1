/* 
>>Consigna: Deberás entregar el estado de avance de tu aplicación eCommerce Backend, que implemente un servidor de aplicación basado en la plataforma Node.js y el módulo express.
El servidor implementará dos conjuntos de rutas agrupadas en routers, uno con la url base '/productos' y el otro con '/carrito'.
El puerto de escucha será el 8080 para desarrollo y process.env.PORT para producción en glitch.com
>>Aspectos a incluir en el entregable: 
El router base '/api/productos' implementará cuatro funcionalidades:
GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
POST: '/' - Para incorporar productos al listado (disponible para administradores)
PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
El router base '/api/carrito' implementará tres rutas disponibles para usuarios y administradores:
POST: '/' - Crea un carrito y devuelve su id.
DELETE: '/:id' - Vacía un carrito y lo elimina.
GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
POST: '/:id/productos/:id_prod' - Para incorporar productos al carrito por su id de producto
DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
Crear una variable booleana administrador, cuyo valor configuraremos más adelante con el sistema de login. Según su valor (true ó false) me permitirá alcanzar o no las rutas indicadas.
En el caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error.
El status http de la respuesta debe ser 403. Ejemplo: { error : -1, descripcion: ruta 'x' método 'y' no autorizada }
Un producto dispondrá de los siguientes campos:  id, timestamp, nombre, descripcion, código, foto (url), precio, stock.
El carrito de compras tendrá la siguiente estructura: id, timestamp(carrito), productos: [id] 
El timestamp puede implementarse con Date.now()
Realizar la persistencia de productos y del carrito de compras en el filesystem.
>>A tener en cuenta:
Para realizar la prueba de funcionalidad hay dos opciones:
Probar con postman cada uno de los endpoints (productos y carrito) y su operación en conjunto.
Realizar una aplicación frontend sencilla, utilizando HTML/CSS/JS ó algún framework de preferencia, que represente el listado de productos en forma de cards.
En cada card figuran los datos del producto, que, en el caso de ser administradores, podremos editar su información. Para este último caso incorporar los botones actualizar y eliminar.
También tendremos un formulario de ingreso de productos nuevos con los campos correspondientes y un botón enviar.
Asimismo, construir la vista del carrito donde se podrán ver los productos agregados e incorporar productos a comprar por su id de producto.
Esta aplicación de frontend debe enviar los requests get, post, put y delete al servidor utilizando fetch y debe estar ofrecida en su espacio público.
En todos los casos, el diálogo entre el frontend y el backend debe ser en formato JSON. El servidor no debe generar ninguna vista.
En el caso de requerir una ruta no implementada en el servidor, este debe contestar un objeto de error: ej { error : -2, descripcion: ruta 'x' método 'y' no implementada}, status code: 404
La estructura de programación será ECMAScript, separada tres en módulos básicos (router, lógica de negocio/api y persistencia ). Más adelante implementaremos el desarrollo en capas.
Utilizar preferentemente clases, constructores de variables let y const y arrow function.
Realizar la prueba de funcionalidad completa en el ámbito local (puerto 8080) y en glitch.com
*/

const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')
const productRouter = require('../routes/productRouter')
const cartRouter = require('../routes/cartRouter')
const path = require ("path")

const { products, carts } = require('../api/productsClass')


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

  //------ productos inicial al cliente
  socket.emit('productos', await products.getAll())
  socket.emit('carritos', await carts.getAll())
 
  //------ nuevo producto desde cliente
  socket.on('update', async producto => {
    await products.save( producto )
    io.sockets.emit('productos', await products.getAll())
  })

  //----------------
  socket.on('newCart', async () => {
    socket.emit('carritos', await carts.getAll())
  })

  
})


//---------------------------------------------------
//-----------------------------------------HTML
app.set('views', path.resolve(__dirname, '../public'))


//--------------------------------------------------
//-------------------- API REST ROUTER

//---- productRouter
app.use('/api', productRouter)

//---- cartRouter
app.use('/api', cartRouter)

//---- error 404
app.use(function(req, res) {
  res.status(404).send({error: -1, descripcion: 'ruta no implementada'})
})


//-----------------------------------------SERVER ON
const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))