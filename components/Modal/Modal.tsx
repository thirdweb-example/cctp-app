import styles from "./Modal.module.css";
import Amount from "../Amount/Amount";
import Network from "../Network/Network";
import SwitchNetwork from "../Switch/SwitchNetwork";
import { NetworkType } from "../../const/chains";
import { Dispatch, SetStateAction } from "react";
import { Balance } from "../Balance/Balance";

// need to create the container for the components
// ned a web3button to perform the swap
// keep track of all data

type Props = {
  network: NetworkType;
  destinationNetwork: NetworkType;
  setEthereumAsNetwork: Dispatch<SetStateAction<boolean>>;
};

const Modal: React.FC<Props> = ({
  network,
  destinationNetwork,
  setEthereumAsNetwork,
}) => {
  return (
    <div className={styles.container}>
      <Network network={network} />
      <SwitchNetwork setEthereumAsNetwork={setEthereumAsNetwork} />
      <Network network={destinationNetwork} />
      <Amount
        network={network}
        destinationNetwork={destinationNetwork}
        setEthereumAsNetwork={setEthereumAsNetwork}
      />
    </div>
  );
};

export default Modal;
