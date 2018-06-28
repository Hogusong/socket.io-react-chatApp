import React, { Component } from 'react';
import '../css/chats.css';
import SideBar from './sidebar';
import ChatHeader from './chatHeader';
import Messages from './messages';
import MessageInput from './messageInput';
import { LOAD_CHATS, MESSAGE_RECEIVED, MESSAGE_SENT, TYPING } 
        from '../events';

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],    activeChat: null
    }
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.emit(LOAD_CHATS, this.loadChats)
  }

  loadChats = (chats) => {
    this.setState({ chats });
  }

  setActiveChat = (activeChat) => {
    const { socket } = this.props;
    this.setState({ activeChat })

		const messageEvent = `${MESSAGE_RECEIVED}-${activeChat._id}`
		const typingEvent = `${TYPING}-${activeChat._id}`

		socket.on(typingEvent, this.updateTypingInChat(activeChat._id))
		socket.on(messageEvent, this.addMessageToChat(activeChat._id))
		this.setState({activeChat})
  }

  leaveRoom = () => {
    if (!this.state.activeChat) this.props.logout();
    else   this.setState({ activeChat: null }) ;
  }

	addMessageToChat = (chatId)=>{
		return message => {
			const { chats } = this.state
			let newChats = chats.map((chat)=>{
				if(chat._id === chatId)
					chat.messages.push(message)
				return chat
			})

			this.setState({chats:newChats})
		}
	}

	/*
	*	Updates the typing of chat with id passed in.
	*	@param chatId {number}
	*/
	updateTypingInChat = (chatId) =>{
    console.log("I am here in update typing 1")
		return ({isTyping, user})=>{
			if(user !== this.props.user.name){

				const { chats } = this.state
        console.log("I am here in update typing 2")
				let newChats = chats.map((chat)=>{
					if(chat._id === chatId){
						if(isTyping && !chat.typingUsers.includes(user)){
							chat.typingUsers.push(user)
						}else if(!isTyping && chat.typingUsers.includes(user)){
							chat.typingUsers = chat.typingUsers.filter(u => u !== user)
						}
					}
					return chat
				})
				this.setState({chats:newChats})
			}
		}
	}

	/*
	*	Adds a message to the specified chat
	*	@param chatId {number}  The id of the chat to be added to.
	*	@param message {string} The message to be added to the chat.
	*/
	sendMessage = (chatId, message)=>{
		const { socket } = this.props
		socket.emit(MESSAGE_SENT, {chatId, message} )
	}

	/*
	*	Sends typing status to server.
	*	chatId {number} the id of the chat being typed in.
	*	typing {boolean} If the user is typing still or not.
	*/
	sendTyping = (chatId, isTyping)=>{
		const { socket } = this.props
		socket.emit(TYPING, {chatId, isTyping})
	}

  render() {
    const { chats, activeChat } = this.state;
    const { user } = this.props;
    console.log('active Chat:', activeChat)
    return (
      <div className="container">
        <SideBar  user={user}
                  chats={chats}
                  leaveRoom={this.leaveRoom}
                  activeChat={activeChat}
                  setActiveChat={this.setActiveChat} />

        <div className='chat-room'>
          { 
            !activeChat ? 
              <h3 id='choose'>Choose a chat!</h3> 
            :
              <div className='chat-room-container'>
                <ChatHeader name={activeChat.name}/>
                <Messages messages={activeChat.messages} 
                          user={user}
                          typingUsers={activeChat.typingUsers} />
                <MessageInput 
                          sendMessage={
                            (message)=>{
                              this.sendMessage(activeChat._id, message)
                            }
                          }
                          sendTyping={
                            (isTyping)=>{
                              this.sendTyping(activeChat._id, isTyping)
                            }
                          }
                    />
              </div>
          }
        </div>
      </div>
    );
  }
}

