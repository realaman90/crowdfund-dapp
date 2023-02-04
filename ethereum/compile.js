const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');


const buildPath = path.resolve(__dirname, 'build');

fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

const input = {
    language: "Solidity",
    sources: {
      "Campaign.sol": {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };
  
  const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    "Campaign.sol"
  ];
  

//Check if build dir exists if not create
fs.ensureDirSync(buildPath);

//create a file for each contract 
try {
    for(let contract in output){
        fs.outputJSONSync(
            path.resolve(buildPath, `${contract.replace(':', '')}.json`),
            output[contract]
        );
    }
} catch (error) {
    console.log(error)
}