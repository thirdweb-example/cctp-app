import { useContract, useContractWrite, Web3Button } from "@thirdweb-dev/react";
import { NetworkType } from "../../const/chains";
import styles from "./Amount.module.css";
import { BigNumber } from "ethers";
import { ethers } from "ethers";

type Props = {
  address: string;
  network: NetworkType;
  amount: BigNumber;
};

export const Approve: React.FC<Props> = ({ address, network, amount }) => {
  // initialize contracts
  const { contract: usdcContract } = useContract(network.usdcContract);

  // STEP 1: Approve messenger contract to withdraw from our active eth address
  const {
    mutateAsync: approveMessengerWithdraw,
    isLoading,
    error,
  } = useContractWrite(usdcContract, "approve");
  const approve = async () => {
    console.log("approve");
    approveMessengerWithdraw(
      {
        args: [network.tokenMessengerContract, amount],
      },
      {
        onSuccess: () => {
          console.log("approved!");
        },
        onError: (e) => {
          console.log("error:", e);
        },
      }
    );
  };

  const isDisabled = isLoading || !amount || amount <= ethers.BigNumber.from(0);

  return (
    <Web3Button
      className={styles.button}
      contractAddress={network.usdcContract}
      action={async () => {
        return await approve();
      }}
      isDisabled={isDisabled}
    >
      Approve the Swap
    </Web3Button>
  );
};
