import styles from "./Network.module.css";
import Image from "next/image";
import { NetworkType } from "../../pages";
// accept which network from modal
// display info on the network

type Props = {
  network: NetworkType;
};

const Network: React.FC<Props> = ({ network }) => {
  return (
    <div className={styles.container}>
      <Image src={network.src} width={48} height={48} alt="network logo" />
      <h2 className={styles.title}>{network.name}</h2>
    </div>
  );
};

export default Network;
