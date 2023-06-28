import { useTokenBalance, useContract, useAddress } from "@thirdweb-dev/react";
import { NetworkType } from "../../const/chains";
import styles from "./Balance.module.css";
import { Dispatch, SetStateAction, ChangeEvent } from "react";
import Image from "next/image";
import { BigNumber, ethers } from "ethers";

type Props = {
  network: NetworkType;
  setAmount: Dispatch<SetStateAction<BigNumber>>;
  amount: BigNumber;
};
export const Balance: React.FC<Props> = ({ network, setAmount, amount }) => {
  const { contract: usdcContract } = useContract(network.usdcContract);
  const address = useAddress();
  const { data: balance, isLoading } = useTokenBalance(usdcContract, address);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.valueAsNumber && event.target.valueAsNumber > 0) {
      const parsedEther = ethers.utils.parseUnits(
        event.target.valueAsNumber.toString(),
        6
      );
      setAmount(parsedEther);
      console.log(ethers.BigNumber.from(amount).toString());
    }
  };
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="number"
        onChange={handleInputChange}
      />
      <div className={styles.balanceContainer}>
        <Image src={"/usdc.png"} width={25} height={25} alt="network logo" />
        {isLoading ? (
          <p className={styles.balance}>loading...</p>
        ) : (
          <p className={styles.balance}>
            {ethers.utils.formatUnits(balance?.value || 0, 6)} USDC
          </p>
        )}
      </div>
    </div>
  );
};
