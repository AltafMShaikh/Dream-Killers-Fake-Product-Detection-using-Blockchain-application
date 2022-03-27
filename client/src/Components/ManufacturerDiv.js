import React, { Component } from 'react'

class ManufacturerDiv extends Component {

	constructor(props) {
		super(props)
		this.state = { name: "", model: "" }
	}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleCreateProduct = async (e) => {
		e.preventDefault()
		const { account, contract } = this.props
		const { name, model } = this.state
		try {
			await contract.methods.createProduct(name, model).send({ from: account })
			window.alert(`Created a product\n${name}\n${model}`)
		}
		catch (e) {
			window.alert("Error occured!")
			console.log(e)
		}
	}
	

	render() {
		return (
			<div id="content" className="mt-4">

				<h5 className="text-center"><i>Add a product</i></h5>
				
				<form className="my-3" onSubmit={this.handleCreateProduct}>

					<div className="form-group">
						<input type="text" className="form-control" placeholder="Enter Product Name"
							name="name"
							value={this.state.name} onChange={this.handleChange}
						/>
					</div>

					<div className="form-group">
						<input type="text" className="form-control" placeholder="Enter model Name"
							name="model"
							value={this.state.model} onChange={this.handleChange}
						/>
					</div>
					<div className="form-group">
						<input type="number" className="form-control" placeholder="Enter Price"
							name="price"
							value={this.state.price} onChange={this.handleChange}
						/>
					</div>
					
					<button type="submit" className="btn btn-primary btn-block">Add</button>
					
				</form>
				

			
				
			</div>
		);
	}
}

export default ManufacturerDiv;