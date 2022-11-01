<section class="vh-100 bg-white">
                <div className="Register" class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                        <div class="card-body p-5 text-center box">

                            <div class="mt-md-4">

                            <h2 class="fw-bold mb-2 text-uppercase">Register</h2>
                            <p class="text-white-50 mb-5">Please enter your username and password!</p>

                            <div class="form-outline form-white mb-4">
                                <input value={this.state.username}
                                    onChange={event => this.setState({ username: event.target.value })} class="form-control form-control-lg" />
                                <label class="form-label">Username</label>
                            </div>

                            <div class="form-outline form-white mb-4">
                                <input type="password" value={this.state.password}
                                    onChange={event => this.setState({ password: event.target.value })} class="form-control form-control-lg" />
                                <label class="form-label">Password</label>
                            </div>

                            <button class="btn btn-outline-light btn-lg px-5" type="submit" onClick={this.onRegister}>Register</button>

                            </div>

                            {
                            this.state.errorMessage !== "" ?
                                <label class="text-danger">{this.state.errorMessage}</label> :
                            null
                            }

                            <div>
                            <p class="mb-0">Already have an account? <button class="btn btn-link p-0 mb-2" onClick={this.redirectLogin}>Login</button>
                            </p>
                            </div>

                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>