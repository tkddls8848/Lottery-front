import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

let lotteryAddress = '0x9F6C61D42a51cdEA4B838aAc319F11176Fb167FD';
let lotteryABI = [ { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x8da5cb5b" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor", "signature": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "index", "type": "uint256" }, { "indexed": false, "name": "betPerson", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }, { "indexed": false, "name": "answerBlockNumber", "type": "uint256" }, { "indexed": false, "name": "challenges", "type": "bytes1" } ], "name": "BET", "type": "event", "signature": "0x9a95282c9d1697e2c96ac19443e3e62e2bad3946cd60803ad43ebd9c471d7ba4" }, { "constant": true, "inputs": [], "name": "getValue", "outputs": [ { "name": "value", "type": "uint256" } ], "payable": false, "stateMutability": "pure", "type": "function", "signature": "0x20965255" }, { "constant": true, "inputs": [], "name": "getPot", "outputs": [ { "name": "potValue", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x403c9fa8" }, { "constant": false, "inputs": [ { "name": "challenges", "type": "bytes1" } ], "name": "bet", "outputs": [ { "name": "result", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function", "signature": "0xf4b46f5b" }, { "constant": false, "inputs": [], "name": "distribute", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xe4fc6b6d" }, { "constant": true, "inputs": [ { "name": "challenges", "type": "bytes1" }, { "name": "answer", "type": "bytes32" } ], "name": "isMatch", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "pure", "type": "function", "signature": "0x99a167d7" }, { "constant": true, "inputs": [ { "name": "answerBlockNumber", "type": "uint256" } ], "name": "getBlockStatus", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xa388c0e9" }, { "constant": true, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "getBetInfo", "outputs": [ { "name": "answerBlockNumber", "type": "uint256" }, { "name": "betPerson", "type": "address" }, { "name": "challenges", "type": "bytes1" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x79141f80" }, { "constant": false, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "popBet", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xd04c9a8c" } ];

class App extends Component {

  async componentDidMount(){
    await this.initWeb3();
    console.log(this.web3);
    let account = await this.web3.eth.getAccounts();
    console.log(account);
  }

  initWeb3 = async () => {
    if(window.ethereum){
      console.log('Recent mode');
      this.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.log(`account access fail : ${error}`);        
      }
    } else if(window.web3){
      console.log('legacy mode');
      this.web3 = new Web3(Web3.currentProvider);      
    } else {
      console.log('web3 amount fail');
    }

    let accounts = this.web3.eth.getAccounts();
    this.account = accounts[0];

    this.lotteryContract = new this.web3.eth.Contract(lotteryABI, lotteryAddress);

    let pot = await this.lotteryContract.methods.getPot().call();
    console.log(`pot : ${pot}`);

    let owner = await this.lotteryContract.methods.owner().call();
    console.log(`owner : ${owner}`);

  }

  bet = async () => {
    let nonce = await this.web3.eth.getBlockTransactionCount(this.account);
    this.lotteryContract.methods.betAndDistribute('oxcd', {from:this.account, value:5000000000000000, gas:300000, nonce:nonce})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
