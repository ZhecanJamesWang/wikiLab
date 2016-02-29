var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User          = require('./models/userModel.js');

var authentication = {
  configure: function() {
    passport.serializeUser(function(user, done) {
      console.log(user.id);
      done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
    passport.use('local-signup', new LocalStrategy({
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, username, password, done) {
      process.nextTick(function() {
        User.findOne({ 'username' :  username }, function(err, user) {
          if (err) { return done(err); }
          if (user) {
            return done(null, false);
          } else {
            var newUser = new User();
            newUser.username = username;
            passwordPromise = newUser.generateHash(password);
            passwordPromise.then(function(hash) {
              newUser.password = hash;
              newUser.save(function(err) {
                if (err) { throw err; }
                return done(null, newUser);
              });
            });
          }
        });    
      });
    }));
    passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {
      User.findOne({ 'username' :  username }, function(err, user) {
        if (err) { return done(err); };
        if (!user) { return done(null, false); }
        validationPromise = user.validPassword(password);

        validationPromise.then(function(isValid) {
          console.log(isValid);
          if (isValid) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        }); 
      });
    }));
    return passport;
  },
  checkAuthentication: function(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.status(401).send();
  },
  signup: function(req, res, next) {
    passport.authenticate('local-signup', {
      successRedirect : '/',
      failureRedirect : '/signup'
    })(req, res, next);
  },
  login: function(req, res, next) {
    passport.authenticate('local-login', {
      successRedirect : '/',
      failureRedirect : '/login'
    })(req, res, next);
  },
  logout: function(req, res){
    req.logout();
    res.redirect('/login');
  }
};

module.exports = authentication;