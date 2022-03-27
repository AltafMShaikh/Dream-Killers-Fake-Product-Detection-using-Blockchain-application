import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavBar extends Component {

	constructor(props) {
		super(props)
		this.state = { text: '' }
	}


	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}


	render() {
		return (
      <React.Fragment>

        <div className="container py-4">
          <h1 className="text-center"><i>Dream Killers</i></h1>
          <h6 className="text-center"><i>MY ADDRESS:0xa0D5415c58e6c1690f365C63e3970e6c0f11964F </i></h6>
        </div>

        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active-" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active-" to="admin">Admin</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active-" to="manufacturer">Manufacturer</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active-" to="sell">Sell Product</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active-" to="qr">QR Code</Link>
              </li>
            </ul>
          </div>

        </nav>

      </React.Fragment>
		);
	}
}

export default NavBar;