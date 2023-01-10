import React from 'react';
import Login from "./Login.js"
import Homepage from "./Homepage.js"
import Register from "./Register.js"


class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      page: "Homepage",
      users: [{
        username: "",
        password: ""
      }],
      is_logged_in: false,
    }
  }

  changePage = (newPage) => {
    this.setState({page: newPage})
  }

  addUser = (user) => {
    this.setState({users: this.state.users.concat(user)})
  }

  changeLogin = (state) => {
    this.setState({is_logged_in: state})
  }

  render() {
    return (
      <div className= "App">
        {
          this.state.page === "Login" ?
          <Login changePage = {this.changePage} users = {this.state.users} changeLogin = {this.changeLogin}/> :
          this.state.page === "Register" ?
          <Register changePage = {this.changePage} users = {this.state.users} addUser = {this.addUser}/> :
          <Homepage changePage = {this.changePage} is_logged_in = {this.state.is_logged_in}/> 
        }
      </div>
    )
  }

}

export default App;