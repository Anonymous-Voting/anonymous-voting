const path = require('path');
const envPath = path.join(__dirname, '../../.env');
require('dotenv').config({ path: envPath });

// const HDWalletProvider = require("@truffle/hdwallet-provider");
const HDWalletProvider = require("truffle-hdwallet-provider");

const providerFactory = () => {
	return new HDWalletProvider(
		process.env.PRIVATE_KEY,
		"https://rinkeby.infura.io/v3/" + process.env.INFURA_PROJECT_ID,
	  )
  }
module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545, // ganache
            gasPrice: 0,
            network_id: "*", // Match any network id
            websockets: true,
        },
        rinkeby: {
			provider: providerFactory(),
			network_id: 4,
            gasPrice: 2000000000,
			gas: 8000000      //  Sure this gas allocation isn't over 4M, which is the max
		}
    },
    compilers: {
        solc: {
            version: "0.8.0",
            settings: { // See the solidity docs for advice about optimization and evmVersion
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        }
    },
    api_keys: {
        etherscan: process.env.ETHERSCAN_API_KEY
    },
    plugins: [
        'truffle-plugin-verify'
    ]
};
