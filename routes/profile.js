/**
 * Created by amitbidwai on 10/11/16.
 */
/**
 * Created by amitbidwai on 10/11/16.
 */
var express = require('express');
var router = express.Router();
var passport = require ('passport');
var User = require('../models/user'); // DOM in user folder




//var local_auth= require('../config/passport')
/* GET users listing. */
router.get('/',

    // check login status
    function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/login');
    }
     ,


    function(req, res, next) {
    res.render('profile', { user: req.user });

});
router.post('/', passport.authenticate('local-login',{
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true

}));


module.exports = router;
