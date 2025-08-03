import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { createContext, useContext, useState, ReactNode } from "react";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import PoliciesPage from "./pages/PoliciesPage";
import ClaimsPage from "./pages/ClaimsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import { WalletProvider as WalletProviderType } from "./types/wallet";

const queryClient = new QueryClient();

// Context para manejar el estado de la wallet
interface WalletContextType {
  isWalletConnected: boolean;
  walletAddress: string;
  walletProvider: WalletProviderType | null;
  walletBalance: string;
  connectWallet: (address: string, provider: WalletProviderType, balance?: string) => void;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletProvider, setWalletProvider] = useState<WalletProviderType | null>(null);
  const [walletBalance, setWalletBalance] = useState("0");

  const connectWallet = (address: string, provider: WalletProviderType, balance = "0") => {
    setIsWalletConnected(true);
    setWalletAddress(address);
    setWalletProvider(provider);
    setWalletBalance(balance);
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress("");
    setWalletProvider(null);
    setWalletBalance("0");
  };

  return (
    <WalletContext.Provider value={{
      isWalletConnected,
      walletAddress,
      walletProvider,
      walletBalance,
      connectWallet,
      disconnectWallet
    }}>
      {children}
    </WalletContext.Provider>
  );
};

const AppContent = () => {
  const { isWalletConnected } = useWallet();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30">
      {/* Solo mostrar navegación si hay wallet conectada Y no estamos en la página principal */}
      {isWalletConnected && !isHomePage && <Navigation />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/policies" element={<PoliciesPage />} />
        <Route path="/claims" element={<ClaimsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <WalletProvider>
          <AppContent />
        </WalletProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
