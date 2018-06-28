import React, { Component } from 'react';
import { VERIFY_USER } from '../events';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {  name: '', password: ''    }
    this.accessLogIn = this.accessLogIn.bind(this);
  }
  
  closeLogIn() {
    document.getElementById('modal-login').style.display='none';
  }
 
  accessLogIn() {
    const name = this.state.name.trim();
    const password = this.state.password.trim();
    const user = { name, password }
    const { socket } = this.props;
    socket.emit(VERIFY_USER, user, this.login)
  }

  pressEnter = (e) => {
    if(e.keyCode === 13 || e.key === 'Enter') {
      this.accessLogIn()
    }
  }

  login = (user) => {
    if (user) {
      document.getElementById('modal-login').style.display='none';    
      this.props.loginUser(user);
    } else {
      alert('The username is not exist. Try again.')
    }
  }

  render() {
    return (
      <div id="modal-login" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span onClick={this.closeLogIn}>
                &times;</span>
            <h3>Log in Info.</h3>
          </div>
          <div className="modal-info">
            <label className="modal-label">name or Email</label>
            <input className="modal-input" type="text" placeholder="Enter name or email" 
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })} />

            <label className="modal-label">Password</label>
            <input className="modal-input" type="password" placeholder="Enter Password"
                    id="loginpass" value={this.state.password}
                    onKeyPress={this.pressEnter}
                    onChange={(e) => this.setState({ password: e.target.value })} />  

            <button onClick={() => this.accessLogIn()} className="modal-btn">Submit</button>
          </div>
        </div>    
      </div>
    )
  }
}

export default LogIn;
