import Web3 from "web3";
import { network } from "../config";
import BN = require("bn.js");

export const web3 = new Web3(new Web3.providers.HttpProvider(network));

export function getBalance(address: string) {
    return web3.eth.getBalance(address)
}

export const checkAddressChecksum = web3.utils.checkAddressChecksum
export const fromWeiToEther = (number: string | BN) => web3.utils.fromWei(number, "ether")