// to run npm run start the ethers version must be under 6.0

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Lock from "./artifacts/contracts/Lock.sol/Lock.json";
import "./App.css";

const lockAddress = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [unlockTime, setUnlockTime] = useState(0);
  const [ownerName, setOwnerName] = useState("");

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    try {
      // Check if Ethereum is enabled
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        const signer = provider.getSigner();
        const contract = new ethers.Contract(lockAddress, Lock.abi, signer);
        setContract(contract);

        const accounts = await provider.listAccounts();
        setAccount(accounts[0]);

        const unlockTime = await contract.unlockTime();
        setUnlockTime(unlockTime.toNumber());

        const ownerName = await contract.ownerName();
        setOwnerName(ownerName);
      } else {
        console.error("Please install MetaMask to use this application.");
      }
    } catch (error) {
      console.error("Error initializing application:", error);
    }
  }

  async function setNewUnlockTime() {
    try {
      const newUnlockTime = Math.floor(Date.now() / 1000) + 24 * 60 * 60;

      const tx = await contract.setNewUnlockTime(newUnlockTime);
      await tx.wait();

      const unlockTime = await contract.unlockTime();
      setUnlockTime(unlockTime.toNumber());
    } catch (error) {
      console.error("Error setting new unlock time:", error);
    }
  }

  async function withdraw() {
    try {
      const tx = await contract.withdraw();
      await tx.wait();

      const unlockTime = await contract.unlockTime();
      setUnlockTime(unlockTime.toNumber());
    } catch (error) {
      console.error("Error withdrawing funds:", error);
    }
  }

  if (!contract) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page">
      <div className="content">
        <h1>Smart Bond</h1>
        <p>Unlock Time: {unlockTime}</p>
        <p>Account: {account}</p>
        <h2>Owner Name: {ownerName}</h2>
        <button onClick={setNewUnlockTime}>Set New Unlock Time</button>
        <button onClick={withdraw}>Withdraw</button>
      </div>
    </div>
  );
}

export default App;
