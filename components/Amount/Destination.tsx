import { NetworkType } from "../../pages/_app";
import {
  Web3Button,
  ThirdwebSDKProvider,
  useContract,
  useContractWrite,
} from "@thirdweb-dev/react";
import { Signer } from "ethers";
import styles from "./Amount.module.css";

type Props = {
  messageBytes: any;
  destinationNetwork: NetworkType;
  attestationSignature: any;
  signer: Signer | undefined;
};

export const DestinationTx: React.FC<Props> = ({
  messageBytes,
  destinationNetwork,
  attestationSignature,
  signer,
}) => {
  return (
    <ThirdwebSDKProvider
      signer={signer}
      activeChain={destinationNetwork.network}
    >
      <Destination
        messageBytes={messageBytes}
        destinationNetwork={destinationNetwork}
        attestationSignature={attestationSignature}
        signer={signer}
      />
    </ThirdwebSDKProvider>
  );
};

export const Destination: React.FC<Props> = ({
  destinationNetwork,
  messageBytes,
  attestationSignature,
}) => {
  const { contract: messageTransmitterContract } = useContract(
    destinationNetwork.messageTransmitterContract
  );
  const {
    mutateAsync: recieveMessage,
    isLoading,
    error,
  } = useContractWrite(messageTransmitterContract, "receiveMessage");
  const destinationTx = async (
    messageBytes: any,
    attestationSignature: string
  ) => {
    // STEP 5: Using the message bytes and signature recieve the funds on destination chain and address
    recieveMessage({ args: [[messageBytes], [attestationSignature]] });
  };
  return (
    <Web3Button
      className={styles.button}
      contractAddress={destinationNetwork.messageTransmitterContract}
      action={() => {
        destinationTx(messageBytes, attestationSignature);
      }}
    >
      Swap USDC
    </Web3Button>
  );
};
