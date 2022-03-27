import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import getWeb3 from "./Utils/getWeb3";
import "./Stylesheets/App.css";
import MyApp from "./contracts/MyApp.json";
import NavBar from "./Components/NavBar";
import OwnerDiv from "./Components/OwnerDiv";
import ManufacturerDiv from "./Components/ManufacturerDiv";
import ProductOwnerList from "./Components/ProductOwnerList";
import SellProductDiv from "./Components/SellProductDiv";
import GenerateQRDiv from "./Components/GenerateQRDiv"

class App extends Component {
	
	state = { storageValue: 0, web3: null, account: null, contract: null };

	componentDidMount = async () => {
		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();
			// Use web3 to get the user's accounts.
			const [account] = await web3.eth.getAccounts();
			// Get the contract instance.
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = MyApp.networks[networkId];
			if (!deployedNetwork) {
				window.alert('OOPS...');
				return;
			}
			const instance = new web3.eth.Contract( MyApp.abi, deployedNetwork.address,);
			
			this.setState({ web3, account, contract: instance });
		}
		catch (error) {
			// Catch any errors for any of the above operations.
			alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
			console.error(error);
		}
	};



	render() {
		if (!this.state.web3) {
			return <div>Loading...</div>;
		}

		const { account, contract } = this.state

		return (
			<React.Fragment>
				<NavBar account = {account} />
				
				<div className="container pt-5-">
					<div className="row justify-content-center">
						<div className="col-md-8">

							<Switch>

								<Route path = "/admin"
									render = {(props) => <OwnerDiv account = {account} contract = {contract} />}
								/>

								<Route path = "/manufacturer"
									render = {(props) => <ManufacturerDiv account = {account} contract = {contract} />}
								/>

								<Route path = "/sell"
									render = {(props) => <SellProductDiv account = {account} contract = {contract} />}
								/>

								<Route path = "/qr"
									render = {(props) => <GenerateQRDiv/>}
								/>

								<Route path = "/"
									render = {(props) => <ProductOwnerList account = {account} contract = {contract} />}
								/>
							
							</Switch>

						</div>
					</div>
				</div>

			</React.Fragment>
		);
	}
}

export default App;
