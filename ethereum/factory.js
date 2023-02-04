import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0x708352296205D9Ba21B5Ad06C0af1BD1655bd17a'
);


export default instance;