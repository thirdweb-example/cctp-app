import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { Status } from "../const/types";
import { Dispatch, SetStateAction, useState } from "react";
import { NetworkSlug, Networks } from "../const/chains";
import { MintButton } from "./mint-button";
import { ApproveAndBurnButton } from "./approve-and-burn-button";

export interface ActionButtonProps {
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
  sourceNetwork: NetworkSlug;
  destinationNetwork: NetworkSlug;
  amount: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  status,
  setStatus,
  sourceNetwork,
  destinationNetwork,
  amount,
}) => {
  const [messageBytes, setMessageBytes] = useState("");
  const [attestationSignature, setAttestationSignature] = useState("");
  const address = useAddress();

  const network = Networks[sourceNetwork];

  if (!address) {
    return <ConnectWallet className="connect-wallet" />;
  }

  if (!attestationSignature || !messageBytes) {
    return status === "idle" ? (
      <button className="connect-wallet" onClick={() => setStatus("burn")}>
        Transfer USDC
      </button>
    ) : (
      <ApproveAndBurnButton
        network={network}
        destinationNetwork={destinationNetwork}
        amount={amount}
        setMessageBytes={setMessageBytes}
        setAttestationSignature={setAttestationSignature}
        setStatus={setStatus}
      />
    );
  }

  return (
    <MintButton
      destinationNetwork={destinationNetwork}
      messageBytes={messageBytes}
      attestationSignature={attestationSignature}
      setStatus={setStatus}
    />
  );
};
