import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

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
