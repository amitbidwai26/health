/**
 * Created by amitbidwai on 10/11/16.
 */
var express = require('express');
var router = express.Router();
var passport = require ('passport');
var User = require('../models/user'); // DOM in user folder

//var local_auth= require('../config/passport')
/* GET users listing. */
router.get('/', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
