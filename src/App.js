import React from 'react';
import Login from "./components/Login.jsx"
import Homepage from "./components/Homepage.jsx"
import Register from "./components/Register.jsx"


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
      logged_in_user: "",
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

  setLoggedUser = (user) => {
    this.setState({logged_in_user: user})
  }

  render() {
    return (
      <div className= "App">
        {
          this.state.page === "Login" ?
          <Login changePage = {this.changePage} users = {this.state.users} changeLogin = {this.changeLogin} setLoggedUser = {this.setLoggedUser}/> :
          this.state.page === "Register" ?
          <Register changePage = {this.changePage} users = {this.state.users} addUser = {this.addUser}/> :
          <Homepage changePage = {this.changePage} is_logged_in = {this.state.is_logged_in} logged_in_user = {this.state.logged_in_user} changeLogin = {this.changeLogin}/> 
        }
      </div>
    )
  }

}

export default App;