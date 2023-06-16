import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { Signer } from 'ethers';
import { NetworkType } from '../pages/_app';

export const destinationTx = async (messageBytes: any, attestationSignature: string, signer: Signer | undefined, destinationNetwork: NetworkType) => {
    // STEP 5: Using the message bytes and signature recieve the funds on destination chain and address
    if (typeof signer === 'undefined') return;
    const sdk = ThirdwebSDK.fromSigner(signer, destinationNetwork.network)
    const messageTransmitterContract = await sdk.getContract(destinationNetwork.messageTransmitterContract);
    const receiveTx = await messageTransmitterContract.call("receiveMessage", [messageBytes, attestationSignature]);
    console.log('ReceiveTx: ', receiveTx)
}