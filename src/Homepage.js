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
import Carousel from 'react-bootstrap/Carousel';



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
            <div className="Homepage bg-dark">

                <Navbar bg="black" variant="dark" expand="lg">
                    <Container fluid>
                        <Navbar.Brand className="me-4 ms-2 d-flex">
                            Reacto <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-bar-expand" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M3.646 10.146a.5.5 0 0 1 .708 0L8 13.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-4.292a.5.5 0 0 0 .708 0L8 2.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708zM1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8z"/>
                            </svg>
                        </Navbar.Brand>
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-cart-fill" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                </svg>
                            </Button>
                            {
                                this.props.is_logged_in === false ?
                                <Button variant="danger" className="ms-1 me-2 text-white" onClick={this.login}>Login</Button> :
                                <div className="d-flex mx-auto">
                                    <Button variant="primary" className="disabled ms-1 me-1">{this.props.logged_in_user}</Button>
                                    <Button variant="danger" className="ms-1 me-2 text-white" onClick={this.logout}>Logout</Button>        
                                </div>                       
                            }
                    </Container>
                </Navbar>

                <Carousel fade className="mt-4 mb-4">
                    <Carousel.Item>
                        <img
                            className="d-block w-100 mx-auto"
                            style={{ maxWidth: "800px", height: "400px"}}
                            src=""
                            alt="First"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 mx-auto"
                            style={{ maxWidth: "800px", height: "400px"}}
                            src=""
                            alt="Second"
                        />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 mx-auto"
                            style={{ maxWidth: "800px", height: "400px"}}
                            src=""
                            alt="Third"
                        />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                <div className="me-4 ms-4 mt-4 mb-4">
                    <h1 className="text-white">All Items</h1>
                    <Row xs={1} sm={1} md={2} lg={3} className="g-4">
                    {
                        // eslint-disable-next-line
                        this.state.items_filtered == "" ?
                            this.state.items.map((item) => {
                                return (
                                    <Col>
                                        <Card bg="black" text="white" className="text-center h-100">
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
                                        <Card bg="black" text="white" className="text-center h-100">
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

                <footer className="mt-4 text-white">
                    <div className="text-center">
                        © 2022 Copyright&nbsp;
                        <a href="https://www.github.com/Riyuze/">Riyuze</a>
                    </div>

                </footer>

            </div>
        );
    }
}

export default Homepage;
