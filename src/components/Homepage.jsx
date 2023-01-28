import './Homepage.css';
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
import InputGroup from 'react-bootstrap/InputGroup';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Swal from 'sweetalert2';
import Badge from 'react-bootstrap/Badge';
import { run as runHolder } from 'holderjs';



class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: "Homepage",
            item: "",
            items: [],
            items_filtered: [],
            cart: [],
            showCart: false,
            total: 0,
            showModal: false,
            modalItem: "",
            count: 0
        }
    }


    componentDidMount() {
        axios.get('https://online.akomate.com/atma/api/products').then(res => {
            this.setState({
                items: res.data
            })
        })
        runHolder();
    }

    logout = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            background: "#000000",
            color: "#FFFFFF",
          })
        
        Swal.fire({
            title: 'Logging Out?',
            text: 'Do you want to log out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Log Out!',
            color: '#FFFFFF',
            background: '#000000'
          }).then((result) => {
            if (result.isConfirmed) {
                Toast.fire({
                    icon: 'success',
                    title: 'Signed out successfully'
                    })
                this.props.changeLogin(false); 
                this.setState({cart: []});
                this.setState({count: 0});
                }
            }
          )
    }

    login = () => {
        this.props.changePage("Login");
    }

    findItems = () => {
        this.setState({ items_filtered: this.state.items.filter(x => x.name.toLowerCase().includes(this.state.item.toLowerCase())) });
    }

    findTotal = () => {
        this.setState({total: this.state.cart.reduce((accumulator, item) => {
            return accumulator + (item.item.price * item.amount)
        }, 0)})
    }

    cartShow = () => {
        if (this.props.is_logged_in === false) {
            this.loginPopUp("cart");
        }
        else {
            this.setState({showCart: true});
            this.findTotal();
        }
    }

    cartClose = () => {
        this.setState({showCart: false});
    }

    cartPopUp = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Item successfully added to cart',
            showConfirmButton: false,
            timer: 1000,
            color: "#FFFFFF",
            background: "#000000",
          })
    }

    loginPopUp = (type) => {
        let text = ""
        if (type === "item" ) {
            text = "You need to log in to add this item to cart!"
        }
        else {
            text = "You need to log in to open cart!"
        }
        Swal.fire({
            title: 'Not logged in!',
            text: `${text}`,
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Login',
            color: "#FFFFFF",
            background: "#000000"
          }).then((result) => {
            if (result.isConfirmed) {
              this.login();
            }
          })
    }

    updateCount = () => {
        this.setState({count: this.state.cart.reduce((accumulator, item) => {
            return accumulator + item.amount
        }, 0)})
    }

    addToCart = (item, amount) => {
        if (this.props.is_logged_in === false) {
            this.loginPopUp("item");
        }
        else {
            this.setState({ cart: this.state.cart.concat({ item, amount }) });
            this.cartPopUp();
            this.setState({ count: this.state.count + 1 });
        }
    }

    addAmount = (item) => {
        this.state.cart.map((i) => {
            if (i.item === item) {
                i.amount += 1
                return i
            }
            return null
        })
        this.setState({ cart: this.state.cart });
        this.findTotal();
        this.updateCount();
    }

    substractAmount = (item) => {
        this.state.cart.map((i) => {
            if (i.item === item) {
                if (i.amount === 1) {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: 'Do you want to remove this item from cart?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#3085d6',
                        confirmButtonText: 'Yes, remove it!',
                        color: '#FFFFFF',
                        background: '#000000'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            title: 'Removed!',
                            text: 'This item has been removed.',
                            icon: 'success',
                            color: '#FFFFFF',
                            background: '#000000',
                            showConfirmButton: false,
                            timer: 1000,
                            })
                          const index = this.state.cart.indexOf(i);
                          if (index > -1 ) {
                            this.state.cart.splice(index, 1);
                          }
                          this.setState({ cart: this.state.cart });
                          this.closeModal();
                          this.updateCount();
                        }
                      })
                }
                else {
                    i.amount -= 1
                }  
                return i
            }
            return null
        })
        this.setState({ cart: this.state.cart });
        this.findTotal();
        this.updateCount();
    }

    remove = (item) => {
        this.state.cart.map((i) => {
            if (i.item === item) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: 'Do you want to remove this item from cart?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, remove it!',
                    color: '#FFFFFF',
                    background: '#000000'
                    }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                        title: 'Removed!',
                        text: 'This item has been removed.',
                        icon: 'success',
                        color: '#FFFFFF',
                        background: '#000000',
                        showConfirmButton: false,
                        timer: 1000,
                        })
                        const index = this.state.cart.indexOf(i);
                        if (index > -1 ) {
                        this.state.cart.splice(index, 1);
                        }
                        this.setState({ cart: this.state.cart });
                        this.closeModal();
                        this.findTotal();
                        this.updateCount();
                    }
                    })
                }
            return null
        })
    }

    openModal = (i) => {
        this.setState({ showModal: true });
        this.setState({ modalItem: i })
    }

    closeModal = () => {
        this.setState({ showModal: false });
    }

    formatCurrency = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(price);
    }


    render() {
        return (
            <div className="Homepage bg-dark">

                <Cart showCart={this.state.showCart} cart={this.state.cart} cartClose={this.cartClose} total={this.state.total} showModal={this.state.showModal} modalItem={this.state.modalItem}
                openModal={this.openModal} closeModal={this.closeModal} formatCurrency={this.formatCurrency} addAmount={this.addAmount} substractAmount={this.substractAmount} remove={this.remove}/>

                <Navbar bg="black" variant="dark" expand="lg" sticky="top">
                    <Container fluid>
                        <Navbar.Brand className="me-4 ms-2 d-flex">
                            Reacto <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-bar-expand" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M3.646 10.146a.5.5 0 0 1 .708 0L8 13.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-4.292a.5.5 0 0 0 .708 0L8 2.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708zM1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8z"/>
                            </svg>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-lg`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                            placement="start"
                            className="bg-black text-white"
                            >
                            <Offcanvas.Header closeButton closeVariant="white">
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`} className="me-4 ms-2 d-flex">
                                    Reacto <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-bar-expand" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M3.646 10.146a.5.5 0 0 1 .708 0L8 13.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-4.292a.5.5 0 0 0 .708 0L8 2.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708zM1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8z"/>
                                    </svg>
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                            <Form className="search d-flex w-100 ms-4">
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
                                <Button variant="info" className="cart ms-4 me-1" onClick={this.cartShow} style={{position: "relative"}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-cart-fill" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                    </svg>
                                    {this.state.count > 0 && (
                                        <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center" style={{
                                            color: "white",
                                            width: "1rem",
                                            height: "1rem",
                                            position: "absolute",
                                            bottom: 0,
                                            right: 0,
                                            transform: "translate(25%, 25%)",
                                            fontSize: 10
                                        }}>{this.state.count}</div>
                                    )}
                                </Button>
                                {
                                    this.props.is_logged_in === false ?
                                    <Button variant="primary" className="login ms-1 me-2 text-white" onClick={this.login}>Login</Button> :
                                    <div className="d-flex mx-auto">
                                        <Button variant="outline-light" className="user ms-1 me-1" disabled>
                                            {
                                            this.props.logged_in_user === "" ? 
                                                <div>&nbsp;</div> :
                                            this.props.logged_in_user
                                            }
                                        </Button>
                                        <Button variant="danger" className="logout ms-1 me-2 text-white" onClick={this.logout}>Logout</Button>        
                                    </div>                       
                                }
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>

                <Carousel fade className="mt-4 mb-4">
                    <Carousel.Item>
                        <img
                            className="d-block w-100 mx-auto"
                            style={{ maxWidth: "800px", height: "400px"}}
                            src="holder.js/800x400?text=First slide&bg=373940"
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
                            src="holder.js/800x400?text=Second slide&bg=373940"
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
                            src="holder.js/800x400?text=Third slide&bg=373940"
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
                                            <Card.Img variant="top" src={item.image} style={{ height: "250px"}}/>
                                                <Card.Body className="d-flex flex-column">
                                                    <Card.Title className="fw-bold fs-4">{item.name}</Card.Title>
                                                    <Card.Text>{item.detail}</Card.Text>
                                                    <div className="mt-auto d-flex flex-column">
                                                        <Card.Text><Badge bg="dark" className="fs-5 fw-bold">{this.formatCurrency(item.price)}</Badge></Card.Text>
                                                        {
                                                            this.state.cart.find(cart => (cart.item === item)) ?   
                                                                <div className="d-flex">                                                       
                                                                    <InputGroup>
                                                                    <Button variant="primary" onClick={() => { this.substractAmount(item) }}>-</Button>
                                                                        <InputGroup.Text>
                                                                        {this.state.cart.map((i) => {
                                                                            if (i.item === item) {
                                                                                return i.amount
                                                                            }
                                                                            return null
                                                                        })}
                                                                        </InputGroup.Text>
                                                                    <Button variant="primary" onClick={() => { this.addAmount(item) }}>+</Button>
                                                                    </InputGroup>
                                                                    <Button variant="danger" onClick={() => { this.remove(item) }}>Remove</Button> 
                                                                </div>
                                                                : 
                                                            <Button variant="primary" onClick={() => { this.addToCart(item, 1) }}>Add to Cart</Button>
                                                        }                                                        
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
                                            <Card.Img variant="top" src={item.image} style={{ height: "250px"}}/>
                                                <Card.Body className="d-flex flex-column">
                                                    <Card.Title className="fw-bold fs-4">{item.name}</Card.Title>
                                                    <Card.Text>{item.detail}</Card.Text>
                                                    <div className="mt-auto d-flex flex-column">
                                                        <Card.Text><Badge bg="dark" className="fs-5 fw-bold">{this.formatCurrency(item.price)}</Badge></Card.Text>  
                                                        {
                                                            this.state.cart.find(cart => (cart.item === item)) ?   
                                                                <div className="d-flex">                                                       
                                                                    <InputGroup>
                                                                    <Button variant="primary" onClick={() => { this.substractAmount(item) }}>-</Button>
                                                                        <InputGroup.Text>
                                                                        {this.state.cart.map((i) => {
                                                                            if (i.item === item) {
                                                                                return i.amount
                                                                            }
                                                                            return null
                                                                        })}
                                                                        </InputGroup.Text>
                                                                    <Button variant="primary" onClick={() => { this.addAmount(item) }}>+</Button>
                                                                    </InputGroup>
                                                                    <Button variant="danger" onClick={() => { this.remove(item) }}>Remove</Button> 
                                                                </div>
                                                                : 
                                                            <Button variant="primary" onClick={() => { this.addToCart(item, 1) }}>Add to Cart</Button>
                                                        }                                                        
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
