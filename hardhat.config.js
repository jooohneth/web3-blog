require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

module.exports = {
  solidity: "0.8.4",
  networks: {
    //hardhat: {
    //  chainId: 1337
    //},
     mumbai: {
       url: process.env.MUMBAI_RPC,
       accounts: [process.env.PRIVATE_MUMBAI_KEY]
    },
    // polygon: {
    //   url: "https://polygon-rpc.com/",
    //   accounts: [process.env.pk]
    // }
  }
};