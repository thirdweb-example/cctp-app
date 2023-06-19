import styles from "./Toggle.module.css";
import { Dispatch, SetStateAction } from "react";
// toggle testnet/mainnet on/off

type Props = {
  isTestnet: boolean;
  setTestnetAsNetwork: Dispatch<SetStateAction<boolean>>;
};

const Toggle: React.FC<Props> = ({ setTestnetAsNetwork, isTestnet }) => {
  const setNetworkType = () => {
    setTestnetAsNetwork((prevValue) => !prevValue);
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mainnet</h2>
      <label className={styles.switch}>
        <input
          type="checkbox"
          id="networkType"
          checked={!isTestnet}
          onChange={setNetworkType}
        />
        <span className={styles.slider}></span>
      </label>
      <h2 className={styles.title}>Testnet</h2>
    </div>
  );
};

export default Toggle;
