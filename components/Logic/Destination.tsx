import { NetworkSlug, Networks } from "../../const/chains";
import {
  Web3Button,
  useContract,
  useContractWrite,
} from "@thirdweb-dev/react";
import styles from "./Approve.module.css";
import { Dispatch, SetStateAction } from "react";
import { Status } from "../../const/types";

interface DestinationProps {
  messageBytes: string;
  destinationNetwork: NetworkSlug;
  attestationSignature: string;
  setStatus: Dispatch<SetStateAction<Status>>;
};

export const Destination: React.FC<DestinationProps> = ({
  destinationNetwork,
  messageBytes,
  attestationSignature,
  setStatus,
}) => {
  const fullDestinationNetwork = Networks[destinationNetwork];
  const { contract: messageTransmitterContract } = useContract(
    fullDestinationNetwork.messageTransmitterContract
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
      contractAddress={fullDestinationNetwork.messageTransmitterContract}
      action={() => {
        destinationTx(messageBytes, attestationSignature);
      }}
      onSuccess={() => {
        setStatus("idle");
      }}
    >
      Swap USDC
    </Web3Button>
  );
};
