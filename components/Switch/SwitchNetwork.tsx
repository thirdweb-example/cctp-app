import styles from "./SwitchNetwork.module.css";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
// keep track of the current netowrk
// on click switch eth <-> avax

type Props = {
  setEthereumAsNetwork: Dispatch<SetStateAction<boolean>>;
};

const SwitchNetwork: React.FC<Props> = ({ setEthereumAsNetwork }) => {
  const setNetwork = () => {
    setEthereumAsNetwork((prevValue) => !prevValue);
  };
  return (
    <div className={styles.switch} onClick={() => setNetwork()}>
      <Image src="/arrow.png" width={24} height={24} alt="switch network" />
    </div>
  );
};

export default SwitchNetwork;
