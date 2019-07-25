'use strict';
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: DropboxOAuth2Strategy } = require('passport-dropbox-oauth2')

// Assigns the Strategy export to the name JwtStrategy using object destructuring
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Assigning_to_new_variable_names
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { User } = require('../src/users/models');
const { JWT_SECRET, DROPBOX_CLIENT_ID, DROPBOX_CLIENT_SECRET } = require('../config');

const localStrategy = new LocalStrategy((username, password, callback) => {
  let user;
  User.findOne({ username: username })
    .then(_user => {
      user = _user;
      if (!user) {
        // Return a rejected promise so we break out of the chain of .thens.
        // Any errors like this will be handled in the catch block.
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password'
        });
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password'
        });
      }
      return callback(null, user);
    })
    .catch(err => {
      if (err.reason === 'LoginError') {
        return callback(null, false, err);
      }
      return callback(err, false);
    });
});

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    // Look for the JWT as a Bearer auth header
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    // Only allow HS256 tokens - the same as the ones we issue
    algorithms: ['HS256']
  },
  (payload, done) => {
    done(null, payload.user);
  }
);

// const dropboxStrategy = new DropboxOAuth2Strategy({
//     //options for strategy
//      apiVersion: '2',
//      clientID: DROPBOX_CLIENT_ID,
//      clientSecret: DROPBOX_CLIENT_SECRET,
//      callbackURL: "http://localhost:8080/api/auth/dropbox/callback"
//   },
//   // ()=>{
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ providerId: profile.id  }, function (err, user) {
//       return done(err, user);
//     });
//     //passport callback function
//   })



module.exports = { localStrategy, jwtStrategy, 
  // dropboxStrategy 
};
