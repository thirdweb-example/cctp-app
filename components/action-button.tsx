import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { Status } from "../const/types";
import { Dispatch, SetStateAction, useState } from "react";
import { NetworkSlug, Networks } from "../const/chains";
import { SwapButton } from "./swap-button";
import { ApproveAndBurnButton } from "./approve-and-burn-button";

interface ActionButtonProps {
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
  amount
}) => {
  const [messageBytes, setMessageBytes] = useState("");
  const [attestationSignature, setAttestationSignature] = useState("");
  const address = useAddress();

  const network = Networks[sourceNetwork];

  if (!address) {
    return <ConnectWallet className="connect-wallet" />;
  }

  if (!attestationSignature || !messageBytes) {
    return (
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
    <SwapButton
      destinationNetwork={destinationNetwork}
      messageBytes={messageBytes}
      attestationSignature={attestationSignature}
      setStatus={setStatus}
    />
  );
};
