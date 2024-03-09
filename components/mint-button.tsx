import { NetworkSlug, Networks } from "../const/chains";
import {
  Web3Button,
  useContract,
  useContractWrite,
  useTokenBalance,
  useAddress,
} from "@thirdweb-dev/react";
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

interface MintButtonProps {
  messageBytes: string;
  destinationNetwork: NetworkSlug;
  attestationSignature: string;
  setStatus: Dispatch<SetStateAction<Status>>;
  setAmount: Dispatch<SetStateAction<string>>;
}

export const MintButton: React.FC<MintButtonProps> = ({
  destinationNetwork,
  messageBytes,
  attestationSignature,
  setStatus,
  setAmount,
}) => {
  const [active, setActive] = useState(false);
  const fullDestinationNetwork = Networks[destinationNetwork];
  const { contract: messageTransmitterContract } = useContract(
    fullDestinationNetwork.messageTransmitterContract
  );
  const { contract: usdcContract } = useContract(
    fullDestinationNetwork.usdcContract
  );
  const address = useAddress();
  const { data: balance, isLoading: balanceLoading } = useTokenBalance(
    usdcContract,
    address
  );
  const {
    mutateAsync: recieveMessage,
    isSuccess,
    isLoading,
  } = useContractWrite(messageTransmitterContract, "receiveMessage");
  const destinationTx = async (
    messageBytes: any,
    attestationSignature: string
  ) => {
    // STEP 5: Using the message bytes and signature receive the funds on destination chain and address
    recieveMessage({ args: [messageBytes, attestationSignature] });
  };
  return (
    <>
      <div className="border border-[#706f78] bg-[#131417] rounded-xl m-4 ">
        <h2 className="text-gray-300 text-m">Balance:</h2>
        {balanceLoading ? (
          <i className="fas fa-spinner fa-spin fa-m"></i>
        ) : (
          <h2 className="text-gray-200 text-m">
            {Number(balance?.displayValue).toFixed(2)}{" "}
            <span className="text-gray-200">USDC</span>
          </h2>
        )}
      </div>

      {active ? (
        <button
          className="transfer-button"
          onClick={() => {
            setStatus("idle");
            setAmount("");
          }}
          disabled={isLoading}
        >
          Close
        </button>
      ) : (
        <Web3Button
          className="connect-wallet"
          contractAddress={fullDestinationNetwork.messageTransmitterContract}
          action={() => {
            destinationTx(messageBytes, attestationSignature);
            if (isSuccess) {
              setActive(true);
            }
          }}
          isDisabled={isLoading}
          onSuccess={() => {
            setActive(true);
          }}
        >
          Mint USDC
        </Web3Button>
      )}
      <Confetti active={isSuccess} config={config} />
    </>
  );
};
