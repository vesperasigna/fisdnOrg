const session = require('express-session');
const express = require('express');
const adminRouter = express.Router();
const path = require('path');

// a cookieParser has been integrated in express 4, 
// no need to add:
// const CookieParser = require('cookie-parser');
// adminRouter.use(CookieParser());

//bodyParser is set directly on server.js, no need to add: 
//adminRouter.use(BodyParser.json());
//adminRouter.use(BodyParser.urlencoded({extended:true}));


// launch session-authentication
const passport = require('passport');
const passportConfig = require('../models/passportConfig');
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
// Your links in markup have to link to : 
// http://fisdn.org/admin/assets/filename.ext
adminRouter.use('/assets', express.static(path.resolve('public')));


// defining routes

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

adminRouter.get('/signup', (req, res) => {
        res.sendFile(path.resolve("views/signup.html"));
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
// this only won't be sufficient to redirect
// You must add, on the front-side, inside axios.then :
// window.location.replace("routeToLoginPage") 
  res.redirect('/admin');
});

adminRouter.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/admin/login');
});



module.exports = adminRouter;