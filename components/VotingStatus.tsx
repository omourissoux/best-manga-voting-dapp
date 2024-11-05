"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface VotingStatusProps {
  isAdmin: boolean;
}

export default function VotingStatus({ isAdmin }: VotingStatusProps) {
  const [isVotingOpen, setIsVotingOpen] = useState(false);
  const { toast } = useToast();

  const handleToggleVoting = async () => {
    try {
      // Implement voting status toggle logic here
      setIsVotingOpen(!isVotingOpen);
      toast({
        title: `Voting ${!isVotingOpen ? "opened" : "closed"}`,
        description: `Voting session has been ${!isVotingOpen ? "opened" : "closed"}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to toggle voting status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Voting Status</h2>
      <div className="flex items-center justify-between">
        <Label htmlFor="voting-status">
          {isVotingOpen ? "Voting is Open" : "Voting is Closed"}
        </Label>
        {isAdmin && (
          <Switch
            id="voting-status"
            checked={isVotingOpen}
            onCheckedChange={handleToggleVoting}
          />
        )}
      </div>
    </div>
  );
}