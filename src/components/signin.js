import React, { Component } from 'react';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', email: '', password: '', confirm: ''
    }
  }

  render() {
    return (
      <div id="modal-signin" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span onClick={this.closeSignIn}>
                &times;</span>
            <h3>Sign in Info.</h3>
          </div>
          <div className="modal-info">
            <label className="modal-label">User Name</label>
            <input className="modal-input" type="text" placeholder="Enter username( 4 and more )" id="username"
                    value={this.state.username} />

            <label className="modal-label">Email</label>
            <input className="modal-input" type="Email" placeholder="Enter Email" id="email" 
                    value={this.state.email}/>

            <label className="modal-label">Password</label>
            <input className="modal-input" type="password" placeholder="Enter Password( 6 and more )" 
                    id="password" value={this.state.password}/>

            <label className="modal-label">Confirm password</label>
            <input className="modal-input" type="password" placeholder="Enter Password again( 6 and more )"
                    id="confirm" value={this.state.confirm}/>
            <button className="modal-btn">Submit</button>
          </div>
        </div>    
      </div>
    )
  }
}

export default SignIn;

