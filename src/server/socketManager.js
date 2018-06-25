const io = require('./index').io;
var mongojs = require('mongojs');
var db = mongojs('chatroom');

const { VERIFY_USER, USER_CONNECT, SIGNIN } = require('./events');

initDB();

module.exports = function(socket) {
  console.log('socket Id:', socket.id)

  socket.on(VERIFY_USER, (name, callback) => {
    if (name in users) {
      callback({ user: null, inUserIn: true })
    }
      const user = createUser(name);
      callback({ user, inUserIn: false })
  })

  socket.on(SIGNIN, (user, callback) => {
    db.users.find({ name: user.name }, function(err, docs) {
      if (docs.length > 0) callback(null) ;
      else {
        db.users.find({ email: user.email }, function(err, docs) {
          if (docs.length > 0) callback(null) ;
          else {
            db.users.save({ name: user.name,
                            email: user.email,
                            password: user.password
                          }, function(err, saved) {
              if (saved) callback(user);
              else callback(null) ;
            })            
          }
        })
      }
    })
  })
}

function initDB() {
  db.chattingRooms.find({}, function(err, docs) {
    if (docs.length < 1) {
      db.chattingRooms.save({
        name: 'Community',
        users: [],
        messages: [],
        typingUsers: []
      })
    }
  })  
}