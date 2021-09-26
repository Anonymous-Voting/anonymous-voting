const path = require('path');
const envPath = path.join(__dirname, '../../.env');
require('dotenv').config({ path: envPath });
const Web3 = require('web3');

const privateKeysArray = process.env.PRIVATE_KEYS.split(",");
console.log(typeof privateKeysArray, privateKeysArray);
// const HDWalletProvider = require("@truffle/hdwallet-provider");
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545, // ganache
            gasPrice: 10000000000,
            network_id: "*", // Match any network id
            websockets: true,
        },
        rinkeby: {
			provider: () => new HDWalletProvider(
                privateKeysArray, 
                new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/" + process.env.INFURA_PROJECT_ID), 
                0, 
                privateKeys.length
            ),
			network_id: 4,
            websockets: true,
            gasPrice: 2000000000,
			gas: 8000000      //  Sure this gas allocation isn't over 4M, which is the max
		},
        BSCTestnet: {
            provider: () => new HDWalletProvider(
                privateKeysArray,
                // "crash gospel crumble please ankle name patient peanut velvet strike present school", 
                `https://data-seed-prebsc-1-s1.binance.org:8545`, 
                0, 
                10
            ),
            network_id: 97,
            confirmations: 1,
            timeoutBlocks: 200,
            skipDryRun: true,
            gasPrice: 10000000000,
            websockets: true
        },
        HECOTestnet: {
            // provider: () => new HDWalletProvider(privateKeys, 'https://http-testnet.hecochain.com'),
            provider: () => new HDWalletProvider(privateKeysArray, 
                new Web3.providers.WebsocketProvider('wss://ws-testnet.hecochain.com'), 0, privateKeys.length),
            network_id: 256,
            gasPrice: 2000000000,
            websockets: true
          },
    },
    compilers: {
        solc: {
            version: "0.7.0",
            settings: { // See the solidity docs for advice about optimization and evmVersion
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        }
    },
    api_keys: {
        etherscan: process.env.HECO_API_KEY
    },
    plugins: [
        'truffle-plugin-verify'
    ]
};
