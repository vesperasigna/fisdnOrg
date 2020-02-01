const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST, 
    port: process.env.MYSQL_PORT, 
    user: process.env.MYSQL_USER, 
    password: process.env.MYSQL_PASS, 
    database: process.env.MYSQL_USERDB,
    });

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log('Inside Serialize User: user ID: ' + user.ID)
        // we chose to store only the user id
		done(null, user.ID);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
		connection.query('select * from users where id =?', [id], function(err,rows){	
			done(err, rows[0]);
        });
        connection.end();
    });



    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
        // if true, allows us to pass 'req' 
        // (i.e the entire request) to the following callback    
    },
    function(req, email, password, done) {

		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to sign up already exists
        connection.query("select * from users where email = ?", [email], function(err,rows){
			console.log(rows);
			console.log("above row object");
            if (err)
            {
                return done(err);
            }

			 if (rows.length) {
                return done(null, false, console.log("Oops! Email already taken."));
            } else {

				// if there is no user with that email
                // create the user
                let user = new Object();
				
				user.email    = email;
                user.password = password; // use the generateHash function in our user model
			
				connection.query('insert into users ( email, password ) values (?,?)', [email, password], function(err,rows){
                // add the user id for session 
                // (the exact name of the SQL column is required)
                user.ID = rows.insertId;
				
				return done(null, user);
				});	
            }	
        });
        
        connection.end();

    }));


    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        // if true, allows us to pass 'req' 
        //(i.e the entire request) to the following callback
        passReqToCallback : false 
    },
    // callback with email and password from our form, 
    // WARNING: can use 'req' as param, only if passReqToCallback is set to true.
    function(email, password, done) {
        console.log('Email entered by user: ' + email);
        connection.query("SELECT * FROM `users` WHERE `email` = '" + email + "'", function(err,rows){
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
