import React, { Component } from "react";
import Humps from "./contracts/Humps.json";
import getWeb3 from "./getWeb3";
import MintForm from "./App/MintForm";

import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, humpContract: null };

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
      this.setState({ web3, accounts, humpContract }); //, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
    console.error(error);
    }
  };

  render() {
    console.log("TEST0");
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>HUMPS</h1>
        <p>Mint your HUMPS token here.</p>
        <MintForm
          accounts={this.state.accounts}
          humpContract={this.state.humpContract}
        />
      </div>
    );
  }
}

export default App;
