const ethers = require('ethers');

const mnemonic = ethers.Wallet.createRandom().mnemonic;

const wallet = ethers.Wallet.fromPhrase(mnemonic.phrase); 

const key = wallet.privateKey; 

console.log('Seed (mnÃ©monique) :', mnemonic);
console.log('Wallet address :', wallet.address);
console.log('Private key :', key);
