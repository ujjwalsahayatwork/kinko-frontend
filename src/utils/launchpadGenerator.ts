
import BigNumber from 'bignumber.js';
import {  ETHEREUM_CHAIN_ID, LAUNCHPAD_GENERATOR_ADDRESS } from 'constants/env';
import launchpadGeneratorAbi from 'constants/abi/LaunchpadGenerator.json';


import { bigNumberToUint256, getERC20Decimals, numberToHex } from 'utils/utils';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils/types';

export const calculateAmountRequired = async (
	web3: Web3,
	saleTokenAddress: string,
	baseTokenAddress: string,
	amount: BigNumber,
	tokenPrice: BigNumber,
	listingRate: BigNumber,
	liquidityPercent: number,
	tokenFee: number
): Promise<BigNumber> => {
	const  chainId  = await web3.eth.getChainId();

	const saleTokenDecimals = await getERC20Decimals(web3, saleTokenAddress);
	const baseTokenDecimals = await getERC20Decimals(web3, baseTokenAddress);


	const launchpadGenerator = new web3.eth.Contract((launchpadGeneratorAbi.abi) as Array<AbiItem>,
	  LAUNCHPAD_GENERATOR_ADDRESS
	);
	const saleTokenAmountRequired: string = await launchpadGenerator.methods
		.calculateAmountRequired(
			bigNumberToUint256(amount, saleTokenDecimals),
			bigNumberToUint256(tokenPrice, saleTokenDecimals),
			bigNumberToUint256(listingRate, baseTokenDecimals),
			numberToHex(liquidityPercent * 10),
			numberToHex(tokenFee * 10)
		)
		.call();
	return new BigNumber(saleTokenAmountRequired).div(new BigNumber(10).pow(saleTokenDecimals));
};
