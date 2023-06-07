const express = require("express")
const router = express.Router();
const passport = require("passport")
const path = require("path")

// Ruta para registrar un nuevo usuario
router.post('/oculto/register', (req, res, next)=>{
  passport.authenticate('local-signup', (err, user, info)=>{
    if(err){
      return res.status(500).json({error: 'ha occurido un error interno'})
    }
    if(!user){
      return res.status(400).json({error: info.error})
    }
    return res.status(200).json({message: 'Registro exitoso'})
  })(req, res, next)
}); 

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

module.exports = router;