const MyApp = artifacts.require("./MyApp.sol");

module.exports = function(deployer) {
	deployer.deploy(MyApp);
};
