import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            total: 0
        }
    }

    return = () => {
        this.props.changePage("Homepage");
    }

    findTotal = () => {
        this.setState({total: this.props.cart.reduce((accumulator, item) => {
            console.log(accumulator)
            console.log(item)
            return accumulator + (item.item.price * item.amount)
        }, 0)})
    }

    componentDidMount() {
        this.findTotal()
    }

    render() {
        return (
            <div className="Cart">
                <div>
                    <button onClick={this.return}>Return to Homepage</button>
                </div>
                <h1>Your Cart</h1>
                <ul style={{ listStyle: "none" }}>
                    {
                        this.props.cart.map((item) => {
                            return <li key={item.item.id}>
                                <h2>
                                    {item.item.name}
                                </h2>
                                <h3>
                                    {item.item.detail}
                                </h3>
                                <p>
                                    Rp. {item.item.price},-
                                </p>
                                <p>
                                    Amount ({item.amount})
                                </p>
                                <img alt="" src={item.item.image}></img>
                                <p>Total = {item.item.price * item.amount}</p>
                            </li>
                        })
                    }
                </ul>
                <h2>Total All Items = {this.state.total}</h2>
            </div>
        );
    }
}

export default Cart;
