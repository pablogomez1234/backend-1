class Tipos {
    
    constructor ( nombre, apellido, libros, mascotas ){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }
  
    getFullName(){
        return (`${this.nombre} ${this.apellido}`)
    }
    
    addMascota( Mascota ){
        this.mascotas.push(Mascota)
    }
  
    countMascotas(){
        return (this.mascotas).length
    }
  
    addBook( Nombre, Autor ){
        this.libros.push({ nombre:Nombre, autor:Autor })
    }
  
    getBookNames(){
        return this.libros.map( libro => libro.nombre )
    }
  
  }
  
  
  
  
  const usuario = new Tipos( 'Pablo', 'Cab', [ { nombre:'El Pricipito', autor: 'Antoine Saint-Exuper7' }, { nombre:'El Arbol', autor: 'MC' } ], ['perro'])
  
  
  console.log('Nombre de usuario: ', usuario.getFullName())
  usuario.addMascota('loro')
  console.log('Cantidad de mascotas del usuario: ', usuario.countMascotas())
  usuario.addBook('Famas Facundo', 'MC')
  console.log('Nombres de libros del usuario: ', usuario.getBookNames())