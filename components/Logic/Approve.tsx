import { useContract, useContractWrite, Web3Button } from "@thirdweb-dev/react";
import { NetworkType } from "../../const/chains";
import styles from "./Approve.module.css";
import { utils } from "ethers";

interface ApproveProps {
  contractAddress: string;
  tokenMessengerContract: string;
  amount: number;
};

export const Approve: React.FC<ApproveProps> = ({ contractAddress, tokenMessengerContract, amount }) => {
  const isDisabled = !amount || amount <= 0;

  return (
    <Web3Button
      className={styles.button}
      contractAddress={contractAddress}
      action={(contract) =>
        contract.call("approve", [
          tokenMessengerContract,
          utils.parseUnits(amount.toString(), 6),
        ])
      }
      isDisabled={isDisabled}
    >
      Approve the Swap
    </Web3Button>
  );
};