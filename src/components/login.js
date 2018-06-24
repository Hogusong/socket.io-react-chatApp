import React, { Component } from 'react';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', password: ''
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
                    value={this.state.username}/>

            <label className="modal-label">Password</label>
            <input className="modal-input" type="password" placeholder="Enter Password"
                    id="loginpass" value={this.state.password} />

            <button className="modal-btn">Submit</button>
          </div>
        </div>    
      </div>
    )
  }
}

export default LogIn;
