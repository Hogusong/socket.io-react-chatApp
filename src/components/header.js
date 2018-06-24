import React, { Component } from 'react';
import logo from '../logo.svg';
import SignIn from './signin';
import LogIn from './login';

class Header extends Component {
  openSignIn() {
    document.getElementById('modal-signin').style.display='block';
  }

  openLogIn() {
    document.getElementById('modal-login').style.display='block';
  }

  render() {
    const logger = (this.props.user) ? 
        <div id="logger">
          <a onClick={this.props.logout}>Log out</a>
        </div> :
        <div id="logger">
          <a onClick={this.openLogIn}>Log in</a> / 
          <a onClick={this.openSignIn}>Sign in</a>
       </div> 
      
    return (
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <h1 className="App-title">
              Welcome <span>{(this.props.user) ? this.props.user.name : ''}</span> to Chat
            </h1>
            { logger }
          </div>
        </div>    
        <SignIn loginUser={this.props.loginUser} />
        <LogIn  loginUser={this.props.loginUser} />
      </div>
    )
  }
}

export default Header;
