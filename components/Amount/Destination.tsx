import { NetworkType } from "../../const/chains";
import {
  Web3Button,
  ThirdwebSDKProvider,
  useContract,
  useContractWrite,
  useAddress,
} from "@thirdweb-dev/react";
import { Signer } from "ethers";
import styles from "./Amount.module.css";
import { Dispatch, SetStateAction } from "react";

type Props = {
  messageBytes: any;
  destinationNetwork: NetworkType;
  attestationSignature: any;
  signer: Signer | undefined;
  setEthereumAsNetwork: Dispatch<SetStateAction<boolean>>;
};

export const DestinationTx: React.FC<Props> = ({
  messageBytes,
  destinationNetwork,
  attestationSignature,
  signer,
  setEthereumAsNetwork,
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
        setEthereumAsNetwork={setEthereumAsNetwork}
      />
    </ThirdwebSDKProvider>
  );
};

export const Destination: React.FC<Props> = ({
  destinationNetwork,
  messageBytes,
  attestationSignature,
  setEthereumAsNetwork,
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
    recieveMessage({ args: [messageBytes, attestationSignature] });
  };
  const { contract: usdcContract } = useContract(
    destinationNetwork.usdcContract
  );
  const address = useAddress();
  return (
    <Web3Button
      className={styles.button}
      contractAddress={destinationNetwork.messageTransmitterContract}
      action={() => {
        destinationTx(messageBytes, attestationSignature);
      }}
      onSuccess={() => {
        setEthereumAsNetwork((prevValue) => !prevValue);
      }}
    >
      Swap USDC
    </Web3Button>
  );
};
