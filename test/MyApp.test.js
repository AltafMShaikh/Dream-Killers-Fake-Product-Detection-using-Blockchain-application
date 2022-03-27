const { assert } = require('chai');
let MyApp = artifacts.require('./MyApp.sol')
require('chai')
	.use(require('chai-as-promised'))
	.should();


contract('MyApp', (accounts) => {

	let app
	const [owner, manufacturer, customer, customer2] = accounts
	
	before(async () => {
		app = await MyApp.deployed()
	})


	it('deploys successfully', async () => {
		let address = await app.address
		// verigy contract address
		assert.notEqual(address, 0x0)
		assert.notEqual(address, '')
		assert.notEqual(address, null)
		assert.notEqual(address, undefined)

		// verify owner address is same
		let ownerAddress = await app.owner()
		assert.equal(ownerAddress.toLowerCase(), owner.toLowerCase())
	})


	it('Owner creates a new manufacturer', async () => {
		// create a manufacturer
		let result = await app.createManufacturer("Manufacturer #0", manufacturer, {from: owner})
		// fetch it again to check if created successfully
		result = await app.manufacturers(manufacturer)
		assert.equal(result.exists, true);
		assert.equal(result.name, "Manufacturer #0");
		assert.equal(result._address.toLowerCase(), manufacturer.toLowerCase());
	})


	it('Manufacturer creates a new product (#0)', async () => {
		// create a product
		await app.createProduct("Prod #0", "Model #0", {from: manufacturer});

		// fetch the products, and its owners
		const p = await app.getProduct(0)

		// verify if the fetched product is same as the created one
		assert.equal(p.exists, true);
		assert.equal(p.name, "Prod #0");
		assert.equal(p.model, "Model #0");
		assert.equal(p.manufacturer.toLowerCase(), manufacturer.toLowerCase());
		assert.equal(p.curOwner.toLowerCase(), manufacturer.toLowerCase());
		// verify product owners
		assert.equal(p.owners[0].toLowerCase(), manufacturer.toLowerCase());
	})


	it('Manufacturer sells Product #0 to customer', async () => {
		// apply update
		await app.updateOwnership(0, customer, { from: manufacturer });
		const p0 = await app.getProduct(0); // fetch updated prod #0
		
		assert.equal(p0.curOwner.toLowerCase(), customer.toLowerCase());
		assert.equal(p0.owners[0].toLowerCase(), manufacturer.toLowerCase());
		assert.equal(p0.owners[1].toLowerCase(), customer.toLowerCase());
	})


	it('Customer #0 sells Product #0 to customer #1', async () => {
		// apply update
		await app.updateOwnership(0, customer2, { from: customer });
		const p0 = await app.getProduct(0); // fetch updated prod #0
		
		assert.equal(p0.curOwner.toLowerCase(), customer2.toLowerCase());
		assert.equal(p0.owners[0].toLowerCase(), manufacturer.toLowerCase());
		assert.equal(p0.owners[1].toLowerCase(), customer.toLowerCase());
		assert.equal(p0.owners[2].toLowerCase(), customer2.toLowerCase());
	})

})
