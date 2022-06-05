import React, { useState, useEffect } from "react";
import Humps from "./contracts/Humps.json";
import MintForm from "./App/MintForm";
import HumpTree from "./App/HumpTree";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'

import "./App.css";

const CoinbaseWallet = new WalletLinkConnector({
 url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
 appName: "HUMPS",
 supportedChainIds: [1, 3, 4, 5, 42, 80001],
});

function App(){
  const { activate, account, chainId, library } = useWeb3React();
  const [ humpContract, setHumpContract ] = useState(null);
  const [ mintedId, setMintedId ] = useState(null);

  useEffect( () => {
    try {
      if(library){
        console.log('Account', account);

        const web3 = new Web3(library.provider);

        // Get the contract instance.
        const deployedNetwork = Humps.networks[chainId];
        setHumpContract(new web3.eth.Contract(
          Humps.abi,
          deployedNetwork && deployedNetwork.address,
        ));
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
    console.error(error);
    }
  }, [account, chainId, library]);

  return (
    <div className="App">
      <h1>HUMPS</h1>
      <p>Mint your HUMPS token here.</p>
      <br />
      {
        account ?
          <div>
          <MintForm
          accounts={[account]}
          humpContract={humpContract}
          mintedCallback={setMintedId}
          />
          <br />
          <HumpTree account={account} id={mintedId} />
        </div>
        :
        <button onClick={() => activate(CoinbaseWallet) }>Connect Coinbase Wallet</button>
      }
    </div>
  );
}

export default App;
