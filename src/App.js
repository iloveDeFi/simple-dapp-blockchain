
import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";

function App() {
  const [greet, setGreet] = useState('');
  const [balance, setBalance] = useState();
  const [depositValue, setDepositValue] = useState('');
  const [greetingValue, setGreetingValue] = useState('');
  

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_unlockTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "when",
        "type": "uint256"
      }
    ],
    "name": "Withdrawal",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unlockTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const contract = new ethers.Contract(contractAddress, ABI, signer);

useEffect(() => {
  const requestAccounts = async () => {
    await provider.send("eth_requestAccounts", []);
  }

  const getBalance = async () => {
    const balance = await provider.getBalance(contractAddress)
    setBalance(ethers.utils.formatEther(balance));
  }

  const getGreeting = async () => {
    const greeting = await contract.greet();
    setGreet(greeting);
  }

  requestAccounts()
    .catch(console.error);
  getBalance()
    .catch(console.error)
  getGreeting()
      .catch(console.error)
}, )

  const handleDepositChange = (e) => { 
    setDepositValue(e.target.value);
  }

  const handleGreetingChange = (e) => { 
    setDepositValue(e.target.value);
  }

  const handleDepositSubmit = async (e) => {
    e.preventDefault();
    console.log(depositValue);
    const ethValue = ethers.utils.parseEther(depositValue)
    const depositEth = await contract.deposit({ value: ethValue })
    await depositEth.wait();
    const balance = await provider.getBalance(contractAddress)
    const balanceFormatted = ethers.utils.formatEther(balance)
    setBalance(balanceFormatted);
    setDepositValue(0);    
  }

  const handleGreetingSubmit = async (e) => {
    e.preventDefault();
    const greetingUpdate = await contract.setGreeting(greetingValue);
    await greetingUpdate.wait();
    setGreet(greetingValue);
    setGreetingValue('');
  }

  return (
    <div className="container">
      <div className="row mt-5">

        <div className="col">
          <h3>Bienvenue</h3>
          <p>Contract Balance: {balance} ETH</p>
        </div>

        <div className="col">
          <div className="mb-3">
            <h4>Deposit ETH</h4>
            <form onSubmit={handleDepositSubmit}>
              <div className="mb-3">
                <input type="number" className="form-control" placeholder="0" onChange={handleDepositChange} value={depositValue} />
              </div>
              <button type="submit" className="btn btn-success">Deposit</button>
            </form>

          <h4 className="mt-3">Change Greeting</h4>
            <form onSubmit={handleGreetingSubmit}>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="" onChange={handleGreetingChange} value={greetingValue} />
              </div>
              <button type="submit" className="btn btn-dark">Change</button>
            </form> 
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;