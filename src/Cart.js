import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';


class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }
    }

    editItem = (item) => {

    }


    render() {
        return (
            <div className="Cart">


                <Offcanvas show={this.props.showCart} onHide={this.props.cartClose} placement="end" className="bg-black text-white">
                    <Offcanvas.Header closeButton closeVariant="white">
                        <Offcanvas.Title className="fw-bold fs-5">Cart</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {
                            this.props.cart.map((item) => {
                                return <Stack direction="horizontal" gap={2} className="d-flex align-items-center mb-4">
                                            <img src={item.item.image} style={{ width: "200px", height: "75px", objectFit: "fill", maxWidth: "125px"}} className="rounded"></img>
                                            <div className="me-auto">
                                                <div>
                                                {item.item.name}{" "}
                                                {item.amount > 1 && (
                                                    <span className="text-muted" style={{ fontSize: ".65rem" }}>&times;{item.amount}</span>
                                                )}
                                                <div className="text-muted" style={{ fontSize: ".75rem" }}>Rp. {item.item.price},-</div>
                                                </div>
                                                <div style={{ fontSize: ".90rem" }}>
                                                    <Badge bg="dark">Rp. {item.item.price * item.amount},-</Badge>
                                                </div>
                                            </div>
                                            <Button variant="success" size="sm">Edit</Button> 
                                    </Stack>
                            })
                        }
                        </Offcanvas.Body>
                    <div className="mx-auto fw-bold fs-5 align-items-center mb-4">
                        Total &nbsp;
                        <Badge bg="primary" className="fw-bold fs-5">Rp. {this.props.total},-</Badge>
                    </div>
                </Offcanvas>
            </div>
        );
    }
}

export default Cart;
