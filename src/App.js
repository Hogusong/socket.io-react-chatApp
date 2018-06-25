import React, { Component } from 'react';
import io from 'socket.io-client';
import { USER_CONNECT, LOGOUT} from './server/events'

import './css/app.css';
import Header from './components/header';
import Home from './components/home';
import Layout from './components/layout';

const socketUrl = 'http://192.168.1.187:3231/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  user: null, socket: null }
  }

  initSocket = () => {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      this.setState({ socket })
    })
  }

  // setUser = (user) => this.setState({ user });

  logoutUser = () => {
    const socket = this.state.socket;
    socket.emit(LOGOUT, this.state.user)
    this.setState({  user: null  })
  }

  loginUser = (user) => {
    console.log('In App user:', user)
    const socket = this.state.socket;
    // socket.emit(USER_CONNECT, user)
    this.setState({ user })
  }

  componentWillMount() {
    this.initSocket()
  }

  render() {
    return (
      <div className='App-body'>
        <Header socket={this.state.socket}
                user={this.state.user}
                setUser={this.setUser}
                loginUser={this.loginUser} 
                logout={this.logoutUser} />
        { !this.state.user ? <Home /> : <Layout name={this.state.name}/>}
        <footer>
          <span>G</span>od<span>B</span>less<span>U</span> Web Services &copy; 2018
        </footer>
      </div>
    );
  }
}

export default App;


