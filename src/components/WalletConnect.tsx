import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Shield, Leaf, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/contexts/WalletContext";

interface WalletConnectProps {
  onWalletConnected?: (address: string) => void;
}

const WalletConnect = ({ onWalletConnected }: WalletConnectProps) => {
  const { isWalletConnected, walletAddress, connectWallet } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    
    // Simulate wallet connection delay for smooth animation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockAddress = "0x" + Math.random().toString(16).substr(2, 8) + "..." + Math.random().toString(16).substr(2, 4);
    connectWallet(mockAddress);
    setIsConnecting(false);
    
    toast({
      title: "Wallet Connected!",
      description: "Successfully connected to your Web3 wallet.",
    });
    
    onWalletConnected?.(mockAddress);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-accent/20 border-primary/20 shadow-[var(--shadow-card)] animate-float">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full transition-all duration-500 ${
          isConnecting ? 'bg-primary/20 animate-pulse' : 
          isWalletConnected ? 'bg-agriculture/20' : 'bg-primary/10'
        }`}>
          {isWalletConnected ? (
            <CheckCircle className="h-6 w-6 text-agriculture animate-scale-in" />
          ) : (
            <Wallet className={`h-6 w-6 transition-colors duration-300 ${
              isConnecting ? 'text-primary animate-pulse' : 'text-primary'
            }`} />
          )}
        </div>
        
        <div className="flex-1">
          {isWalletConnected ? (
            <div className="animate-fade-in">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">Connected Wallet</p>
                <div className="w-2 h-2 bg-agriculture rounded-full animate-pulse"></div>
              </div>
              <p className="font-semibold text-foreground font-mono">{walletAddress}</p>
            </div>
          ) : (
            <div>
              <p className="font-semibold text-foreground">Connect Your Wallet</p>
              <p className="text-sm text-muted-foreground">
                {isConnecting ? "Connecting to Web3..." : "Access agricultural insurance data"}
              </p>
            </div>
          )}
        </div>
        
        {!isWalletConnected && (
          <Button 
            onClick={handleConnectWallet}
            disabled={isConnecting}
            className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-primary)] transition-all duration-300 disabled:opacity-70"
          >
            {isConnecting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Connecting...
              </div>
            ) : (
              "Connect"
            )}
          </Button>
        )}
        
        {isWalletConnected && (
          <div className="flex gap-2 animate-fade-in">
            <div className="p-2 bg-agriculture-light/20 rounded-full animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <Shield className="h-4 w-4 text-agriculture" />
            </div>
            <div className="p-2 bg-agriculture/20 rounded-full animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <Leaf className="h-4 w-4 text-agriculture-dark" />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default WalletConnect;