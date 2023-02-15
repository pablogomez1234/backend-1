const express = require('express')

const { Router } = express   
const sessionRouter = Router() 


/*
function sessionExpires(req, res, next) {
  if ( req.cookies.connect.sid ) {
    req.session.cookie.expires = new Date(Date.now() + 6000)
    req.session.touch()
    next()
  } else {
    res.redirect('/')
  }
}
*/



/* ------------------ router session ----------------- */

//--------------------- usuario logeado?
sessionRouter.get('/', (req, res) => {
  if (req.session.name) {
    console.log(req.session.cookie.expires)
    req.session.cookie.maxAge = 60000
    console.log(req.session.cookie.expires)
    res.send({ user: req.session.name })
  } else {
    res.send({ user: '' })
  }
})


//--------------------- post login user
sessionRouter.post('/login', async (req, res) => {
  const user = req.body.user
  req.session.name = user
  res.status(200).send({ description: user })
})


//------------ get cerrar sesion
sessionRouter.post('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send(`Something terrible just happened!!!`)
    } else {
      res.redirect('/')
    }
  })
})




module.exports = sessionRouter