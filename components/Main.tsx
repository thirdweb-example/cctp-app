import { ThirdwebProvider } from "@thirdweb-dev/react";
import { useMemo, useState } from "react";
import {
  NetworkSlug,
  Networks,
} from "../const/chains";
import { Landing } from "./Landing/Landing";

export type Status = "idle" | "approve" | "deposit" | "swap";

export const Main = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [isTestnet, setIsTestnet] = useState(true);

  const [sourceNetwork, setSourceNetwork] = useState<NetworkSlug>("ethereum");
  const [destinationNetwork, setDestinationNetwork] = useState<NetworkSlug>("avalanche");

  const slugNetwork = useMemo(() => {
    return status === "swap" ? destinationNetwork : sourceNetwork;
  }, [status, destinationNetwork, sourceNetwork]);

  const activeChain = Networks[slugNetwork];

  return (
    <ThirdwebProvider activeChain={activeChain.network}>
      <Landing
        sourceNetwork={sourceNetwork}
        setSourceNetwork={setSourceNetwork}
        destinationNetwork={destinationNetwork}
        setDestinationNetwork={setDestinationNetwork}
        isTestnet={isTestnet}
        status={status}
        setStatus={setStatus}
        setIsTestnet={setIsTestnet} />
    </ThirdwebProvider>
  );
};