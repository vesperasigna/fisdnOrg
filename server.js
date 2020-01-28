const express = require('express');
const path = require('path');
//const BodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;

// INIT SERVER
const fisdnHub = express();

// MIDDLEWARE
fisdnHub.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//fisdnHub.use(BodyParser.json());
//fisdnHub.use(BodyParser.urlencoded({extended:true}));
// you can use for parsing application/json
fisdnHub.use(express.json());
// and for parsing application/x-www-form-urlencoded
fisdnHub.use(express.urlencoded({ extended: true }));




// ROUTERS
const adminRouter = require('./routes/admin');
fisdnHub.use('/admin', adminRouter);

const archiveRouter = require('./routes/archive');
fisdnHub.use('/archive', archiveRouter);

// DOMAIN ROOT
// Allow dotfiles - this is required for verification by Lets Encrypt's certbot
fisdnHub.use(express.static(path.join(__dirname, 'public'), {dotfiles: 'allow'}));

fisdnHub.get('/', (req, res) => {
        res.redirect('/archive');  
});


// START SERVER
fisdnHub.listen(PORT, ()=> {
    console.log('fisdnHub is now listening on port ' + PORT)
;})



