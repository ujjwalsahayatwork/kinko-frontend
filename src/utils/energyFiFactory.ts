import { ETHEREUM_CHAIN_ID, PANCAKE_FACTORY_ADDRESS } from 'constants/env';
import pancakeFactoryAbi from 'constants/abi/PancakeFactory.json';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils/types';

export const getPair = async (web3: Web3, address1: string, address2: string): Promise<string> => {
	const chainId = await web3.eth.getChainId();

	const energyFiFactory = new web3.eth.Contract(
		(pancakeFactoryAbi.abi) as Array<AbiItem>,
		PANCAKE_FACTORY_ADDRESS
	);
	const checkdata = await energyFiFactory?.methods?.getPair(address1, address2).call();
	return checkdata;
};
