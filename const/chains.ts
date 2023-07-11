import {
    Goerli,
    Avalanche,
    AvalancheFuji,
    Ethereum,
    Chain,
    ArbitrumGoerli,
    Arbitrum,
} from "@thirdweb-dev/chains";

export type NetworkType = {
    name: string;
    network: Chain;
    src: string;
    domain: number;
    tokenMessengerContract: string;
    messageTransmitterContract: string;
    usdcContract: string;
    tokenMinterContract: string;
    api: string;
};

export const GoerliTestnet: NetworkType = {
    name: Goerli.name,
    network: Goerli,
    src: Goerli.icon.url,
    domain: 0,
    tokenMessengerContract: "0xd0c3da58f55358142b8d3e06c1c30c5c6114efe8",
    messageTransmitterContract: "0x0a2d7f7e0b6b3e4b0b0b9e2d6f7e0b6b3e4b0b0b",
    usdcContract: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    tokenMinterContract: "0xca6b4c00831ffb77afe22e734a6101b268b7fcbe",
    api: "https://iris-api-sandbox.circle.com/attestations",
};

export const AvalancheFujiTestnet: NetworkType = {
    name: AvalancheFuji.name,
    network: AvalancheFuji,
    src: AvalancheFuji.icon.url,
    domain: 1,
    tokenMessengerContract: "0xeb08f243e5d3fcff26a9e38ae5520a669f4019d0",
    messageTransmitterContract: "0xa9fb1b3009dcb79e2fe346c16a604b8fa8ae0a79",
    usdcContract: "0x5425890298aed601595a70AB815c96711a31Bc65",
    tokenMinterContract: "0x4ed8867f9947a5fe140c9dc1c6f207f3489f501e",
    api: "https://iris-api-sandbox.circle.com/attestations",
};

export const ArbitrumTestnet: NetworkType = {
    name: ArbitrumGoerli.name,
    network: ArbitrumGoerli,
    src: ArbitrumGoerli.icon.url,
    domain: 3,
    tokenMessengerContract: "0x12dcfd3fe2e9eac2859fd1ed86d2ab8c5a2f9352",
    messageTransmitterContract: "0x109bc137cb64eab7c0b1dddd1edf341467dc2d35",
    usdcContract: "0xfd064A18f3BF249cf1f87FC203E90D8f650f2d63",
    tokenMinterContract: "0xe997d7d2f6e065a9a93fa2175e878fb9081f1f0a",
    api: "https://iris-api-sandbox.circle.com/attestations",
};

export const Networks: Record<string, NetworkType> = {
    [Goerli.slug]: GoerliTestnet,
    [AvalancheFuji.slug]: AvalancheFujiTestnet,
    [ArbitrumGoerli.slug]: ArbitrumTestnet,
};

export const NetworkList: NetworkType[] = Object.values(Networks);

export type NetworkSlug = "goerli" | "avalanche-fuji" | "arbitrum-goerli";