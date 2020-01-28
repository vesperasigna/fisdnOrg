const express = require('express');
//const BodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;

// INIT SERVER
const fisdnHub = express();

// MIDDLEWARE
//fisdnHub.use(BodyParser.json());
//fisdnHub.use(BodyParser.urlencoded({extended:true}));
// you can use for parsing application/json
fisdnHub.use(express.json());
// and for parsing application/x-www-form-urlencoded
fisdnHub.use(express.urlencoded({ extended: true }));




/* // ROUTERS
const adminRouter = require('./routes/admin');
fisdnHub.use('/admin', adminRouter);

const archiveRouter = require('./routes/archive');
fisdnHub.use('/archive', archiveRouter);

// DOMAIN ROOT
// Allow dotfiles - this is required for verification by Lets Encrypt's certbot

fisdnHub.get('/', (req, res) => {
        res.redirect('/archive');  
}); */

fisdnHub.use(express.static(path.join(__dirname, 'public'), {dotfiles: 'allow'}));

fisdnHub.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});





// START SERVER
fisdnHub.listen(PORT, ()=> {
    console.log('fisdnHub is now listening on port ' + PORT)
;})








/* fisdnHub.use('/archive/assets', express.static(path.resolve('./public')));

fisdnHub.get('/archive', (req, res) => {
    res.sendFile(path.resolve('./views/index.html'));
})
fisdnHub.get('/archive/login', (req, res) => {
    res.sendFile(path.resolve('./views/admin.html'));
})
fisdnHub.get('/archive/admin', (req, res) => {
    res.sendFile(path.resolve('./views/admin.html'));
}) */