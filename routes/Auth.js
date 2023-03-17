const express = require('express'); 
const router  = express.Router(); 
const AuthController = require('../controllers/AuthController'); 
const passport = require("passport");



router.post('/login', AuthController.login); 
router.post('/register', AuthController.register); 
router.get('/profile', passport.authenticate('jwt', { session: false }), AuthController.profile);
router.get('/test',console.log("test api"));






module.exports = router;
