require('dotenv').config();
const ethers = require('ethers');
const fs = require('fs');
const csv = require('csv-parser');

const contractDetails = require("./ClaimableAirdrop.json");

const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth_sepolia');
const wallet = new ethers.Wallet(privateKey, provider);

const contract = new ethers.Contract(contractDetails.address, contractDetails.abi, wallet);

const readCSVFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    const addresses = [];
    const balances = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        addresses.push(row.HolderAddress);
        const balanceWithoutCommas = row.Balance.replace(/,/g, '');
        const balanceBigNumber = ethers.utils.parseUnits(balanceWithoutCommas, 18);
        balances.push(balanceBigNumber);
      })
      .on('end', () => {
        resolve({ addresses, balances });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

const updateAddressBalances = async () => {
    try {
      const { addresses, balances } = await readCSVFile('./airdrop.csv');
      const batchSize = 500; // Adjust the batch size as needed
      const totalAddresses = addresses.length;
  
      for (let i = 0; i < totalAddresses; i += batchSize) {
        const batchAddresses = addresses.slice(i, i + batchSize);
        const batchBalances = balances.slice(i, i + batchSize);
  
        const overrides = {
          gasLimit: 2000000,
        //   gasPrice: ethers.utils.parseUnits("100", "gwei"),
        };
  
        try {
          const tx = await contract.setAddressAndBalance(batchAddresses, batchBalances, overrides);
          console.log(`Transaction Hash: ${tx.hash}`);
  
          await tx.wait();

        } catch (error) {
          console.error('Error in transaction:',);
        }

        // Delay for 20 seconds before starting the next iteration
        await new Promise(resolve => setTimeout(resolve, 20000));
      }
  
      console.log('Address update completed.');
    } catch (error) {
      console.error('Error reading or updating data:');
    }
  };

updateAddressBalances();
