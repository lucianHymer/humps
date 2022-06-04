const Humps = artifacts.require("./Humps.sol");

contract("Humps", accounts => {
  it("...should mint", async () => {
    const humpsInstance = await Humps.deployed();

    const id = await debug(
      humpsInstance.mintNft('0xA5F48e9090e3Afa421F09033c13f7D0dEb49b86C', "abc", "0xA5F48e9090e3Afa421F09033c13f7D0dEb49b86C", "0xA5F48e9090e3Afa421F09033c13f7D0dEb49b86C", { from: accounts[0] })
    );

  });
});
