import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';


class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <div className="Cart">

                <Modal show={this.props.showModal} size="sm" aria-labelledby="contained-modal-title-vcenter" onHide={() => { this.props.closeModal() }} centered>
                    <Modal.Header closeButton className="bg-black text-white" closeVariant="white">
                        <Modal.Title id="contained-modal-title-vcenter" className="bg-black">
                            Edit Item
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-black text-white">
                        <Card bg="black" text="white" className="text-center h-100">
                            <Card.Img className="rounded" src={this.props.modalItem.image} style={{ height: "125px"}}/>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="fw-bold fs-4">{this.props.modalItem.name}</Card.Title>
                                    <div className="mt-auto d-flex flex-column">
                                        <Card.Text>{this.props.modalItem.detail}</Card.Text>
                                        {this.props.cart.map((i) => {
                                            if (i.item === this.props.modalItem) {
                                                return <div>
                                                    <Card.Text className="fw-bold">{this.props.formatCurrency(this.props.modalItem.price)}</Card.Text>
                                                    <div className="d-flex justify-content-center">
                                                        <Badge bg="dark" className="fs-5 fw-bold mb-4 text-decoration-underline">Subtotal: {this.props.formatCurrency(this.props.modalItem.price * i.amount)}</Badge>
                                                    </div>
                                               </div>
                                            }
                                            return null
                                        })}
                                            <div className="d-flex">                                                       
                                                <InputGroup>
                                                <Button variant="primary" onClick={() => { this.props.substractAmount(this.props.modalItem) }}>-</Button>
                                                    <InputGroup.Text>
                                                    {this.props.cart.map((i) => {
                                                        if (i.item === this.props.modalItem) {
                                                            return i.amount
                                                        }
                                                        return null
                                                    })}
                                                    </InputGroup.Text>
                                                <Button variant="primary" onClick={() => { this.props.addAmount(this.props.modalItem) }}>+</Button>
                                                </InputGroup>
                                                <Button variant="danger" onClick={() => { this.props.remove(this.props.modalItem) }}>Remove</Button> 
                                            </div>                                               
                                    </div>
                                </Card.Body>
                        </Card>
                    </Modal.Body>
                </Modal>

                <Offcanvas show={this.props.showCart} onHide={this.props.cartClose} placement="end" className="bg-black text-white">
                    <Offcanvas.Header closeButton closeVariant="white">
                        <Offcanvas.Title className="fw-bold fs-5">Cart</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {
                            this.props.cart.map((item) => {
                                return <Stack direction="horizontal" gap={2} className="d-flex align-items-center mb-4">
                                            <img src={item.item.image} alt="" style={{ width: "200px", height: "75px", objectFit: "fill", maxWidth: "125px"}} className="rounded"></img>
                                            <div className="me-auto">
                                                <div>
                                                {item.item.name}{" "}
                                                {item.amount > 1 && (
                                                    <span className="text-muted" style={{ fontSize: ".65rem" }}>&times;{item.amount}</span>
                                                )}
                                                <div className="text-muted" style={{ fontSize: ".75rem" }}>{this.props.formatCurrency(item.item.price)}</div>
                                                </div>
                                                <div style={{ fontSize: ".90rem" }}>
                                                    <Badge bg="dark">{this.props.formatCurrency(item.item.price * item.amount)}</Badge>
                                                </div>
                                            </div>
                                            <Button variant="success" size="sm" onClick={() => { this.props.openModal(item.item) }}>Edit</Button> 
                                    </Stack>
                            })                        
                        }
                        {
                            //eslint-disable-next-line
                            this.props.cart == "" ?
                            null :
                            <div className="d-flex float-end text-decoration-underline">
                                <Badge className="fw-bold fs-5" bg="dark">Total: {this.props.formatCurrency(this.props.total)}</Badge>
                            </div>
                        }
                    </Offcanvas.Body>
                    {
                    //eslint-disable-next-line
                    this.props.cart == "" ?
                    <div className="align-items-center d-grid">
                        <Button variant="dark" className="fw-bold fs-5 me-3 ms-3 mb-3 mt-3" disabled>No Items</Button>
                    </div> :
                    <div className="align-items-center d-grid">
                        <Button className="fw-bold fs-5 me-3 ms-3 mb-3 mt-3">Checkout</Button>
                    </div>
                    }
                </Offcanvas>
            </div>
        );
    }
}

export default Cart;
