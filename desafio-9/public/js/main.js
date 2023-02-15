const socket = io.connect()


//-------------------------------------------------------------------------------------------------
//--- SESSION
async function main(){
    const user = await userLogged()
    
  if ( user !== '' ) {
    logged( user )
  
  } else {
    document.querySelector('#sessionUser').innerHTML = loginTemplate()
    const logName = document.getElementById("logName")
    
    document.getElementById("loginBtn").addEventListener("click", ev => {
      fetch(`http://localhost:8080/session/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: logName.value
        })
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.description)
      })

      logged( logName.value )
        
    })  
     
  }
}


//-------------------------------------------------------------------------------------------------
//--- PRODUCTOS

socket.on('productos', data => {
    document.querySelector('#tabla').innerHTML = productsTable( data )
})


//----------------------------------------------------------------------------------------
//--- CHAT


//envio de mensajes-----------

const userEmail = document.getElementById("userEmail")
const userName = document.getElementById("userName")
const userSurname = document.getElementById("userSurname")
const userAge = document.getElementById("userAge")
const userNickname = document.getElementById("userNickname")
const userAvatar = document.getElementById("userAvatar")
const userMensaje = document.getElementById("userMsj")

document.getElementById("sendBtn").addEventListener("click", ev => {
  if ( validateEmail(userEmail.value) ) {
    if ( userMensaje.value ){
    
      socket.emit('newMsj', {
        author: {
          id: userEmail.value,
          name: userName.value,
          surname: userSurname.value,
          age: userAge.value,
          nickname: userNickname.value,
          avatar: userAvatar.value
        },
        text: userMensaje.value
       })

       userMensaje.value = ''

    } else {
      alert("Ingrese un mensaje!")
    }
  }
})


// recepcion mensajes desde el backend
socket.on('mensajes', data => {
  document.querySelector('#chat').innerHTML = chatMessages( data )
})


//-----------------------------------------------------------------

main()