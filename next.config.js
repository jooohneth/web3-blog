require("dotenv").config();

module.exports = {
  env: {
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
    MUMBAI_RPC: process.env.NEXT_PUBLIC_MUMBAI_RPC,
    PRIVATE_MUMBAI_KEY: process.env.NEXT_PUBLIC_PRIVATE_MUMBAI_KEY,
  },
};
