import React, { Component } from 'react'


class RenderProductOwnerInfo extends Component {

	

	renderOwnerList = (owners) => {
		return owners.map((owner, i) => {
			return <li key={i}>{owner}</li>
		})
	}


	render() {
		const { product } = this.props

		if (!product || !product.exists) {
			return <div>Invalid Product ID</div>
		}
		
		return (
			<div className="mt-2">
				<h5 className="text-center- mb-3"><i>Product specifications:</i></h5>
				<p> <b>Product ID:</b> { product.id } </p>
				<p> <b>Name:</b> { product.name } </p>
				<p> <b>Model:</b> { product.model } </p>
				<p> <b>Manufacturer:</b> { product.manufacturer } </p>
				<p> <b>Current Owner:</b> { product.curOwner } </p>
				<p>
					<b>Owner List from start till current:</b>
					<ol> {this.renderOwnerList(product.owners)} </ol>
				</p>
			</div>
		);
	}
}



class ProductOwnerList extends Component {

	constructor(props) {
		super(props)
		this.state = { productId: '', product: null, searched: false }
	}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		const { account, contract } = this.props
		const { productId } = this.state
		try {
			const product = await contract.methods.getProduct(productId).call({ from: account })
			console.log(product)
			this.setState({ product : product, searched : true })
		}
		catch (e) {
			console.log(e)
			window.alert("Error occured!")
		}
	}


	render() {
		const { product, productId, searched } = this.state
		return (
			<div id="content" className="mt-4">

				<h5 className="text-center"><i>Search a product</i></h5>

				<form className="my-3" onSubmit={this.handleSubmit}>
					<div className="form-group">
						<input type="text" className="form-control" placeholder="Enter product ID"
							name="productId"
							value={productId} onChange={this.handleChange}
						/>
					</div>
					<button type="submit" className="btn btn-primary btn-block">Search</button>
				</form>

				{/* only display product info if search has been performed at least once */}
				{ searched && <RenderProductOwnerInfo product = {product} /> }

			</div>
		);
	}
}

export default ProductOwnerList;