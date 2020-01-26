const session = require('express-session');
const express = require('express');
const adminRouter = express.Router();
const path = require('path');


const CookieParser = require('cookie-parser');

const passport = require('passport');
const passportConfig = require('../models/passportConfig');




adminRouter.use(CookieParser());

passportConfig(passport);

adminRouter.use(
    session(
        {
            secret: 'keyboard cat',
            name:'cookie',
            resave: false,
            saveUninitialized: false,
            cookie: {
            httponly: true,
            maxAge: null,
            secure: false}
        }));


adminRouter.use(passport.initialize());
adminRouter.use(passport.session());




    // static files
adminRouter.use('/assets', express.static(path.resolve('public')));


   // routes

adminRouter.get('/', (req, res) => {
    if(req.isAuthenticated())
    {
        res.sendFile(path.resolve("views/admin.html"));
    }
    else 
    {
        res.redirect('/admin/login')
    }
    
});
adminRouter.get('/login', (req, res) => {
    if(req.isAuthenticated())
    {
        res.sendFile(path.resolve("views/admin.html"));
    }
    else
    {
        res.sendFile(path.resolve("views/login.html"));
    } 
});

adminRouter.post('/login', passport.authenticate('local-login', { failureRedirect: '/admin/login' }),
function(req, res) {
  res.redirect('/admin');
});

module.exports = adminRouter;