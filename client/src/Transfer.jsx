import { useState } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1"; // Import the secp256k1 library
import { utf8ToBytes } from "ethereum-cryptography/utils";


function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    
    try {
      // Construct the transaction data
      const transactionData = {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
      };
      
      // Hash the transaction data
      const messageHash = secp.utils.keccak256(utf8ToBytes(JSON.stringify(transactionData)));

      // Sign the message hash using the sender's private key
      const signature = secp.sign(messageHash, Buffer.from(privateKey, "hex"));

      // Send the transaction data along with the signature to the server
      const {
        data: { balance },
      } = await server.post(`send`, {
        ...transactionData,
        signature: signature.signature, // Send the signature part of the signature object
      });

      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
