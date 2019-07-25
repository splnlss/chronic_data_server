'use strict';
const {router} = require('./router');
const {localStrategy, jwtStrategy, dropboxStrategy} = require('./strategies');

module.exports = {router, localStrategy, jwtStrategy, dropboxStrategy};
