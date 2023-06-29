import { useContract, useContractWrite, Web3Button } from "@thirdweb-dev/react";
import { NetworkType } from "../../const/chains";
import styles from "./Approve.module.css";
import { utils } from "ethers";

interface ApproveProps {
  contractAddress: string;
  tokenMessengerContract: string;
  amount: string;
};

export const Approve: React.FC<ApproveProps> = ({ contractAddress, tokenMessengerContract, amount }) => {
  const isDisabled = !amount || Number(amount) <= 0;

  return (
    <Web3Button
      className="connect-wallet"
      contractAddress={contractAddress}
      action={(contract) =>
        contract.call("approve", [
          tokenMessengerContract,
          utils.parseUnits(amount, 6),
        ])
      }
      isDisabled={isDisabled}
    >
      Approve the Swap
    </Web3Button>
  );
};
