import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { useContract, useContractWrite } from '@thirdweb-dev/react'
import { Signer } from 'ethers';
import { NetworkType } from '../pages/_app';

export const destinationTx = async (messageBytes: any, attestationSignature: string, signer: Signer | undefined, destinationNetwork: NetworkType) => {
    // STEP 5: Using the message bytes and signature recieve the funds on destination chain and address
    const { contract: messageTransmitterContract } = useContract(destinationNetwork.messageTransmitterContract)
    const { mutateAsync: recieveMessage, isLoading, error } = useContractWrite(
        messageTransmitterContract,
        "receiveMessage",
    );
    recieveMessage({ args: [[messageBytes], [attestationSignature]] })
}