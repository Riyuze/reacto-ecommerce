import React from 'react';
import './index.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Swal from 'sweetalert2';


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
            this.successPopUp();
            this.props.changePage("Homepage");
            this.props.changeLogin(true);
            this.props.setLoggedUser(this.state.username)
        } 
        else {
            this.setState({ errorMessage: "Invalid Login" });
        }
    }

    redirectRegister = () => {
        this.props.changePage("Register");
    }

    successPopUp = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            background: "#000000",
            color: "#FFFFFF",
          })
          
          Toast.fire({
            icon: 'success',
            title: `Signed in successfully as ${this.state.username}`
          })
      }

    render() {
        return (
            <div className="Login gradient-custom">
                <Container>
                    <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <Card className="shadow bg-dark text-white">
                        <Card.Body className="text-center">
                            <div className="mb-3 mt-md-4">
                                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                <p className=" mb-5">Please enter your username and password!</p>
                                    <div className="mb-3">

                                        <Form>
                                            <Form.Group className="mb-3">
                                                <FloatingLabel label="Username" className="mb-3 text-secondary">
                                                    <Form.Control placeholder="Enter Username" value={this.state.username} onChange={event => this.setState({ username: event.target.value })}/>
                                                </FloatingLabel>
                                            </Form.Group>             

                                            <Form.Group className="mb-3">
                                                <FloatingLabel label="Password" className="mb-3 text-secondary">
                                                    <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={event => this.setState({ password: event.target.value })}/>
                                                </FloatingLabel>
                                            </Form.Group>

                                            {
                                                this.state.errorMessage !== "" ?
                                                    <Alert variant="danger">{this.state.errorMessage}</Alert> : null
                                            }

                                            <div className="d-grid">
                                                <Button variant="outline-light" onClick={this.onLogin} size="lg">
                                                    Login
                                                </Button>
                                            </div>    

                                        </Form>

                                        <div className="mt-3">
                                            <p className="mb-0 text-center">
                                                <span className="d-inline-block align-middle">Don't have an account?</span>
                                                <Button variant="link ps-1 pt-1" onClick={this.redirectRegister}>Register</Button>
                                            </p>
                                        </div>
                                    </div>
                            </div>
                        </Card.Body>
                        </Card>
                    </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Login;