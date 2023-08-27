import React, {useState} from "react";
import server from "./server";
import  * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

const YOUR_PRIVATE_KEY = "YOUR_PRIVATE_KEY_HEX";

function Wallet({ address, setAddress, balance, setBalance}) {
  const [privateKey, setPrivateKey] = useState(YOUR_PRIVATE_KEY);

  // Create a message for signing
  async function signMessage(msg) {
    const messageHash = hashMessage(msg);
    const privateKeyBuffer = Buffer.from(privateKey, "hex");

    try {
      const signature = secp.sign(messageHash, privateKeyBuffer);
      return signature;
    }catch (error) {
      console.error("Error signing the message:", error);
      return null;
    }
  }
  
  async function recoveryKey(message, sigature, recoveryBit){
    const messageHash = hashMessage(message);

    try{
      const publicKey = await secp.recoveryPublicKey(messageHash, signature, recoveryBit)
    return publicKey;
    } catch (error){
      console.error("Error recovering public key", error);
      return null;
    }
  }
  
  async function onChange(evt) {
    const  newPrivateKey  = evt.target.value;
    setPrivateKey(newPrivateKey);

    const publicKey = secp.getPublicKey(Buffer.from(newPrivateKey, "hex"));
    const newAddress = toHex(publicKey);
    setAddress(newAddress);

    if (newAddress) {
      try {
        const response = await server.get(`balance/${newAddress}`);
        setBalance(response.data.balance);
      } catch (error){
        console.error("Error fetching balance:", error);
        setBalance(0);
      }
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type in a private key" value={privateKey} onChange={onChange}></input>
      </label>

      <div>
        Address: {address.slice(0, 10)}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}
export default Wallet;

 