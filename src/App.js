// App.js
import React, { useState } from 'react';
import {
  SignProtocolClient,
  SpMode,
  OffChainSignType,
} from "@ethsign/sp-sdk";
// import { privateKeyToAccount } from "viem/accounts";
import './App.css';
import { useAccount, useEnsName, useEnsAvatar } from "wagmi";

function App() {
  const [formData, setFormData] = useState({
    postData: '',
    commentData: '',
    userData: '',
    systemInstructions: ''
  });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  // Initialize the client
  // const privateKey = "0x6dee0dffede90e957c9f1b5224322addf6d06de90c75d16e039bdd8d62cc7e50";
  const client = new SignProtocolClient(SpMode.OffChain, {
    signType: OffChainSignType.EvmEip712
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const Name = () => {
    const { data: ensName } = useEnsAddress({
        address: "luc.eth", // The name to lookup
        chainId: 1, // The chainId to lookup on
    });

    return <div>{ensName || address}</div>;
};
  const createAttestation = async (contractDetails, signer) => {
    try {
      // Create attestation with form data
      const res = await client.createAttestation({
        schemaId: "0x44d",
        data: {
          "name": "Aditya"
        },
        recipients: ["0x09B7b2b2a7C398a3Be0700213ba2B9b247aF68Df"],
        indexingValue: "4",
      });
      console.log(res.attestationId, res);
      setStatus('Attestation created successfully!');
      return true;
    } catch (err) {
      setError('Failed to create attestation: ' + err.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Create Attestation</h1>
        
        <form className="form">
          <div className="form-group">
            <label>Post Data</label>
            <input
              type="text"
              name="postData"
              value={formData.postData}
              onChange={handleInputChange}
              placeholder="Enter post data"
            />
          </div>

          <div className="form-group">
            <label>Comment Data</label>
            <input
              type="text"
              name="commentData"
              value={formData.commentData}
              onChange={handleInputChange}
              placeholder="Enter comment data"
            />
          </div>

          <div className="form-group">
            <label>User Data</label>
            <input
              type="text"
              name="userData"
              value={formData.userData}
              onChange={handleInputChange}
              placeholder="Enter user data"
            />
          </div>

          <div className="form-group">
            <label>System Instructions</label>
            <input
              type="text"
              name="systemInstructions"
              value={formData.systemInstructions}
              onChange={handleInputChange}
              placeholder="Enter system instructions"
            />
          </div>

          <button 
            type="button"
            onClick={createAttestation}
            className="submit-button"
          >
            Create Attestation
          </button>
        </form>

        {status && <div className="status-message">{status}</div>}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}

export default App;