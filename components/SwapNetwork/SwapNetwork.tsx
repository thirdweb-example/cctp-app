import styles from "./SwapNetwork.module.css";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { NetworkSlug } from "../../const/chains";

interface SwapNetworkProps {
  sourceNetwork: NetworkSlug;
  setSourceNetwork: Dispatch<SetStateAction<NetworkSlug>>;
  destinationNetwork: NetworkSlug;
  setDestinationNetwork: Dispatch<SetStateAction<NetworkSlug>>;
};

export const SwapNetwork: React.FC<SwapNetworkProps> = ({
  sourceNetwork,
  setSourceNetwork,
  destinationNetwork,
  setDestinationNetwork
}) => {
  const swapNetwork = () => {
    setDestinationNetwork(sourceNetwork);
    setSourceNetwork(destinationNetwork);
  };

  return (
    <div className={styles.swap} onClick={swapNetwork}>
      <Image src="/arrow.png" width={24} height={24} alt="switch network" />
    </div>
  );
};

