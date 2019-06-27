import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

let lotteryAddress = '0x5b1869D9A4C187F2EAa108f3062412ecf0526b24';
let lotteryABI = [ { "constant": true, "inputs": [], "name": "answerForTest", "outputs": [ { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x84f7e4f0" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x8da5cb5b" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor", "signature": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "index", "type": "uint256" }, { "indexed": false, "name": "betPerson", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }, { "indexed": false, "name": "challenges", "type": "bytes1" }, { "indexed": false, "name": "answerBlockNumber", "type": "uint256" } ], "name": "BET", "type": "event", "signature": "0x100791de9f40bf2d56ffa6dc5597d2fd0b2703ea70bc7548cd74c04f5d215ab7" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "index", "type": "uint256" }, { "indexed": false, "name": "betPerson", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }, { "indexed": false, "name": "challenges", "type": "bytes1" }, { "indexed": false, "name": "answer", "type": "bytes1" }, { "indexed": false, "name": "answerBlockNumber", "type": "uint256" } ], "name": "WIN", "type": "event", "signature": "0x8219079e2d6c1192fb0ff7f78e6faaf5528ad6687e69749205d87bd4b156912b" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "index", "type": "uint256" }, { "indexed": false, "name": "betPerson", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }, { "indexed": false, "name": "challenges", "type": "bytes1" }, { "indexed": false, "name": "answer", "type": "bytes1" }, { "indexed": false, "name": "answerBlockNumber", "type": "uint256" } ], "name": "LOSE", "type": "event", "signature": "0x857de42f5f3a8f5de6cedde05ecd2843e3d33c293b4a75322a56e345f8bc75b4" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "index", "type": "uint256" }, { "indexed": false, "name": "betPerson", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }, { "indexed": false, "name": "challenges", "type": "bytes1" }, { "indexed": false, "name": "answer", "type": "bytes1" }, { "indexed": false, "name": "answerBlockNumber", "type": "uint256" } ], "name": "DRAW", "type": "event", "signature": "0x72ec2e949e4fad9380f9d5db3e2ed0e71cf22c51d8d66424508bdc761a3f4b0e" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "index", "type": "uint256" }, { "indexed": false, "name": "betPerson", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }, { "indexed": false, "name": "challenges", "type": "bytes1" }, { "indexed": false, "name": "answerBlockNumber", "type": "uint256" } ], "name": "REFUND", "type": "event", "signature": "0x59c0185881271a0f53d43e6ab9310091408f9e0ff9ae2512613de800f26b8de4" }, { "constant": true, "inputs": [], "name": "getPot", "outputs": [ { "name": "value", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x403c9fa8" }, { "constant": false, "inputs": [ { "name": "challenges", "type": "bytes1" } ], "name": "bet", "outputs": [ { "name": "result", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function", "signature": "0xf4b46f5b" }, { "constant": false, "inputs": [], "name": "distribute", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xe4fc6b6d" }, { "constant": false, "inputs": [ { "name": "setAnswer", "type": "bytes32" } ], "name": "setAnswerForTest", "outputs": [ { "name": "result", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x7009fa36" }, { "constant": false, "inputs": [ { "name": "challenges", "type": "bytes1" } ], "name": "betAndDistribute", "outputs": [ { "name": "result", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function", "signature": "0xe16ea857" }, { "constant": true, "inputs": [ { "name": "challenges", "type": "bytes1" }, { "name": "answer", "type": "bytes32" } ], "name": "isMatch", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "pure", "type": "function", "signature": "0x99a167d7" }, { "constant": true, "inputs": [ { "name": "answerBlockNumber", "type": "uint256" } ], "name": "getBlockStatus", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xa388c0e9" }, { "constant": true, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "getBetInfo", "outputs": [ { "name": "answerBlockNumber", "type": "uint256" }, { "name": "betPerson", "type": "address" }, { "name": "challenges", "type": "bytes1" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x79141f80" }, { "constant": false, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "popBet", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xd04c9a8c" } ];

class App extends Component {

constructor (props) {
  super(props);

  this.state = {
    betRecodes : [],
    winRecodes : [],
    loseRecodes : [],  
    potMoney : '0',
    challenges : ['A', 'B'],
    ResultRecode : [{
      betAddress : '',
      index : '0',
      challenges : '',
      answer : '',
      answerBlockNumber : '',
      pot : ''
    }]  
  }
}

  async componentDidMount(){
    await this.initWeb3();
    console.log(this.web3);
    let account = await this.web3.eth.getAccounts();
    console.log(account);
    await this.getBetEvent();
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

    // let pot = await this.lotteryContract.methods.getPot().call();
    // console.log(`pot : ${pot}`);

    // let owner = await this.lotteryContract.methods.owner().call();
    // console.log(`owner : ${owner}`);

    //this.lotteryContract.methods.betAndDistribute('0xcd').send({from:this.account, value:5000000000000000, gas:300000});

  }

  bet = async () => {
    let nonce = await this.web3.eth.getBlockTransactionCount(this.account);
    this.lotteryContract.methods.betAndDistribute('oxcd', {from:this.account, value:5000000000000000, gas:300000, nonce:nonce})
  }

  getBetEvent = async () => {
    let events = await this.lotteryContract.getPastEvents('BET', {fromBlock:0, toBlock:'latest'});
    console.log(events);
  }

  getCard = (character, style) => {
    return(
      <button className={style}>
        <div className="card-body text-center">Primary card</div>
        <p className='card-text'></p>
        <p className='card-text' style={{textalign:'center', fontSize:100}}>{character}</p>
        <p className='card-text'></p>
      </button>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="jumbotron">
            <h1>Lottery</h1>
            challenges : {this.state.challenges[0]} {this.state.challenges[1]}
            <h3>Pot Money : {this.state.potMoney}</h3>
          </div>
        </div>
        <div className='container'>
          <div className='card-group'>
            {this.getCard('0', 'card bg-primary')}
            {this.getCard('1', 'card bg-info')}
            {this.getCard('2', 'card bg-danger')}
            {this.getCard('3', 'card bg-warning')}
          </div>
          <div className='card-group'>
            {this.getCard('4', 'card bg-primary')}
            {this.getCard('5', 'card bg-info')}
            {this.getCard('6', 'card bg-danger')}
            {this.getCard('7', 'card bg-warning')}
          </div>
          <div className='card-group'>
            {this.getCard('8', 'card bg-primary')}
            {this.getCard('9', 'card bg-info')}
            {this.getCard('A', 'card bg-danger')}
            {this.getCard('B', 'card bg-warning')}
          </div>
          <div className='card-group'>
            {this.getCard('C', 'card bg-primary')}
            {this.getCard('D', 'card bg-info')}
            {this.getCard('E', 'card bg-danger')}
            {this.getCard('F', 'card bg-warning')}
          </div>
        </div>
        <br></br>
        <div className='container'>
          <button className='btn btn-danger btn-lg'>BET</button>
        </div>
        <br></br>
        <div className='container'>
          <table className='table table-dark table-striped'>
            <thead>
              <tr>
                <td>Index</td>
                <td>Address</td>
                <td>Challenges</td>
                <td>Answer</td>
                <td>AnswerBlockNumber</td>
                <td>Status</td>
                <td>PotMoney</td>
              </tr>
            </thead>
            <tbody>
                {this.state.ResultRecode.map((index,recode) => {
                  return (
                    <tr key={index}>
                      <td>Index</td>
                      <td>Address</td>
                      <td>Challenges</td>
                      <td>Answer</td>
                      <td>AnswerBlockNumber</td>
                      <td>Status</td>
                      <td>PotMoney</td>
                    </tr>
                  )
                })}           
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
