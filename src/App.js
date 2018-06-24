import React, { Component } from 'react';

import './css/app.css';
import Header from './components/header';
import Home from './components/home';
import Layout from './components/layout';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  name: ''}
  }

  setUser = (name) => this.setState({ name });

  logoutUser = () => {
    this.setState({  name: ''  })
  }

  loginUser = (name) => {

  }

  render() {
    return (
      <div className='App-body'>
        <Header name={this.state.name}
                setUser={this.setUser}
                loginUser={this.loginUser} 
                logout={this.logoutUser} />
        { !this.state.name ? <Home /> : <Layout name={this.state.name}/>}
        <footer>
          <span>G</span>od<span>B</span>less<span>U</span> Web Services &copy; 2018
        </footer>
      </div>
    );
  }
}

export default App;


