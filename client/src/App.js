import React, { Component } from "react";
import Humps from "./contracts/Humps.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { hump: {}, web3: null, accounts: null, humpContract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Humps.networks[networkId];
      const humpContract = new web3.eth.Contract(
        Humps.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, humpContract }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, humpContract } = this.state;

    await humpContract.methods.mintNft(
      '0xA5F48e9090e3Afa421F09033c13f7D0dEb49b86C',
      'abc',
      '0xA5F48e9090e3Afa421F09033c13f7D0dEb49b86C',
      '0xA5F48e9090e3Afa421F09033c13f7D0dEb49b86C'
    ).send({ from: accounts[0] });

    console.log('awaited');

    // const bottle = await humpContract.methods.bottles(0).call();
    // this.setState({bottle});
    // console.log('Bottle', bottle);
  };

  render() {
    console.log("TEST0");
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
      </div>
    );
  }
}

export default App;
