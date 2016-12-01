var express = require('express');
var router = express.Router();
var passport = require ('passport');
var User = require('../models/user'); // DOM in user folder

//var local_auth= require('../config/passport')
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('signup', { message: req.flash('signupMessage') });

});
router.post('/', passport.authenticate('local-signup',{
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true

}));


module.exports = router;
