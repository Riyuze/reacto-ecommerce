import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';


class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <div className="Cart">
                <Offcanvas show={this.props.show} onHide={this.props.cartClose} placement="end" className="bg-black text-white">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Cart</Offcanvas.Title>
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
                                                    <span className="text-muted" style={{ fontSize: ".65rem" }}>x{item.amount}</span>
                                                )}
                                                <div className="text-muted" style={{ fontSize: ".75rem" }}>Rp. {item.item.price},-</div>
                                                </div>
                                                <div style={{ fontSize: ".90rem" }}>
                                                    Total = Rp. {item.item.price * item.amount},-
                                                </div>
                                            </div>
                                            <Button variant="outline-danger" size="sm">&times;</Button> 
                                    </Stack>
                            })
                        }
                        </Offcanvas.Body>
                    <h4>Total = Rp. {this.props.total},-</h4>
                </Offcanvas>
            </div>
        );
    }
}

export default Cart;
