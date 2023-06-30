import { NetworkSlug, Networks } from "../const/chains";
import { Web3Button, useContract, useContractWrite } from "@thirdweb-dev/react";
import { Dispatch, SetStateAction } from "react";
import { Status } from "../const/types";
import { useState } from "react";
import Confetti from "react-dom-confetti";

const config = {
  angle: 90,
  spread: 45,
  startVelocity: 45,
  elementCount: 50,
  dragFriction: 0.1,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

interface SwapButtonProps {
  messageBytes: string;
  destinationNetwork: NetworkSlug;
  attestationSignature: string;
  setStatus: Dispatch<SetStateAction<Status>>;
}

export const SwapButton: React.FC<SwapButtonProps> = ({
  destinationNetwork,
  messageBytes,
  attestationSignature,
  setStatus,
}) => {
  const [active, setActive] = useState(false);
  const fullDestinationNetwork = Networks[destinationNetwork];
  const { contract: messageTransmitterContract } = useContract(
    fullDestinationNetwork.messageTransmitterContract
  );
  const { mutateAsync: recieveMessage } = useContractWrite(
    messageTransmitterContract,
    "receiveMessage"
  );
  const destinationTx = async (
    messageBytes: any,
    attestationSignature: string
  ) => {
    // STEP 5: Using the message bytes and signature receive the funds on destination chain and address
    recieveMessage({ args: [messageBytes, attestationSignature] });
  };
  return (
    <>
      <Web3Button
        className="connect-wallet"
        contractAddress={fullDestinationNetwork.messageTransmitterContract}
        action={() => {
          destinationTx(messageBytes, attestationSignature);
        }}
        onSuccess={() => {
          setActive(true);
        }}
      >
        Mint USDC
      </Web3Button>
      <Confetti active={active} config={config} />
    </>
  );
};
