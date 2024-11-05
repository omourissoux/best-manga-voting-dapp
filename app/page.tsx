"use client";

import { useAccount } from "wagmi";
import { BookOpen } from "lucide-react";
import { Account } from "@/components/Account";
import { WalletOptions } from "@/components/Wallet-options";

function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <WalletOptions />
}

export default function Home() {

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-primary">Manga Voting</h1>
          </div>
          <ConnectWallet />
        </div>
      </div>
    </main>
  );
}