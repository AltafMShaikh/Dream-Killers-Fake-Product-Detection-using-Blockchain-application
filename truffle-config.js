module.exports = {
	networks: {
		development: {
			host: "127.0.0.1",
			port: 7544,
			network_id: "*" // Match any network id
		}
	},
	contracts_directory: './contracts/',
  contracts_build_directory: './client/src/contracts',
	solc: {
		optimizer: {
			enabled: true,
			runs: 200
		}
	},
	compilers: {
		solc: {
			version: "0.8.4"
		}
	}
}