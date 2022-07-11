import BigNumber from 'bignumber.js';
import {  PANCAKE_LOCKER_ADDRESS } from 'constants/env';
import pancakeLockerAbi from 'constants/pancakeLockerAbi.json';
import { bigintToHex, bigNumberToUint256, getERC20Decimals } from 'utils/utils';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils/types';

interface IUserLock {
	lockDate: Date;
	amount: BigNumber;
	initialAmount: BigNumber;
	unlockDate: Date;
	lockId: string;
	owner: string;
}

export const getUserLockForTokenAtIndex = async (
	web3: Web3,
	creatorAddress: string,
	lpTokenAddress: string,
	index: bigint
): Promise<IUserLock> => {
	// const chainId = await web3.eth.getChainId();
	const lpTokenDecimals = await getERC20Decimals(web3, lpTokenAddress);
	const pancakeLocker = new web3.eth.Contract(pancakeLockerAbi as Array<AbiItem>, PANCAKE_LOCKER_ADDRESS);
	const userLock: { '0': string; '1': string; '2': string; '3': string; '4': string; '5': string } =
		await pancakeLocker.methods.getUserLockForTokenAtIndex(creatorAddress, lpTokenAddress, bigintToHex(index)).call();
	return {
		lockDate: new Date(Number(userLock[0]) * 1000),
		amount: new BigNumber(userLock[1]).div(new BigNumber(10).pow(lpTokenDecimals)),
		initialAmount: new BigNumber(userLock[2]).div(new BigNumber(10).pow(lpTokenDecimals)),
		unlockDate: new Date(Number(userLock[3]) * 1000),
		lockId: userLock[4],
		owner: userLock[5],
	};
};

export const withdraw = async (
	web3: Web3,
	walletAddress: string,
	lpTokenAddress: string,
	index: bigint,
	lockId: string,
	amount: BigNumber
): Promise<void> => {
	const lpTokenDecimals = await getERC20Decimals(web3, lpTokenAddress);
	const pancakeLocker = new web3.eth.Contract(pancakeLockerAbi as Array<AbiItem>, PANCAKE_LOCKER_ADDRESS);

	await pancakeLocker.methods
				.withdraw(lpTokenAddress, bigintToHex(index), lockId, bigNumberToUint256(amount, lpTokenDecimals))
				.send({ from: walletAddress });
};
