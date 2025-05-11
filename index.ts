// you should already have a client set up (prerequisite)
import { client } from "./utils";
import { uploadJSONToIPFS } from "./uploadToIpfs";
import { createHash } from "crypto";

async function main() {
  const ipMetadata = {
    title: "Ippy",
    description: "Official mascot of Story.",
    image:
      "https://ipfs.io/ipfs/QmSamy4zqP91X42k6wS7kLJQVzuYJuW2EN94couPaq82A8",
    imageHash:
      "0x21937ba9d821cb0306c7f1a1a2cc5a257509f228ea6abccc9af1a67dd754af6e",
    mediaUrl:
      "https://ipfs.io/ipfs/QmSamy4zqP91X42k6wS7kLJQVzuYJuW2EN94couPaq82A8",
    mediaHash:
      "0x21937ba9d821cb0306c7f1a1a2cc5a257509f228ea6abccc9af1a67dd754af6e",
    mediaType: "image/png",
    creators: [
      {
        name: "Story Foundation",
        address: "0x67ee74EE04A0E6d14Ca6C27428B27F3EFd5CD084",
        description: "The World's IP Blockchain",
        contributionPercent: 100,
        socialMedia: [
          {
            platform: "Twitter",
            url: "https://twitter.com/storyprotocol",
          },
          {
            platform: "Website",
            url: "https://story.foundation",
          },
        ],
      },
    ],
  };
const nftMetadata = {
  name: "Ownership NFT",
  description: "This is an NFT representing owernship of our IP Asset.",
  image: "https://picsum.photos/200",
};
const ipIpfsHash = await uploadJSONToIPFS(ipMetadata);
const ipHash = createHash("sha256")
  .update(JSON.stringify(ipMetadata))
  .digest("hex");

const nftIpfsHash = await uploadJSONToIPFS(nftMetadata);
const nftHash = createHash("sha256")
  .update(JSON.stringify(nftMetadata))
  .digest("hex");
}
const response = await client.ipAsset.mintAndRegisterIp({
  spgNftContract: "0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc",
  ipMetadata: {
    ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
    ipMetadataHash: `0x${ipHash}`,
    nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
    nftMetadataHash: `0x${nftHash}`,
  },
  txOptions: { waitForTransaction: true },
});

console.log(
  `Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId}`
);
console.log(
  `View on the explorer: https://aeneid.explorer.story.foundation/ipa/${response.ipId}`
);
main();