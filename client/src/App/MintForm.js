import React, { Component } from "react";

class MintForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dna: '',
      mother: '',
      father: '',
    };
  }

  handleInputChange = async (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
     
    const {
      dna,
      mother,
      father,
    } = this.state;

    const {
      humpContract,
      accounts,
    } = this.props;

    await humpContract.methods.mintNft(
      accounts[0],
      dna,
      mother,
      father
    ).send({ from: accounts[0] });

    console.log('Minted');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          DNA Fingerprint
          <input
            name="dna"
            type="text"
            value={this.state.dna}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Mother Token ID
          <input
            name="mother"
            type="text"
            value={this.state.mother}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Father Token ID
          <input
            name="father"
            type="text"
            value={this.state.father}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <input type="submit" value="Mint!" />
      </form>
    );
  }
}

export default MintForm;
