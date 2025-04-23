const express = require ('express');
const router = express.Router();
const {registerUser,loginUser,forgotPassword} = require('../controllers/authController')


// test purpose
router.get ('/test', (rq,res)=>{
res.status(201).json( {Message: "get route working"})
})

// routes

router.post ('/login',loginUser)
router.post ('/register',registerUser)
router.post('/forgotPassword', forgotPassword)



module.exports = router