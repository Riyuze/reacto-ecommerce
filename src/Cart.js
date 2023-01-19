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
            showModal: false,
            item: {},
        }
    }

    openModal = (i) => {
        this.setState({ showModal: true });
        this.setState({ item: i })
    }

    closeModal = () => {
        this.setState({ showModal: false });
    }


    render() {
        return (
            <div className="Cart">

                <Modal show={this.state.showModal} size="sm" aria-labelledby="contained-modal-title-vcenter" onHide={() => { this.closeModal() }} centered>
                    <Modal.Header closeButton className="bg-black text-white" closeVariant="white">
                        <Modal.Title id="contained-modal-title-vcenter" className="bg-black">
                            Edit Item
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-black text-white">
                        <Card bg="black" text="white" className="text-center h-100">
                            <Card.Img className="rounded" src={this.state.item.image} style={{ height: "125px"}}/>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{this.state.item.name}</Card.Title>
                                    <Card.Text>{this.state.item.detail}</Card.Text>
                                    <div className="mt-auto d-flex flex-column">
                                        <Card.Text>{this.props.formatCurrency(this.state.item.price)}</Card.Text>
                                            <div className="d-flex">                                                       
                                                <InputGroup>
                                                <Button variant="primary">-</Button>
                                                    <InputGroup.Text>
                                                    {this.props.cart.map((i) => {
                                                        if (i.item === this.state.item) {
                                                            return i.amount
                                                        }
                                                        return null
                                                    })}
                                                    </InputGroup.Text>
                                                <Button variant="primary">+</Button>
                                                </InputGroup>
                                                <Button variant="danger">Remove</Button> 
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
                                            <Button variant="success" size="sm" onClick={() => { this.openModal(item.item) }}>Edit</Button> 
                                    </Stack>
                            })
                        }
                    </Offcanvas.Body>
                    {
                    //eslint-disable-next-line
                    this.props.cart == "" ?
                    <div className="mx-auto align-items-center mb-4">
                        <Badge bg="dark" className="fw-bold fs-5">No Items</Badge>
                    </div> :
                    <div className="mx-auto fw-bold fs-5 align-items-center mb-4">
                        Total &nbsp;
                        <Badge bg="primary" className="fw-bold fs-5">{this.props.formatCurrency(this.props.total)}</Badge>
                    </div>
                    }
                </Offcanvas>
            </div>
        );
    }
}

export default Cart;
