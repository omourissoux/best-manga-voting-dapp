"use client";

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { ScrollArea } from '@radix-ui/react-scroll-area';
import AddProposalDialog from './AddProposalDialog';
import ProposalList from './ProposalList';
import { Card } from './ui/card';
import VotingStatus from './VotingStatus';
import { useState } from 'react';

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const [isAdmin, setIsAdmin] = useState(true);
    
  return (
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
  )
}