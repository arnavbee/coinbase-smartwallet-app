"use client";
import Image from "next/image";
import { ConnectButton, MediaRenderer, useReadContract } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import { createWallet } from "thirdweb/wallets";
import { defineChain, getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { getNFT } from "thirdweb/extensions/erc1155";

export default function Home() {

  const wallets = [
    createWallet("com.coinbase.wallet", {
      walletConfig: {
        options: "smartWalletOnly",
      },
    })
  ]

  const contract = getContract({
    client: client,
    chain: defineChain(baseSepolia),
    address: "0xAAfeD618E4336216488131103ccbBa8d100647aC"
  });

  const {data: nft, isLoading: nftIsLoading} = useReadContract(
    getNFT, {
      contract: contract,
      tokenId: 0n

    }
  );

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <ConnectButton 
        client={client}
        wallets={wallets}
        chain={defineChain(baseSepolia)}
        connectButton={{
          label:"Connect with Coinbase Smart Wallet"
        }}
        
        />

        <div className="flex flex-col my-8">
          {nftIsLoading ? (
            <p> Loading... </p>
          ) : (
            <>
            {nft && (
              <MediaRenderer
              client={client}
              src={nft.metadata.image}
            )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
