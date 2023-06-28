/* eslint-disable @next/next/no-img-element */
import styles from "./NetworkDropdown.module.css";
import Image from "next/image";
import { NetworkSlug, NetworkType, Networks } from "../../const/chains";
import { Dispatch, SetStateAction } from "react";


interface NetworkDropdown {
  network: NetworkSlug;
  setNetwork: Dispatch<SetStateAction<NetworkSlug>>;
  forbiddenNetwork: NetworkSlug;
  isTestnet: boolean;
};

export const NetworkDropdown: React.FC<NetworkDropdown> = ({ network, setNetwork, forbiddenNetwork, isTestnet }) => {
  const fullNetwork = Networks[network];

  return (
    <div className={styles.container}>
      <img src={fullNetwork.src} width={48} height={48} alt="network logo" />
      <h2 className={styles.title}>{fullNetwork.name}</h2>
    </div>
  );
};
