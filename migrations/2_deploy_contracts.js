const FS = artifacts.require("FStorage");

module.exports = function(deployer) {
	//Deploy Contract
	deployer.deploy(FS);
};
