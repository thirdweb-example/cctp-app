import { NetworkDropdown } from "./NetworkDropdown/NetworkDropdown";
import { SwapNetwork } from "./SwapNetwork/SwapNetwork";
import { NetworkSlug, NetworkType, Networks } from "../const/chains";
import { Dispatch, SetStateAction, useState } from "react";
import { TestnetMainnetSelector } from "./testnet-mainnet-selector";
import { Status } from "../const/types";
import { ActionButton } from "./action-button";
import { TransferInput } from "./transfer-input";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";

interface CardProps {
  sourceNetwork: NetworkSlug;
  setSourceNetwork: Dispatch<SetStateAction<NetworkSlug>>;
  destinationNetwork: NetworkSlug;
  setDestinationNetwork: Dispatch<SetStateAction<NetworkSlug>>;
  isTestnet: boolean;
  setIsTestnet: Dispatch<SetStateAction<boolean>>;
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
};

export const Card: React.FC<CardProps> = ({
  sourceNetwork,
  setSourceNetwork,
  destinationNetwork,
  setDestinationNetwork,
  isTestnet,
  setIsTestnet,
  status,
  setStatus,
}) => {
  const address = useAddress();
  const network = Networks[sourceNetwork];
  const { contract: usdcContract } = useContract(network.usdcContract);
  const { data: balance } = useTokenBalance(usdcContract, address);
  const [amount, setAmount] = useState("");

  return (
    <div className="px-4 py-5 sm:px-6 rounded-xl bg-[#131417] w-full md:w-9/12 mx-auto flex flex-col gap-4">
      {/*       {status === "idle" ? ( */}
      <>
        <TestnetMainnetSelector
          isTestnet={isTestnet}
          setIsTestnet={setIsTestnet}
        />
        <NetworkDropdown network={sourceNetwork} setNetwork={setSourceNetwork} forbiddenNetwork={destinationNetwork} isTestnet={isTestnet} />
        <SwapNetwork sourceNetwork={sourceNetwork} setSourceNetwork={setSourceNetwork} destinationNetwork={destinationNetwork} setDestinationNetwork={setDestinationNetwork} />
        <NetworkDropdown network={destinationNetwork} setNetwork={setDestinationNetwork} forbiddenNetwork={sourceNetwork} isTestnet={isTestnet} />
      </>
      {/*       ) : ( */}
      <TransferInput
        amount={amount}
        setAmount={setAmount}
        balance={Number((balance?.displayValue) || "0").toFixed(2)}
      />
      <ActionButton amount={amount} status={status} setStatus={setStatus} sourceNetwork={sourceNetwork} destinationNetwork={destinationNetwork} />
      {/*       )} */}
    </div>
  );
};


