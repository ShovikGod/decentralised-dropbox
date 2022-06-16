import FStorage from '../abis/FStorage.json'
import React, { Component } from 'react';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';

// USING A FREE INFURA CLIENT
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected.');
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    //console.log(web3);
    
    // LOAD ACCOUNT
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    this.setState({ account: accounts[0] });
    
    // NETWORK ID
    const networkId = await web3.eth.net.getId();
    const networkData = FStorage.networks[networkId];

    //IF CONNECTED
    if(networkData){
      // ASSIGN CONTRACT
      const fstorage = new web3.eth.Contract(FStorage.abi, networkData.address);
      this.setState({ fstorage });
      
      // GET #FILES
      const filesCount = await fstorage.methods.fileCount().call()
      this.setState({ filesCount });

      // LOAD & SORT BY NEWEST
      for(var i=filesCount; i>=1; i--){
        const file =await fstorage.methods.files(i).call();
        this.setState({
          files: [...this.state.files, file]
        });
      }
    }
    else{
      window.alert('FStorage contract not deployed to detected network.')
      console.log('FStorage contract not deployed to detected network.')
    }
  }

  // GET FILE FROM USER
  captureFile = e => {
    e.preventDefault();
    
    // GET FILE
    const file = e.target.files[0];
    const reader = new window.FileReader();

    // CONVERT TO BUFFER
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name
      })
      console.log('buffer', this.state.buffer);
    }
  }


  // UPLOADING
  uploadFile = desc => {
    console.log("Submitting file to IPFS...")

    // ADD FILE TO IPFS
    ipfs.add(this.state.buffer, (e, res) => {
      console.log('IPFS result', res);
      
      // ERROR
      if(e){
        console.log(e);
        return;
      }

      // LOADING WHILE UPLOADING
      this.setState({ loading: true });

      // DEFAULT VALUE FOR EXTENSION
      if(this.state.type === ''){
        this.setState({type: 'none'});
      }

      console.log(res[0].hash, res[0].size, this.state.type, this.state.name, desc);
      // CALL SMART CONTRACT TO UPLOAD FILE
      this.state.fstorage.methods.uploadFile(
        res[0].hash,
        res[0].size,
        this.state.type,
        this.state.name,
        desc
      ).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({
          loading: false,
          type: null,
          name: null
        })
        window.location.reload();
      }).on('error', (e) => {
        window.alert('Error');
        this.setState({ loading: false });
      });
    });
  }

  // SET STATES
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      fstorage: null,
      files: [],
      loading: false,
      type: null,
      name: null
    };

    //Bind functions
    this.uploadFile = this.uploadFile.bind(this)
    this.captureFile = this.captureFile.bind(this)
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              files={this.state.files}
              captureFile={this.captureFile}
              uploadFile={this.uploadFile}
            />
        }
      </div>
    );
  }
}

export default App;