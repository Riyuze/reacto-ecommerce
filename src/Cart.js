import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';


class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <div className="Cart">
                <Offcanvas show={this.props.show} onHide={this.props.cartClose} placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Your Cart</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {
                            this.props.cart.map((item) => {
                                return <div class="card">
                                <img src={item.item.image} class="card-img-top rounded mx-auto d-block" alt="" style={{ maxWidth: "400px", height: "250px"}}></img>
                                <div class="card-body">
                                    <h5 class="card-title">{item.item.name}</h5>
                                    <p class="card-text">{item.item.detail}</p>
                                    <p class="card-text">Rp. {item.item.price},-</p>
                                    <p>Total = Rp. {item.item.price * item.amount},-</p>
                                </div>
                            </div>
                            })
                        }
                        </Offcanvas.Body>
                    <h2>Total All Items = Rp. {this.props.total},-</h2>
                </Offcanvas>
            </div>
        );
    }
}

export default Cart;
