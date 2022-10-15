import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <form class="form-inline my-2 my-lg-0 input-group m-2">
                            <button class="btn btn-primary my-2 my-sm-0 form-control" onClick={this.return}>Return to Homepage</button>
                            </form>
                        </div>
                    </nav>
                <h1>Your Cart</h1>
                <div class="row row-cols-1 row-cols-md-3 g-4">
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
                    </div>
                <h2>Total All Items = Rp. {this.state.total},-</h2>
            </div>
        );
    }
}

export default Cart;
