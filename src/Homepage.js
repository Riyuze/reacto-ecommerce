import axios from 'axios';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Cart from './Cart';

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
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <button class="btn btn-outline-warning my-2 my-sm-0 m-2" onClick={this.logout}>Logout</button>
                            <button class="btn btn-outline-success my-2 my-sm-0" onClick={this.cart}>Cart</button>
                            <form class="form-inline my-2 my-lg-0 input-group m-2">
                            <input class="form-control mr-sm-2" placeholder="Search" value={this.state.item} onChange={e => this.setState({ item: e.target.value, items_filtered: [] })} />
                            <button type="button" class="btn btn-outline-primary my-2 my-sm-0" onClick={this.findItems}>Search</button>
                            </form>
                        </div>
                    </nav>
                    <h1 class="text-white">Items List</h1>
                        <div class="row row-cols-1 row-cols-md-3 g-4">
                            {
                                this.state.item === "" ?
                                    this.state.items.map((item) => {
                                        return <div class="card">
                                            <img src={item.image} class="card-img-top rounded mx-auto d-block" alt="" style={{ maxWidth: "400px", height: "250px"}}></img>
                                            <div class="card-body">
                                                <h5 class="card-title">{item.name}</h5>
                                                <p class="card-text">{item.detail}</p>
                                                <p class="card-text">Rp. {item.price},-</p>
                                                <button class="btn btn-primary" onClick={() => {
                                                    this.addToCart(item, 1)
                                                }}>Add to Cart</button>
                                            </div>
                                        </div>
                                    }) :
                                    this.state.items_filtered.map((item) => {
                                        return <div class="card rounded mx-auto d-block">
                                        <img src={item.image} class="card-img-top rounded mx-auto d-block" alt="" style={{ maxWidth: "400px", height: "250px" }}></img>
                                        <div class="card-body">
                                            <h5 class="card-title">{item.name}</h5>
                                            <p class="card-text">{item.detail}</p>
                                            <p class="card-text">Rp. {item.price},-</p>
                                            <button class="btn btn-primary" onClick={() => {
                                                this.addToCart(item, 1)
                                            }}>Add to Cart</button>
                                        </div>
                                    </div>
                                    })
                            }
                    </div>
                </div>
        );
    }
}

export default Homepage;
