import React, { Component } from 'react';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', password: ''
    }
    this.accessLogIn = this.accessLogIn.bind(this);
  }
  
  closeLogIn() {
    document.getElementById('modal-login').style.display='none';
  }
 
  accessLogIn() {
    const username = this.state.username.trim();
    const password = this.state.password.trim();
    this.props.loginUser({ username, password });
  }

  componentDidUpdate() {
    if(this.props.user) {
      document.getElementById('modal-login').style.display='none';
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
            <label className="modal-label">Username or Email</label>
            <input className="modal-input" type="text" placeholder="Enter name or email" 
                    value={this.state.username}
                    onChange={(e) => this.setState({ username: e.target.value })} />

            <label className="modal-label">Password</label>
            <input className="modal-input" type="password" placeholder="Enter Password"
                    id="loginpass" value={this.state.password}
                    onChange={(e) => this.setState({ password: e.target.value })} />  

            <button onClick={() => this.accessLogIn()} className="modal-btn">Submit</button>
          </div>
        </div>    
      </div>
    )
  }
}

export default LogIn;
