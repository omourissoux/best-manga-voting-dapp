"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

interface Proposal {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  voteCount: number;
}

export default function ProposalList() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [voteAmount, setVoteAmount] = useState<string>("");
  const { toast } = useToast();

  const handleVote = async (proposalId: number) => {
    try {
      // Implement voting logic here
      toast({
        title: "Vote submitted!",
        description: `You voted ${voteAmount} tokens for proposal #${proposalId}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit vote",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid gap-6">
      {proposals.map((proposal) => (
        <Card key={proposal.id} className="p-6">
          <div className="grid gap-6 md:grid-cols-[300px_1fr]">
            <AspectRatio ratio={3/4} className="bg-muted rounded-lg overflow-hidden">
              <Image
                src={proposal.imageUrl}
                alt={proposal.name}
                fill
                className="object-cover"
              />
            </AspectRatio>
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold">{proposal.name}</h3>
                <p className="text-muted-foreground">{proposal.description}</p>
              </div>
              <div>
                <p className="font-semibold">Current Votes: {proposal.voteCount}</p>
              </div>
              <div className="flex gap-4">
                <Input
                  type="number"
                  placeholder="Amount of tokens"
                  value={voteAmount}
                  onChange={(e) => setVoteAmount(e.target.value)}
                  className="max-w-[200px]"
                />
                <Button onClick={() => handleVote(proposal.id)}>Vote</Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}