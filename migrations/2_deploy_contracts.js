const lemonade = artifacts.require("./lemonadeStand.sol");

module.exports = function (deployer) {
	deployer.deploy(lemonade);
}

