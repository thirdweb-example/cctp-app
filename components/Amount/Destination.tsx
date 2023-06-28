import { NetworkType } from "../../const/chains";
import {
  Web3Button,
  ThirdwebProvider,
  useContract,
  useContractWrite,
} from "@thirdweb-dev/react";
import styles from "./Amount.module.css";
import { Dispatch, SetStateAction } from "react";

type Props = {
  messageBytes: any;
  destinationNetwork: NetworkType;
  attestationSignature: any;
  setIsEthereum: Dispatch<SetStateAction<boolean>>;
};

export const DestinationTx: React.FC<Props> = ({
  messageBytes,
  destinationNetwork,
  attestationSignature,
  setIsEthereum,
}) => {
  return (
    <ThirdwebProvider activeChain={destinationNetwork.network}>
      <Destination
        messageBytes={messageBytes}
        destinationNetwork={destinationNetwork}
        attestationSignature={attestationSignature}
        setIsEthereum={setIsEthereum}
      />
    </ThirdwebProvider>
  );
};

export const Destination: React.FC<Props> = ({
  destinationNetwork,
  messageBytes,
  attestationSignature,
  setIsEthereum,
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
    // STEP 5: Using the message bytes and signature receive the funds on destination chain and address
    recieveMessage({ args: [messageBytes, attestationSignature] });
  };
  return (
    <Web3Button
      className={styles.button}
      contractAddress={destinationNetwork.messageTransmitterContract}
      action={() => {
        destinationTx(messageBytes, attestationSignature);
      }}
      onSuccess={() => {
        setIsEthereum((prevValue) => !prevValue);
      }}
    >
      Swap USDC
    </Web3Button>
  );
};
