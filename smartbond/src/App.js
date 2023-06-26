// to run npm run start the ethers version must be under 6.0

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Lock from "./artifacts/contracts/Lock.sol/Lock.json";
import "./App.css";

const lockAddress = "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c";

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [maturityDate, setMaturityDate] = useState(0);
  const [ownerName, setOwnerName] = useState("");
  const [faceValue, setfaceValue] = useState(0);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getDate()}.${
      today.getMonth() + 1
    }.${today.getFullYear()}`;
    setCurrentDate(formattedDate);
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

        const maturityDate = await contract.maturityDate();
        setMaturityDate(maturityDate.toNumber());

        const ownerName = await contract.ownerName();
        setOwnerName(ownerName);

        const faceValue = await contract.faceValue();
        setfaceValue(faceValue.toString());
      } else {
        console.error("Please install MetaMask to use this application.");
      }
    } catch (error) {
      console.error("Error initializing application:", error);
    }
  }

  async function setNewUnlockTime() {
    try {
      const newUnlockTime = Math.floor(Date.now() / 1000) + 60;

      const tx = await contract.setNewUnlockTime(newUnlockTime);
      await tx.wait();

      const maturityDate = await contract.maturityDate();
      setMaturityDate(maturityDate.toNumber());
    } catch (error) {
      console.error("Error setting new unlock time:", error);
    }
  }

  async function withdraw() {
    try {
      const tx = await contract.withdraw();
      await tx.wait();

      const maturityDate = await contract.maturityDate();
      setMaturityDate(maturityDate.toNumber());
    } catch (error) {
      console.error("Error withdrawing funds:", error);
    }
  }

  if (!contract) {
    return <div>Loading...</div>;
  }

  function fomartMaturityDate() {
    const date = new Date(maturityDate * 1000);
    return date.toLocaleDateString();
  }

  return (
    <div
      className="frame"
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/7599590/pexels-photo-7599590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
      }}
    >
      <p className="date">Contract conclusion: {currentDate}</p>
      <div className="content">
        <h1 className="headline">Smart Bond</h1>
        <p className="faceValue">Nominal amount: {faceValue} ETH</p>
        <p className="duration">Duration: {fomartMaturityDate()}</p>
        <div className="container">
          <div className="issuer">Flex Column 1</div>

          <div className="bondholder">Flex Column 2</div>
        </div>
        <p>Account: {account}</p>
        <h2>Owner Name: {ownerName}</h2>
        <button onClick={setNewUnlockTime}>Set New Unlock Time</button>
        <button onClick={withdraw}>Withdraw</button>
      </div>
    </div>
  );
}

export default App;
