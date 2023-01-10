import axios from 'axios';
import React from 'react';
import Cart from './Cart';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: "Homepage",
            item: "",
            items: [],
            items_filtered: [],
            cart: [],
        }
    }

    componentDidMount() {
        axios.get('https://online.akomate.com/atma/api/products').then(res => {
            this.setState({
                items: res.data
            })
        })
    }

    changePage = (newPage) => {
        this.setState({ page: newPage })
    }

    logout = () => {
        this.props.changePage("Login");
        this.props.is_logged_in(false)
    }

    login = () => {
        this.props.changePage("Login");
    }

    findItems = () => {
        this.setState({ items_filtered: this.state.items.filter(x => x.name.toLowerCase().includes(this.state.item.toLowerCase())) });
    }

    cart = () => {
        this.changePage("Cart");
    }

    addToCart = (item, amount) => {
        if (this.state.cart.find(cart => (cart.item === item))) {
            this.setState({
                cart: this.state.cart.map((i) => {
                    if (i.item === item) {
                        i.amount += amount
                        return i
                    }
                    else {
                        return i
                    }
                })
            })
        }
        else {
            this.setState({ cart: this.state.cart.concat({ item, amount }) })
        }
    }

    render() {
        return (
            this.state.page === "Cart" ?
            <Cart changePage={this.changePage} cart={this.state.cart} /> :
            <div className="Homepage">
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container fluid>
                        <Navbar.Brand className="me-4">Reacto E-Commerce</Navbar.Brand>
                            <Form className="d-flex w-100 ms-4">
                                <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={this.state.item}
                                onChange={e => this.setState({ item: e.target.value, items_filtered: [] })} 
                                />
                                <Button variant="success" className="me-4" onClick={this.findItems}>Search</Button>
                            </Form>
                            <Button variant="info" className="ms-4 me-1" onClick={this.cart}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                </svg>
                            </Button>
                            {
                                this.props.is_logged_in === false ?
                                <Button variant="warning" className="ms-1" onClick={this.login}>Login</Button> :
                                <Button variant="warning" className="ms-1" onClick={this.logout}>Logout</Button>
                            }
                    </Container>
                </Navbar>

                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {
                    this.state.items_filtered == "" ?
                        this.state.items.map((item) => {
                            return (
                                <Col>
                                    <Card bg="dark" text="white" className="text-center h-100">
                                        <Card.Img variant="top" src={item.image} style={{ maxWidth: "500px", height: "200px"}}/>
                                            <Card.Body className="d-flex flex-column">
                                                <Card.Title>{item.name}</Card.Title>
                                                <Card.Text>{item.detail}</Card.Text>
                                                <div className="mt-auto d-flex flex-column">
                                                    <Card.Text>Rp. {item.price}</Card.Text>
                                                    <Button variant="primary" onClick={() => { this.addToCart(item, 1) }}>Add to Cart</Button>
                                                </div>
                                            </Card.Body>
                                    </Card>                           
                                </Col>
                            )
                        }):
                        this.state.items_filtered.map((item) => {
                            return (
                                <Col>
                                    <Card bg="dark" text="white" className="text-center h-100">
                                        <Card.Img variant="top" src={item.image} style={{ maxWidth: "500px", height: "200px"}}/>
                                            <Card.Body className="d-flex flex-column">
                                                <Card.Title>{item.name}</Card.Title>
                                                <Card.Text>{item.detail}</Card.Text>
                                                <div className="mt-auto d-flex flex-column">
                                                    <Card.Text>Rp. {item.price}</Card.Text>
                                                    <Button variant="primary" onClick={() => { this.addToCart(item, 1) }}>Add to Cart</Button>
                                                </div>
                                            </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                }
                </Row>
            </div>
        );
    }
}

export default Homepage;
