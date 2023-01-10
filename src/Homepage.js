import axios from 'axios';
import React from 'react';
import Cart from './Cart';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
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
                        <Navbar.Brand>Reacto E-Commerce</Navbar.Brand>
                            <Form className="d-flex w-100">
                                <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={this.state.item}
                                onChange={e => this.setState({ item: e.target.value, items_filtered: [] })} 
                                />
                                <Button variant="success" onClick={this.findItems}>Search</Button>
                            </Form>
                        <Nav
                            className="my-lg-0"
                            style={{ maxHeight: '100px' }}
                        >
                            <Button variant="info ms-2 me-1" onClick={this.cart}>Cart</Button>
                            <Button variant="warning ms-1" onClick={this.logout}>Logout</Button>
                        </Nav>
                    </Container>
                </Navbar>

                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {
                    this.state.item === "" ?
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
