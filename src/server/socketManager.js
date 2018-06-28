const io = require('./index').io;
var mongojs = require('mongojs');
var db = mongojs('chatroom');
const uuidv4 = require('uuid/v4');

const { VERIFY_USER, USER_CONNECTED, SIGNIN, USER_DISCONNECTED, 
        LOGOUT, MESSAGE_RECEIVED, MESSAGE_SENT, COMMUNITY_CHAT,
        TYPING, LOAD_CHATS } = require('../events');

initDB();

module.exports = function(socket) {
  console.log('socket Id:', socket.id)
  let sendMessageToChatFromUser;
  let sendTypingFromUser;
    
  socket.on(VERIFY_USER, (user, callback) => {
    if(user.name.indexOf('@') >= 0) {
      db.users.find({ email: user.name }, function(err, docs) {
        if (docs.length > 0)  callback(docs[0]);
        else                  callback(null)
      })
    } else {
      db.users.find({ name: user.name }, function(err, docs) {
        if (docs.length > 0)  callback(docs[0]);
        else                  callback(null)
      })
    }
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

  socket.on(USER_CONNECTED, (user, callback) => {
    db.connectedUsers.find({ name: user.name }, function(err, docs) {
      if (docs.length < 1) {
        db.connectedUsers.save({ name: user.name }, function(err, saved) {
          if (saved) {
            db.connectedUsers.find({}, function(err, docs) {
              socket.username = user.name;
              callback(user);

              sendMessageToChatFromUser = sendMessageToChat(user.name);
              sendTypingFromUser = sendTypingToChat(user.name)

              io.emit(USER_CONNECTED, docs);
              console.log('connected:', docs)  
            });
          }
        });
      } else {
        callback(null);
      }
    })
  })

  socket.on(LOAD_CHATS, (callback) => {
    db.chattingRooms.find({}, function(err, docs) {
      console.log(docs[0])
      console.log('name', docs[0].name)
      callback(docs)
    })
  })

  socket.on(LOGOUT, (user) => {
    db.connectedUsers.remove({ name: user.name }, function(err, removed) {
      if (removed) {
        db.connectedUsers.find({}, function(err, docs) {
          io.emit(USER_DISCONNECTED, docs)
          console.log('remained after logout:', docs)  
        })
      }
    })
  }) 

  socket.on('disconnect', () => {
    if ('username' in socket) {
      db.connectedUsers.remove({ name: socket.username }, function(err, removed) {
        if (removed) {
          db.connectedUsers.find({}, function(err, docs) {
            io.emit(USER_DISCONNECTED, docs)
            console.log('remained after disconnect:', docs)  
          })
        }
      })
    }
  }) 

	socket.on(MESSAGE_SENT, ({chatId, message})=>{
    console.log('I am here', chatId, message)
		sendMessageToChatFromUser(chatId, message)
	})

	socket.on(TYPING, ({chatId, isTyping})=>{
		sendTypingFromUser(chatId, isTyping)
	})
}

function sendTypingToChat(user){
	return (chatId, isTyping)=>{
		io.emit(`${TYPING}-${chatId}`, {user, isTyping})
	}
}

function sendMessageToChat(sender){
  console.log('I am here', sender)
	return (chatId, message)=>{
		io.emit(`${MESSAGE_RECEIVED}-${chatId}`, createMessage(message, sender))
	}
}

function createMessage(message = "", sender = "") {
  return (
    {	
      id: uuidv4(),			message,			sender,	
      time: getTime(new Date(Date.now()))
    }
  )
}

function getTime(date) {
	return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`
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