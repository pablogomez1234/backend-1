<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="publicport" content="width=device-width, initial-scale=1.0">
  <title>Entrega 7 - Bases de datos</title>

  <link rel="stylesheet" type="text/css" href="css/styles.css" media="screen" />

  <!-- CSS only -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">

  <!-- JavaScript Bundle with Popper -->
  <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>

  <script src="/socket.io/socket.io.js"></script>
  <script defer src="js/main.js"></script>

</head>

<body>
  <ul class="nav container" style="justify-content:space-around">
    <li class="nav-item"> 
      <a class="btn btn-info" href="/">INICIO</a>
    </li>
    <li class="nav-item">
      <a class="btn btn-info" href=#tablaProd >PRODUCTOS</a>
    </li>
    <li class="nav-item">
      <a class="btn btn-info" href=#tablaChat >CENTRO DE MENSAJES</a>
    </li>
  </ul>
  <section class="p-4 bg-secondary container">
  <div class="p-4 container">
    <div class="alert alert-dark text-center" role="alert">
      INGRESE NUEVO PRODUCTO
    </div>
  </div>

  <form id= "formulario" class="container p-4" action="/api/productos" method="POST" >
     <div class="mb-3">
       <label for="name" class="form-label fw-bold">Nombre</label>
       <input type="text" class="form-control" id="name" name="title">
     </div>
     <div class="mb-3">
       <label for="price" class="form-label fw-bold">Precio</label>
       <input type="number" class="form-control" id="price" name="price">
     </div>
     <div class="mb-3">
       <label for="picture" class="form-label fw-bold">Foto</label>
       <input type="text" class="form-control" id="picture" name="thumbnail" aria-describedby="pictureHelp">
       <div id="pictureHelp" class="form-text" style="color:white">URL de la foto</div>
     </div>
     <button type="submit" class="btn btn-info">Agregar</button>
   </form>

   <br>
   <br id="tablaProd">
   
   <div class="containe p-4">
    <div class="alert alert-dark text-center" role="alert">
      TABLA DE PRODUCTOS
    </div>
  </div>
  
  <div id="tabla"></div> 
 
  <br>
  <br id="tablaChat">

  <div class="container p-4">
    <div class="alert alert-dark text-center" role="alert">
      CENTRO DE MENSAJES
    </div>

    <div id= "" class="row">
      <label for="userEmail" class="form-label fw-bold">Usuario</label>
      <div class="col mb-3">      
        <input type="email" class="form-control fw-bold" id="userEmail" aria-describedby="pictureHelp">
        <div id="pictureHelp" class="form-text" style="color:white">Ingrese su email</div>
      </div>

      <hr>
      <div id="chat"></div>
      <hr>
      <label for="userMsj" class="form-label fw-bold">Mensaje</label>
      <div class="col mb-3">      
        <input type="text" class="form-control fw-bold" id="userMsj" aria-describedby="pHelp">
        <div id="pHelp" class="form-text" style="color:white">Escriba su mensaje</div>
      </div>
      <div class="col">
        <button id="sendBtn" type="" class="btn btn-info">Enviar mensaje</button> 
      </div>
    </div>

    <hr>

    

  </div>
</section>
</body>
</html>