import React, { Component } from 'react'
import QRCode from "react-qr-code";

class GenerateQRDiv extends Component {

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
			<div id="content" className="mt-4">
				
				<h5 className="text-center"><i>Generate and Save a QR code</i></h5>

				<form className="my-3" onSubmit={this.handleSubmit}>
					<div className="form-group">
						<input type="text" className="form-control" placeholder="Enter an address"
							name="text" 
							
							value={this.state.text} onChange={this.handleChange}
						/>
						
					</div>
					<button type="button">Save</button>
				</form>

				<QRCode value={this.state.text}/>
				
			</div>
		);
	}
}

export default GenerateQRDiv;