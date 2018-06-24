const io = require('./index').io;
var mongojs = require('mongojs');
var db = mongojs('chatroom');

const { VERIFY_USER, USER_CONNECTED } = require('./events');

let users = {};

module.exports = function(socket) {
  console.log('socket Id:', socket.id)

  socket.on(VERIFY_USER, (name, callback) => {
    if (name in users) {
      callback({ user: null, inUserIn: true })
    }
      const user = createUser(name);
      callback({ user, inUserIn: false })
  })
}