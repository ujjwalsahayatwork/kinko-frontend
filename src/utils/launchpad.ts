import BigNumber from 'bignumber.js';
import { ETHEREUM_CHAIN_ID } from 'constants/env';
import launchpadAbi from 'constants/launchpadAbi.json';
import bscLaunchpadAbi from 'constants/bscLaunchpadAbi.json';
import { bigNumberToUint256, getERC20Decimals } from 'utils/utils';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils/types';


export const userDeposit = async (
	web3: Web3,
	walletAddress: string,
	launchpadAddress: string,
	baseTokenAddress: string,
	isGlmr: boolean,
	amount: BigNumber
): Promise<void> => {
	
	// ; // eslint-disable-line no-debugger
	const  chainId  = await web3.eth.getChainId();

	const baseTokenDecimals = await getERC20Decimals(web3, baseTokenAddress);
	const launchpad = new web3.eth.Contract((chainId === ETHEREUM_CHAIN_ID ? launchpadAbi : bscLaunchpadAbi) as Array<AbiItem>, launchpadAddress);

	if (isGlmr) {
	
		await launchpad.methods
			.userDeposit(bigNumberToUint256(amount, baseTokenDecimals))
			.send({ from: walletAddress, value: bigNumberToUint256(amount, baseTokenDecimals) });
	} else {
		// await launchpad.methods.userDeposit(bigNumberToUint256(amount, baseTokenDecimals)).send({ from: walletAddress });
		await launchpad.methods
		.userDeposit(bigNumberToUint256(amount, baseTokenDecimals))
		.send({ from: walletAddress, value: bigNumberToUint256(amount, baseTokenDecimals) });
		
	}
};

export const addLiquidity = async (web3: Web3, walletAddress: string, launchpadAddress: string,
	): Promise<string> => {
	const  chainId  = await web3.eth.getChainId();
	const launchpad = new web3.eth.Contract((chainId === ETHEREUM_CHAIN_ID ? launchpadAbi : bscLaunchpadAbi) as Array<AbiItem>, launchpadAddress);
	return new Promise<string>((resolve, reject) => {
		launchpad.methods.addLiquidity().send({ from: walletAddress }, (error: Error, transactionHash: string) => {
			if (error) {
				reject(error);
			} else {
				resolve(transactionHash);
			}
		});
	});
};

export const userWithdrawTokens = async (
	web3: Web3,
	walletAddress: string,
	launchpadAddress: string,
	
): Promise<void> => {
	const  chainId  = await web3.eth.getChainId();
	const launchpad = new web3.eth.Contract((chainId === ETHEREUM_CHAIN_ID ? launchpadAbi : bscLaunchpadAbi) as Array<AbiItem>, launchpadAddress);
	await launchpad.methods.userWithdrawTokens().send({ from: walletAddress });
};

export const userWithdrawBaseTokens = async (
	web3: Web3,
	walletAddress: string,
	launchpadAddress: string,
	
): Promise<void> => {
	const  chainId  = await web3.eth.getChainId();
	const launchpad = new web3.eth.Contract((chainId === ETHEREUM_CHAIN_ID ? launchpadAbi : bscLaunchpadAbi) as Array<AbiItem>, launchpadAddress);
	await launchpad.methods.userWithdrawBaseTokens().send({ from: walletAddress });
};

export const ownerWithdrawTokens = async (
	web3: Web3,
	walletAddress: string,
	launchpadAddress: string,

): Promise<void> => {
	const  chainId  = await web3.eth.getChainId();
	const launchpad = new web3.eth.Contract((chainId === ETHEREUM_CHAIN_ID ? launchpadAbi : bscLaunchpadAbi) as Array<AbiItem>, launchpadAddress);
	await launchpad.methods.ownerWithdrawTokens().send({ from: walletAddress });
};

export const getBuyer = async (
	web3: Web3,
	buyerAddress: string,
	launchpadAddress: string,
	saleTokenAddress: string,
	baseTokenAddress: string
): Promise<{ baseDeposited: BigNumber; tokensOwed: BigNumber }> => {
	const  chainId  = await web3.eth.getChainId();
	const saleTokenDecimals = await getERC20Decimals(web3, saleTokenAddress);
	const baseTokenDecimals = await getERC20Decimals(web3, baseTokenAddress);
	const launchpad = new web3.eth.Contract((chainId === ETHEREUM_CHAIN_ID ? launchpadAbi : bscLaunchpadAbi) as Array<AbiItem>,launchpadAddress );
	const buyer: { baseDeposited: string; tokensOwed: string } = await launchpad.methods.buyers(buyerAddress).call();
	const { baseDeposited, tokensOwed } = buyer;
	return {
		baseDeposited: new BigNumber(baseDeposited).div(new BigNumber(10).pow(baseTokenDecimals)),
		tokensOwed: new BigNumber(tokensOwed).div(new BigNumber(10).pow(saleTokenDecimals)),
	};
};
