"use client";

import { WagmiConfig, createClient, configureChains } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig client={client}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <Toaster />
      </ThemeProvider>
    </WagmiConfig>
  );
}