
pragma solidity >=0.8.0 <0.9.0;

contract MyApp {

	/*
		holds the address of the owner of the contract
		owner -> the address which deploys this smart contract on the network.
	*/
	address public owner;
	/*
		productId is used to provide a unique ID to every product that is added.
		It increments every time a new product is created.
	*/
	uint productId = 0;


	struct Manufacturer {
		bool exists;
		string name;
		address _address;
	}

	struct Product {
		bool exists;
		uint id;
		string name;
		string model;
		address manufacturer;
		address curOwner;
		address[] owners;
	}

	

	


	
	constructor() {
		owner = msg.sender;
	}


	
	function createManufacturer(string memory _name, address _address) public {
		require(msg.sender == owner, "Only owner is authorised to create a manufacturer!");

		Manufacturer storage m = manufacturers[_address];
		m.exists = true;
		m.name = _name;
		m._address = _address;
		emit ManufacturerCreated(_name, _address);
	}


	function createProduct(string memory _name, string memory _model) public {
		require(manufacturers[msg.sender].exists == true, "You are not a Manufacturer!");

		Product storage p = products[productId];
		p.exists = true;
		p.id = productId;
		p.name = _name;
		p.model = _model;
		p.manufacturer = msg.sender;
		p.curOwner = msg.sender;
		// push cur owner(manufacturer) to owners array
		p.owners.push(msg.sender);

		productId++;
		emit ProductCreated(productId-1, msg.sender);
	}


	
	function getProduct(uint _id) public view returns(Product memory) {
		return products[_id];
	}


	function updateOwnership(uint _id, address _newOwner) public {
		Product storage p = products[_id];
		require(p.curOwner == msg.sender, "Not authorized");
		
		p.curOwner = _newOwner;
		p.owners.push(_newOwner);

		emit OwnershipUpdated(_id, _newOwner);
	}

}
