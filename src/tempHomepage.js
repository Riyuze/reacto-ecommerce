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