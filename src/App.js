import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap";
import React from 'react';
import Login from "./Login.js"
import Homepage from "./Homepage.js"
import Register from "./Register.js"

class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      page: "Login",
      users: [{
        username: "",
        password: ""
      }],
    }

  }

  changePage = (newPage) => {
    this.setState({page: newPage})
  }

  addUser = (user) => {
    this.setState({users: this.state.users.concat(user)})
  }

  render() {
    return (
      <div className= "App">
        {
          this.state.page === "Login" ?
          <Login changePage = {this.changePage} users = {this.state.users}/> :
          this.state.page === "Register" ?
          <Register changePage = {this.changePage} users= {this.state.users} addUser = {this.addUser}/> :
          <Homepage changePage = {this.changePage} /> 
        }
      </div>
    )
  }

}

export default App;