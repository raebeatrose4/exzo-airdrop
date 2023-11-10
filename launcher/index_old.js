require('dotenv').config();
const ethers = require('ethers');
const contractDetails = require("./ClaimableAirdrop.json")
const airdropData = require("./airdrop.csv")

const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth_sepolia');
const wallet = new ethers.Wallet(privateKey, provider);
// const signer = wallet.connect(provider);

const contract = new ethers.Contract(contractDetails.address,contractDetails.abi,wallet);
const updateAddressBalances = async()=>{
    const res = await contract.setAddressAndBalance(["0x3101100F18b0312edFbbFa8651Ec4550C1cD1C68"],[122])
 console.log(res)
    // console.log(await contract.getClaimsCount());
}

updateAddressBalances();