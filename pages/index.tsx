import type { NextPage } from "next";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { useMemo, useState } from "react";
import {
  NetworkSlug,
  Networks,
} from "../const/chains";
import { Container } from "../components/Container/Container";
import { Nav } from "../components/nav";
import { Status } from "../const/types";

const Home: NextPage = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [isTestnet, setIsTestnet] = useState(true);

  const [sourceNetwork, setSourceNetwork] = useState<NetworkSlug>("goerli");
  const [destinationNetwork, setDestinationNetwork] = useState<NetworkSlug>("avalanche-fuji");

  const slugNetwork = useMemo(() => {

    return status === "swap" ? destinationNetwork : sourceNetwork;
  }, [status, destinationNetwork, sourceNetwork]);

  const activeChain = Networks[slugNetwork];

  return (
    <ThirdwebProvider activeChain={activeChain.network}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="mx-auto max-w-3xl">
          <Nav />
          <main className="">
          <Container
            sourceNetwork={sourceNetwork}
            setSourceNetwork={setSourceNetwork}
            destinationNetwork={destinationNetwork}
            setDestinationNetwork={setDestinationNetwork}
            isTestnet={isTestnet}
            setIsTestnet={setIsTestnet}
            status={status}
            setStatus={setStatus}
          />
          </main>
        </div>
      </div>
    </ThirdwebProvider>
  );
};


export default Home;
