import BigNumber from 'bignumber.js';
import { LAUNCHPAD_SETTINGS_ADDRESS, ETHEREUM_CHAIN_ID, BSC_LAUNCHPAD_SETTINGS_ADDRESS, BSC_CHAIN_ID } from 'constants/env';
import launchpadSettingsAbi from 'constants/launchpadSettingsAbi.json';
import bscLaunchpadSettingsAbi from 'constants/bscLaunchpadSettingsAbi.json';

import Web3 from 'web3';
import { AbiItem } from 'web3-utils/types';

export const getTokenFeePercent = async (web3: Web3): Promise<number> => {
	const chainId = await web3.eth.getChainId();
	const launchpadSettings = new web3.eth.Contract((chainId=== ETHEREUM_CHAIN_ID?launchpadSettingsAbi: bscLaunchpadSettingsAbi) as Array<AbiItem>, 
	chainId=== ETHEREUM_CHAIN_ID?LAUNCHPAD_SETTINGS_ADDRESS:BSC_LAUNCHPAD_SETTINGS_ADDRESS);
	const tokenFee = await launchpadSettings.methods.getTokenFee().call();
	return Number(tokenFee) / 10;
};



export const getDEVCreationFee = async (web3: Web3): Promise<BigNumber> => {

	const chainId = await web3.eth.getChainId();
	const launchpadSettings = new web3.eth.Contract((chainId=== ETHEREUM_CHAIN_ID?launchpadSettingsAbi: bscLaunchpadSettingsAbi) as Array<AbiItem>, 
	chainId=== ETHEREUM_CHAIN_ID?LAUNCHPAD_SETTINGS_ADDRESS:BSC_LAUNCHPAD_SETTINGS_ADDRESS);

	let creationFee:any ;
	if(chainId ===ETHEREUM_CHAIN_ID){

	 creationFee = await launchpadSettings.methods.getGlmrCreationFee().call();
	}else if(chainId===BSC_CHAIN_ID){

		creationFee = await launchpadSettings.methods.getGlmrCreationFee().call();
	}

	return  new BigNumber(creationFee).div(new BigNumber(10).pow(18));
};

// export const getBNBreationFee = async (web3: Web3): Promise<BigNumber> => {

// 	const launchpadSettings = new web3.eth.Contract(bscLaunchpadSettingsAbi as Array<AbiItem>, BSC_LAUNCHPAD_SETTINGS_ADDRESS);
// 	const creationFee = await launchpadSettings.methods.getBNBCreationFee().call();
// 	return new BigNumber(creationFee).div(new BigNumber(10).pow(18));
// };


export const getRound1Length = async (web3: Web3): Promise<number> => {
	const  chainId  = await web3.eth.getChainId();
	const launchpadSettings = new web3.eth.Contract((chainId=== ETHEREUM_CHAIN_ID?launchpadSettingsAbi: bscLaunchpadSettingsAbi) as Array<AbiItem>, 
	chainId=== ETHEREUM_CHAIN_ID?LAUNCHPAD_SETTINGS_ADDRESS:BSC_LAUNCHPAD_SETTINGS_ADDRESS);
	const round1Length = await launchpadSettings.methods.getRound1Length().call();
	return Number(round1Length);
};
