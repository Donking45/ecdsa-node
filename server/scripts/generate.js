const secp = require("ethereum-cryptography/secp256k1");
const { toHex }= require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();

console.log('private key:', toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey)

console.log('public key:', toHex(publicKey));

function getAddress(publicKey){
    // remove the first byte from the puublic Key
    const keyWithoutPrefix = publicKey.slice(1);

    //calculate the keccak hash of the public key
    const hash = keccak256(keyWithoutPrefix);

    //return the last 20 bytes of the hash
    return hash.slice(-20);
}
console.log("Ethereum Address:", getAddress(publicKey));
