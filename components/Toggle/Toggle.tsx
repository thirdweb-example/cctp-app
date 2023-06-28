import styles from "./Toggle.module.css";
import { Dispatch, SetStateAction } from "react";

interface ToggleProps {
  isTestnet: boolean;
  setIsTestnet: Dispatch<SetStateAction<boolean>>;
};

export const Toggle: React.FC<ToggleProps> = ({ setIsTestnet, isTestnet }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Testnet</h2>
      <label className={styles.switch}>
        <input
          type="checkbox"
          id="networkType"
          checked={!isTestnet}
          onChange={() => setIsTestnet((prevValue) => !prevValue)}
        />
        <span className={styles.slider} />
      </label>
      <h2 className={styles.title}>Mainnet</h2>
    </div>
  );
};
