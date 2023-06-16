import { useContract, useContractWrite, Web3Button } from "@thirdweb-dev/react";
import { NetworkType } from "../../pages/_app";
import styles from "./Amount.module.css";

type Props = {
  address: string;
  network: NetworkType;
};

export const Approve: React.FC<Props> = ({ address, network }) => {
  // initialize contracts
  const { contract: usdcContract } = useContract(network.usdcContract);

  // STEP 1: Approve messenger contract to withdraw from our active eth address
  const {
    mutateAsync: approveMessengerWithdraw,
    isLoading,
    error,
  } = useContractWrite(usdcContract, "approve");
  const approve = async () => {
    approveMessengerWithdraw({
      args: [[address], [address]],
    });
  };
  console.log(approveMessengerWithdraw, "approveMessengerWithdraw data");
  return (
    <Web3Button
      className={styles.button}
      contractAddress={network.usdcContract}
      action={() => {
        approve;
      }}
    >
      Approve the Swap
    </Web3Button>
  );
};
