import { NetworkDropdown } from "./network-dropdown";
import { SwapNetwork } from "./swap-network";
import { NetworkSlug, Networks } from "../const/chains";
import { Dispatch, SetStateAction, useState } from "react";
import { Status } from "../const/types";
import { ActionButton } from "./action-button";
import { TransferInput } from "./transfer-input";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { Modal } from "./modal";

interface CardProps {
  sourceNetwork: NetworkSlug;
  setSourceNetwork: Dispatch<SetStateAction<NetworkSlug>>;
  destinationNetwork: NetworkSlug;
  setDestinationNetwork: Dispatch<SetStateAction<NetworkSlug>>;
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
}

export const Card: React.FC<CardProps> = ({
  sourceNetwork,
  setSourceNetwork,
  destinationNetwork,
  setDestinationNetwork,
  status,
  setStatus,
}) => {
  const address = useAddress();
  const network = Networks[sourceNetwork];
  const { contract: usdcContract } = useContract(network.usdcContract);
  const { data: balance, isLoading: balanceLoading } = useTokenBalance(
    usdcContract,
    address
  );
  const [amount, setAmount] = useState("");

  const swapNetwork = () => {
    setDestinationNetwork(sourceNetwork);
    setSourceNetwork(destinationNetwork);
  };

  return (
    <div className="px-4 py-5 sm:px-6 rounded-xl bg-[#131417] w-full md:w-9/12 mx-auto flex flex-col gap-4">
      {status === "idle" ? (
        <>
          <div className="flex flex-col gap-2">
            <NetworkDropdown
              heading="From"
              swapNetwork={swapNetwork}
              network={sourceNetwork}
              setNetwork={setSourceNetwork}
              forbiddenNetwork={destinationNetwork}
            />
            <SwapNetwork swapNetwork={swapNetwork} />
            <NetworkDropdown
              heading="To"
              swapNetwork={swapNetwork}
              network={destinationNetwork}
              setNetwork={setDestinationNetwork}
              forbiddenNetwork={sourceNetwork}
            />
          </div>
          <TransferInput
            amount={amount}
            setAmount={setAmount}
            balance={Number(balance?.displayValue || "0").toFixed(2)}
            balanceLoading={balanceLoading}
          />
          {amount && Number(amount) > 0 && (
            <ActionButton
              amount={amount}
              status={status}
              setStatus={setStatus}
              sourceNetwork={sourceNetwork}
              destinationNetwork={destinationNetwork}
              setAmount={setAmount}
            />
          )}
        </>
      ) : (
        <Modal setStatus={setStatus} status={status}>
          <ActionButton
            amount={amount}
            status={status}
            setStatus={setStatus}
            sourceNetwork={sourceNetwork}
            destinationNetwork={destinationNetwork}
            setAmount={setAmount}
          />
        </Modal>
      )}
    </div>
  );
};
