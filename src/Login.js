import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorMessage: "",
        }
    }

    onLogin = () => {
        if (this.props.users.find(user => (user.username === this.state.username && user.password === this.state.password))) {
            this.props.changePage("Homepage");
        } 
        else {
            this.setState({ errorMessage: "Invalid Login" });
        }
    }

    redirectRegister = () => {
        this.props.changePage("Register");
    }

    render() {
        return (
            <section class="vh-100 src=" src="login-bg.jpg">
                <div className="Login" class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                        <div class="card-body p-5 text-center box">

                            <div class="mt-md-4">

                            <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                            <p class="text-white-50 mb-5">Please enter your username and password!</p>

                            <div class="form-outline form-white mb-4">
                                <input value={this.state.username}
                                    onChange={event => this.setState({ username: event.target.value })} class="form-control form-control-lg" />
                                <label class="form-label">Username</label>
                            </div>

                            <div class="form-outline form-white mb-4">
                                <input type="password" value={this.state.password}
                                    onChange={event => this.setState({ password: event.target.value })} class="form-control form-control-lg" />
                                <label class="form-label">Password</label>
                            </div>

                            <button class="btn btn-outline-light btn-lg px-5" type="submit" onClick={this.onLogin}>Login</button>

                            </div>

                            {
                            this.state.errorMessage !== "" ?
                                <label class="text-danger">{this.state.errorMessage}</label> :
                            null
                            }

                            <div>
                            <p class="mb-0">Don't have an account? <button class="btn btn-link p-0 mb-2" onClick={this.redirectRegister}>Register</button>
                            </p>
                            </div>

                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Login;