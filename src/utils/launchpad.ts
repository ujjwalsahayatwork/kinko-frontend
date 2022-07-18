import BigNumber from 'bignumber.js';
import { ETHEREUM_CHAIN_ID } from 'constants/env';
import launchpadAbi from 'constants/abi/Launchpad.json';
import { bigNumberToUint256, getERC20Decimals } from 'utils/utils';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils/types';


export const userDeposit = async (
	web3: Web3,
	walletAddress: string,
	launchpadAddress: string,
	baseTokenAddress: string,
	isBnb: boolean,
	amount: BigNumber
): Promise<void> => {
	
	// ; // eslint-disable-line no-debugger
	const  chainId  = await web3.eth.getChainId();

	const baseTokenDecimals = await getERC20Decimals(web3, baseTokenAddress);
	const launchpad = new web3.eth.Contract((launchpadAbi.abi) as Array<AbiItem>, launchpadAddress);

	if (isBnb) {
	
		await launchpad.methods
			.userDeposit(bigNumberToUint256(amount, baseTokenDecimals))
			.send({ from: walletAddress, value: bigNumberToUint256(amount, baseTokenDecimals) });
	} else {
		// await launchpad.methods.userDeposit(bigNumberToUint256(amount, baseTokenDecimals)).send({ from: walletAddress });
		await launchpad.methods
		.userDeposit(bigNumberToUint256(amount, baseTokenDecimals),[],[])
		.send({ from: walletAddress, value: bigNumberToUint256(amount, baseTokenDecimals) });
		
	}
};



export const addLiquidity = async (web3: Web3, walletAddress: string, launchpadAddress: string,
	): Promise<string> => {
	const  chainId  = await web3.eth.getChainId();
	const launchpad = new web3.eth.Contract((launchpadAbi.abi) as Array<AbiItem>, launchpadAddress);
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
	const launchpad = new web3.eth.Contract((launchpadAbi.abi) as Array<AbiItem>, launchpadAddress);
	await launchpad.methods.userWithdrawTokens().send({ from: walletAddress });
};

export const userWithdrawBaseTokens = async (
	web3: Web3,
	walletAddress: string,
	launchpadAddress: string,
	
): Promise<void> => {
	const  chainId  = await web3.eth.getChainId();
	const launchpad = new web3.eth.Contract((launchpadAbi.abi) as Array<AbiItem>, launchpadAddress);
	await launchpad.methods.userWithdrawBaseTokens().send({ from: walletAddress });
};

export const ownerWithdrawTokens = async (
	web3: Web3,
	walletAddress: string,
	launchpadAddress: string,

): Promise<void> => {
	const  chainId  = await web3.eth.getChainId();
	const launchpad = new web3.eth.Contract((launchpadAbi.abi) as Array<AbiItem>, launchpadAddress);
	await launchpad.methods.ownerWithdrawTokens().send({ from: walletAddress });
};

export const getBuyer = async (
	web3: Web3,
	buyerAddress: string,
	launchpadAddress: string,
	saleTokenAddress: string,
	baseTokenAddress: string
): Promise<{ baseDeposited: BigNumber; tokensOwed: BigNumber }> => {
	// const  chainId  = await web3.eth.getChainId();
	const saleTokenDecimals = await getERC20Decimals(web3, saleTokenAddress);
	const baseTokenDecimals = await getERC20Decimals(web3, baseTokenAddress);
	const launchpad = new web3.eth.Contract((launchpadAbi.abi) as Array<AbiItem>,launchpadAddress );
	const buyer: { baseDeposited: string; tokensOwed: string } = await launchpad.methods.buyers(buyerAddress).call();
	const { baseDeposited, tokensOwed } = buyer;
	return {
		baseDeposited: new BigNumber(baseDeposited).div(new BigNumber(10).pow(baseTokenDecimals)),
		tokensOwed: new BigNumber(tokensOwed).div(new BigNumber(10).pow(saleTokenDecimals)),
	};
};

export const getEthMessageHash = async (
	web3: Web3,
	refferAddress: string,
	launchpadAddress: string,
	amount: BigNumber
): Promise<{ ethmessageHash: string; }> => {

	const launchpad = new web3.eth.Contract((launchpadAbi.abi) as Array<AbiItem>,launchpadAddress );
	const messageHash:  string  = await launchpad.methods.getMessageHash(refferAddress,launchpadAddress,amount).call();
	const ethmessageHash:  string  = await launchpad.methods.getEthSignedMessageHash(messageHash).call();

	return {ethmessageHash};

};


export const getLaunchpadInformation = async (
	web3: Web3,
	launchpadAddress: string,
): Promise<{launchpadinfo: any}> => {

	const launchpad = new web3.eth.Contract((launchpadAbi.abi) as Array<AbiItem>,launchpadAddress );
	const launchpadinfo:  string  = await launchpad.methods.launchpadInfo().call();
	

	return {launchpadinfo};

};



