"use client";

import { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen } from "lucide-react";
import ProposalList from "@/components/ProposalList";
import AddProposalDialog from "@/components/AddProposalDialog";
import VotingStatus from "@/components/VotingStatus";
import ConnectWallet from "@/components/ConnectWallet";

export default function Home() {
  const { isConnected } = useAccount();
  const [isAdmin, setIsAdmin] = useState(false);

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

        {isConnected ? (
          <>
            <div className="grid gap-6 md:grid-cols-[300px_1fr]">
              <div className="space-y-6">
                <Card className="p-4">
                  <VotingStatus isAdmin={isAdmin} />
                </Card>
                {isAdmin && (
                  <Card className="p-4">
                    <AddProposalDialog />
                  </Card>
                )}
              </div>
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <ProposalList />
              </ScrollArea>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">
              Connect your wallet to participate in voting
            </h2>
            <p className="text-muted-foreground mb-8">
              Use your tokens to vote for your favorite manga series
            </p>
          </div>
        )}
      </div>
    </main>
  );
}