import React, { Component } from 'react';
import io from 'socket.io-client';

import { USER_CONNECTED, LOGOUT } from './events'
import './css/app.css';
import Header from './components/header';
import Home from './components/home';
import ChatContainer from './chats/chatContainer';

const socketUrl = 'http://192.168.1.187:3231/';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  user: null, socket: null }
  }

  // Connect to and initializes the socket before mounting
  componentWillMount() {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      this.setState({ socket })
    })
  }

  logoutUser = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT, this.state.user)
    this.setState({  user: null  })
  }

  loginUser = (user) => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user, this.setUser)
  }

  // Sets the user(_id, name) property in state 
  setUser = (user) => {
    if (user) this.setState({ user });
    else alert('This user is already in.')
  }

  render() {
    return (
      <div className='App-body'>
        <Header socket={this.state.socket}
                user={this.state.user}
                loginUser={this.loginUser} 
                logout={this.logoutUser} />
        { !this.state.user ? 
            <Home /> : 
            <ChatContainer user={this.state.user}
                           socket={this.state.socket}
                           logout={this.logoutUser} />}
        <footer>
          <span>G</span>od<span>B</span>less<span>U</span> Web Services &copy; 2018
        </footer>
      </div>
    );
  }
}
