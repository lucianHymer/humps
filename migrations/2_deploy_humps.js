const Humps = artifacts.require("Humps");

module.exports = function (deployer) {
  deployer.deploy(Humps);
};
