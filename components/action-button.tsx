import { ConnectWallet, useAddress, useContract, useContractRead, useTokenBalance } from "@thirdweb-dev/react";
import { Status } from "../const/types";
import { utils, BigNumber } from "ethers";
import { Dispatch, SetStateAction, useState } from "react";
import { NetworkSlug, Networks } from "../const/chains";
import { Destination } from "./Logic/Destination";
import { Burn } from "./Logic/Burn";
import { Approve } from "./Logic/Approve";

interface ActionButtonProps {
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
  sourceNetwork: NetworkSlug;
  destinationNetwork: NetworkSlug;
  amount: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ status, setStatus, sourceNetwork, destinationNetwork, amount }) => {
  const [messageBytes, setMessageBytes] = useState("");
  const [attestationSignature, setAttestationSignature] = useState("");
  const address = useAddress();

  const network = Networks[sourceNetwork];
  const { contract: usdcContract } = useContract(network.usdcContract);
  const { data: usdcAllowance } = useContractRead(usdcContract, "allowance", [
    address,
    network.tokenMessengerContract,
  ]);
  const formattedAllowance = Number(utils.formatUnits(usdcAllowance || BigNumber.from(0), 6));

  if (!address) {
    return <ConnectWallet className="connect-wallet" />;
  }

  if (status === "swap") {
    return (
      <Destination
        destinationNetwork={destinationNetwork}
        messageBytes={messageBytes}
        attestationSignature={attestationSignature}
        setStatus={setStatus}
      />);
  }

  if ((usdcAllowance && formattedAllowance <= Number(amount))) {
    return (
      <Approve
        contractAddress={network.usdcContract}
        amount={amount}
        tokenMessengerContract={network.tokenMessengerContract}
      />
    );
  }

  if (!attestationSignature || !messageBytes) {
    return (
      <Burn
        network={network}
        destinationNetwork={destinationNetwork}
        amount={amount}
        setMessageBytes={setMessageBytes}
        setAttestationSignature={setAttestationSignature}
        setStatus={setStatus}
      />
    );
  }

  return "Something went wrong";
};
