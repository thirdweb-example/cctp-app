import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers, Signer } from "ethers";
import { NetworkType } from "../pages"

interface AttestationResponse {
    status: string;
    attestation?: string;
}

export const approve = async (signer: Signer | undefined, amount: number, network: NetworkType) => {
    if (typeof signer === 'undefined') return;
    const sdk = ThirdwebSDK.fromSigner(signer, network.network);

    // initialize contracts
    const usdcContract = await sdk.getContract(network.usdcContract);

    // STEP 1: Approve messenger contract to withdraw from our active eth address
    const approveMessengerWithdraw = await usdcContract.call("approve", [network.tokenMessengerContract, amount])
    console.log(approveMessengerWithdraw, 'approveMessengerWithdraw data');
}

export const burn = async (signer: Signer | undefined, amount: number, network: NetworkType, destinationAddress: string | undefined) => {
    if (typeof signer === 'undefined') return;
    // initialize sdk
    const sdk = ThirdwebSDK.fromSigner(signer, network.network);

    // initialize contract
    const tokenMessengerContract = await sdk.getContract(network.tokenMessengerContract);

    // destination address
    const destinationAddressInBytes32 = ethers.utils.defaultAbiCoder.encode(["address"], [destinationAddress])
    const DESTINATION_DOMAIN = 1;

    // STEP 2: Burn USDC
    const burnUSDC = await tokenMessengerContract.call("depositForBurn", [amount, DESTINATION_DOMAIN, destinationAddressInBytes32, network.usdcContract]);
    console.log(burnUSDC, 'burnUSDC data');
    console.log(burnUSDC.receipt.logs, 'burnUSDC logs')
    // console.log(typeof (burnUSDC.receipt.logs), 'burnUSDC logs')

    // STEP 3: Retrieve message bytes from logs
    const transactionReceipt = burnUSDC.receipt;
    const eventTopic = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('MessageSent(bytes)'));
    const log = transactionReceipt.logs.find((l: any) => l.topics[0] === eventTopic)
    const messageBytes = ethers.utils.defaultAbiCoder.decode(['bytes'], log.data)[0]
    const messageHash = ethers.utils.keccak256(messageBytes);

    console.log(`MessageBytes: ${messageBytes}`)
    console.log(`MessageHash: ${messageHash}`)

    // STEP 4: Fetch attestation signature
    let attestationResponse: AttestationResponse = { status: 'pending' };
    while (attestationResponse.status !== 'complete') {
        const response = await fetch(`${network.api}/${messageHash}`);
        attestationResponse = await response.json()
        await new Promise(r => setTimeout(r, 2000));
    }

    const attestationSignature = attestationResponse.attestation;
    console.log(`Signature: ${attestationSignature}`)
    if (typeof attestationSignature === 'undefined') return;
    return { messageBytes, attestationSignature }
}