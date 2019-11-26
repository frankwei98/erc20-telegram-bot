import { tokenContract } from "../config/index";
import { web3 } from "../utils/eth";
import { ABI } from "./abi/ERC20";

const contract = new web3.eth.Contract(ABI, tokenContract)
export default contract