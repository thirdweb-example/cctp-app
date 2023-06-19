import { useTokenBalance, useContract, useAddress } from "@thirdweb-dev/react";
import { NetworkType } from "../../const/chains";
import styles from "./Balance.module.css";
import { Dispatch, SetStateAction, ChangeEvent } from "react";
import Image from "next/image";

type Props = {
  network: NetworkType;
  setAmount: Dispatch<SetStateAction<number>>;
  amount: number;
};
export const Balance: React.FC<Props> = ({ network, setAmount, amount }) => {
  const { contract: usdcContract } = useContract(network.usdcContract);
  const address = useAddress();
  const {
    data: balance,
    isLoading,
    error,
  } = useTokenBalance(usdcContract, address);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.valueAsNumber);
  };
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="number"
        value={amount}
        onChange={handleInputChange}
      />
      <div className={styles.balanceContainer}>
        <Image src={"/usdc.png"} width={25} height={25} alt="network logo" />
        <p className={styles.balance}>{balance?.value.toString()}</p>
      </div>
    </div>
  );
};
