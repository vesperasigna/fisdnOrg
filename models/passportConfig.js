const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST, 
    port: process.env.MYSQL_PORT, 
    user: process.env.MYSQL_USER, 
    password: process.env.MYSQL_PASS, 
    database: process.env.MYSQL_DB,
    });

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log('Inside Serialize User: user ID: ' + user.ID)
		done(null, user.ID);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
		connection.query('select * from users where id = ?', [id], function(err,rows){	
			done(err, rows[0]);
		});
    });


    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(email, password, done) { // callback with email and password from our form
        console.log('Email entered by user: '+ email);
        connection.query('SELECT * FROM users WHERE email = ?', [email], function(err,rows){
			if (err){
                console.log(err);
                return done(err);
            }
			 if (!rows.length) {
                return done(null, false, console.log("Oops! No such email.")); // req.flash is the way to set flashdata using connect-flash
            } 
			
			// if the user is found but the password is wrong
            if (!( rows[0].password == password))
                return done(null, false, console.log('Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
			
            // all is well, return successful user
            console.log('OK');
            return done(null, rows[0]);			
		});
    }));
};
