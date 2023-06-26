// to run npm run start the ethers version must be under 6.0 because else the import wont find it | npm i ethers@5.6.1

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Lock from "./artifacts/contracts/Lock.sol/Lock.json";
import "./App.css";

const lockAddress = "0x0165878a594ca255338adfa4d48449f69242eb8f";

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [maturityDate, setMaturityDate] = useState(0);
  const [ownerName, setOwnerName] = useState("");
  const [issuerName, setIssuerName] = useState("");
  const [faceValue, setfaceValue] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("");
  const [interestRate, setInterestRate] = useState("");

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

        const issuerName = await contract.issuerName();
        setIssuerName(issuerName);

        const faceValue = await contract.faceValue();
        setfaceValue(faceValue.toString());

        const paymentFrequency = await contract.paymentFrequency();
        setPaymentFrequency(paymentFrequency);

        const interestRate = await contract.interestRate();
        setInterestRate(interestRate.toString());
      } else {
        console.error("Please install MetaMask to use this application.");
      }
    } catch (error) {
      console.error("Error initializing application:", error);
    }
  }

  async function setNewUnlockTime() {
    try {
      const tx = await contract.withdraw({});
      await tx.wait();
    } catch (error) {
      console.error("Error setting new unlock time:", error);
    }
  }

  async function withdraw() {
    try {
      const tx = await contract.withdraw({ lockAddress });
      await tx.wait();
      console.log("Withdrawal successful");
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
        <p className="interestRate"> Interest Rate: {interestRate}%</p>
        <p className="paymentFrequency">
          Payment Frequency: {paymentFrequency}
        </p>
        <div className="container">
          <div className="issuer">
            <h2>Issuer</h2>
            <h3>Name: {issuerName}</h3>
            <p>Address: </p>
          </div>

          <div className="bondholder">
            <h2>Bondholder</h2>
            <h3>Name: {ownerName}</h3>
            <p>Address: {account}</p>
          </div>
        </div>
        <div className="buttons">
          <button className="button-payInterestRate" onClick={setNewUnlockTime}>
            {/*until now the SmartBond is only with one party member so the bondholder can pay the interestRate himself*/}
            Pay Interest Rate
          </button>
          <button className="button-withdraw" onClick={withdraw}>
            Withdraw full nominal amount
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
