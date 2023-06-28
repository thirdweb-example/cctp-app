import styles from "./Container.module.css";
import { Amount } from "../Amount/Amount";
import { NetworkDropdown } from "../NetworkDropdown/NetworkDropdown";
import { SwapNetwork } from "../SwapNetwork/SwapNetwork";
import { NetworkSlug, NetworkType } from "../../const/chains";
import { Dispatch, SetStateAction } from "react";
import { Toggle } from "../Toggle/Toggle";

// need to create the container for the components
// ned a web3button to perform the swap
// keep track of all data

interface ContainerProps {
  sourceNetwork: NetworkSlug;
  setSourceNetwork: Dispatch<SetStateAction<NetworkSlug>>;
  destinationNetwork: NetworkSlug;
  setDestinationNetwork: Dispatch<SetStateAction<NetworkSlug>>;
  isTestnet: boolean;
  setIsTestnet: Dispatch<SetStateAction<boolean>>;
};

export const Container: React.FC<ContainerProps> = ({
  sourceNetwork,
  setSourceNetwork,
  destinationNetwork,
  setDestinationNetwork,
  isTestnet,
  setIsTestnet,
}) => {
  return (
    <div className={styles.container}>
      <NetworkDropdown network={sourceNetwork} setNetwork={setSourceNetwork} forbiddenNetwork={destinationNetwork} isTestnet={isTestnet} />
      <SwapNetwork sourceNetwork={sourceNetwork} setSourceNetwork={setSourceNetwork} destinationNetwork={destinationNetwork} setDestinationNetwork={setDestinationNetwork} />
      <NetworkDropdown network={destinationNetwork} setNetwork={setDestinationNetwork} forbiddenNetwork={sourceNetwork} isTestnet={isTestnet} />
      {/*       <Amount
        network={network}
        destinationNetwork={destinationNetwork}
        setIsEthereum={setIsEthereum}
      /> */}
      <Toggle
        isTestnet={isTestnet}
        setIsTestnet={setIsTestnet}
      />
    </div>
  );
};


