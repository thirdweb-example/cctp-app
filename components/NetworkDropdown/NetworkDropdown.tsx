import styles from "./NetworkDropdown.module.css";
import { Mainnets, NetworkSlug, NetworkType, Networks, Testnets } from "../../const/chains";
import { Dispatch, SetStateAction } from "react";
import { MediaRenderer } from "@thirdweb-dev/react";


interface NetworkDropdown {
  network: NetworkSlug;
  setNetwork: Dispatch<SetStateAction<NetworkSlug>>;
  forbiddenNetwork: NetworkSlug;
  isTestnet: boolean;
};

export const NetworkDropdown: React.FC<NetworkDropdown> = ({ network, setNetwork, forbiddenNetwork, isTestnet }) => {
  const fullNetwork = Networks[network];

  const allNetworks = isTestnet ? Testnets : Mainnets;

  return (
    <div className={styles.container}>
      <MediaRenderer src={fullNetwork.src} width="48px" height="48px" />
      <select value={fullNetwork.network.slug} onChange={(e) => setNetwork(e.target.value as NetworkSlug)} >
        {allNetworks.map(({ network: ntwr }) => (
          <option key={ntwr.slug} value={ntwr.slug} disabled={ntwr.slug === forbiddenNetwork}>
            {ntwr.name}
          </option>
        ))}
      </select>
    </div>
  );
};
