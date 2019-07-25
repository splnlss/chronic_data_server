'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  providerId: {
    type: String
  },
  username: {
    type: String,
    required: function() { console.log(id); return this.providerId; },
    unique: true
  },
  password: {
    type: String,
    required: () => this.providerId === null,
  },
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''}
});

UserSchema.methods.serialize = function() {
  return {
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || ''
  };
};

UserSchema.methods.hasProvider = function() {
  return this.providerId.length > 0;
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

UserSchema.plugin(findOrCreate);

const User = mongoose.model('User', UserSchema);

module.exports = {User};
