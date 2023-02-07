const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
const compiledCampaign = require('../ethereum/build/Campaign.json');
// const dotenv = require ('dotenv');
// dotenv.config();
const provider = new HDWalletProvider(
  'Add MNEMONIC',
    'https://goerli.infura.io/v3/d5917935b7b34e73848b357ff50e6410'


);
const web3 = new Web3(provider);


// const deploy = async () => {
//   const accounts = await web3.eth.getAccounts();

//   console.log("Attempting to deploy from account", accounts[0]);
//   let result;
//    try {
//     result = await new web3.eth.Contract(compiledFactory.abi)
//     .deploy({ data: compiledFactory.evm.bytecode.object })
//     .send({  from: accounts[0] });
    
//   } catch (error) {
//     console.log(error)
//   }


//   console.log("Contract deployed to", result);
//   provider.engine.stop();
// };

// get all contracts inside the campaign Factory
// const factory = new web3.eth.Contract(
//   compiledFactory.abi,
//   '0x708352296205D9Ba21B5Ad06C0af1BD1655bd17a'
// );

// const deploy = async() =>{
//   const results = await factory.methods.getDeployedCampaigns().call();
//   console.log(results)
// }

//contribute to a campagain
const contribute = async() =>{
  const accounts = await web3.eth.getAccounts();
  const campaign = await new web3.eth.Contract(compiledCampaign.abi, '0x8E5f735570Ab05f04a7356d72Ad6abaB5b29e257');
  console.log("Attempting to contributing from account", accounts[0]);
  let results = await campaign.methods.contribute().send({
    from: accounts[0],
    value: "10000",
  });
  console.log(results);
  
}

// deploy();

contribute()

  
