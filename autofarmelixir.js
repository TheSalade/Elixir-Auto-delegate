const { Web3 } = require('web3');
const hdkey = require('ethereumjs-wallet/hdkey');
const bip39 = require('bip39');

const web3 = new Web3('https://ethereum-sepolia.blockpi.network/v1/rpc/public');

const mnemonic = 'YOUR SEED PHRASE';
const seed = bip39.mnemonicToSeedSync(mnemonic);
const hdWallet = hdkey.fromMasterSeed(seed);

const path = "m/44'/60'/0'/0";
const numSubAccounts = 150; // Nombre de sous-comptes (wallets enfants)

const faucetAddress = '0x800eC0D65adb70f0B69B7Db052C6bd89C2406aC4'; // Faucet contract address
const stakingAddress = '0x7abF52a91D3D078960BAFC9912fa1bE248ef6dcf'; // Staking contract address
const delegationAddress = '0x6a6875b15dc0c8ec99795c9479dac726293a4da1'; // Delegation address

const gasLimit = 500000;  // Limite de gas fixée manuellement
const gasPrice = web3.utils.toWei('7', 'gwei');  // Prix du gas fixé manuellement

// Fonction pour créer une pause de 3 secondes
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const main = async () => {
  for (let i = 1; i < numSubAccounts; i++) {
    const child = hdWallet.derivePath(path + '/' + i);
    const childWallet = child.getWallet();
    const childAddress = childWallet.getAddressString();
    const childPrivateKey = childWallet.getPrivateKeyString();

    let childNonce = await web3.eth.getTransactionCount(childAddress);

    // 1. Claim des tokens
    const claimHexData = '0xc63d75b6000000000000000000000000' + childAddress.slice(2);
    const txClaim = {
      from: childAddress,
      to: faucetAddress,
      value: web3.utils.toWei('0', 'ether'), // Pas d'ETH envoyé
      gas: gasLimit,
      gasPrice: gasPrice,
      data: claimHexData,
      nonce: childNonce++
    };

    await web3.eth.accounts.signTransaction(txClaim, childPrivateKey)
      .then(async (signedTx) => {
        await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
          .on('receipt', console.log)
          .on('error', console.error);
      })
      .catch(console.error);

    // Pause de 3 secondes
    await sleep(3000);

    // 2. Set Allowance
    const allowanceHexData = '0x095ea7b30000000000000000000000007abf52a91d3d078960bafc9912fa1be248ef6dcf000000000000000000000000000000000000000000000cead10e68260c200000';
    const txAllowance = {
      from: childAddress,
      to: faucetAddress,
      value: web3.utils.toWei('0', 'ether'), // Pas d'ETH envoyé
      gas: gasLimit,
      gasPrice: gasPrice,
      data: allowanceHexData,
      nonce: childNonce++
    };

    await web3.eth.accounts.signTransaction(txAllowance, childPrivateKey)
      .then(async (signedTx) => {
        await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
          .on('receipt', console.log)
          .on('error', console.error);
      })
      .catch(console.error);

    // Pause de 3 secondes
    await sleep(3000);

    // 3. Stake des tokens
    const stakeHexData = '0xa694fc3a00000000000000000000000000000000000000000000003635c9adc5dea00000';
    const txStake = {
      from: childAddress,
      to: stakingAddress,
      value: web3.utils.toWei('0', 'ether'), // Pas d'ETH envoyé
      gas: gasLimit,
      gasPrice: gasPrice,
      data: stakeHexData,
      nonce: childNonce++
    };

    await web3.eth.accounts.signTransaction(txStake, childPrivateKey)
      .then(async (signedTx) => {
        await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
          .on('receipt', console.log)
          .on('error', console.error);
      })
      .catch(console.error);

    // Pause de 3 secondes
    await sleep(3000);

    // 4. Delegate les tokens
    const delegateHexData = '0x5c19a95c000000000000000000000000' + delegationAddress.slice(2);
    const txDelegate = {
      from: childAddress,
      to: stakingAddress,
      value: web3.utils.toWei('0', 'ether'), // Pas d'ETH envoyé
      gas: gasLimit,
      gasPrice: gasPrice,
      data: delegateHexData,
      nonce: childNonce++
    };

    await web3.eth.accounts.signTransaction(txDelegate, childPrivateKey)
      .then(async (signedTx) => {
        await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
          .on('receipt', console.log)
          .on('error', console.error);
      })
      .catch(console.error);

    // Pause de 3 secondes
    await sleep(3000);
  }
};

main();
