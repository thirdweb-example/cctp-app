import { useContract, useContractWrite, Web3Button } from "@thirdweb-dev/react";
import { NetworkType } from "../../const/chains";
import styles from "./Amount.module.css";

type Props = {
  address: string;
  network: NetworkType;
  amount: number;
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
          console.log("success");
        },
        onError: (e) => {
          console.log("error", e);
        },
      }
    );
  };
  const disabled = () => {
    return isLoading || !amount || amount <= 0;
  };

  return (
    <Web3Button
      className={styles.button}
      contractAddress={network.usdcContract}
      action={() => {
        return approve();
      }}
      isDisabled={disabled()}
    >
      Approve the Swap
    </Web3Button>
  );
};
