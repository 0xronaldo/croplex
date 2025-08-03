import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Leaf, 
  Shield, 
  BarChart3, 
  FileText, 
  Settings, 
  Menu, 
  X,
  Wallet,
  Bell,
  Home,
  LogOut,
  Copy,
  ExternalLink
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isWalletConnected, walletAddress, walletProvider, walletBalance, disconnectWallet } = useWallet();
  const { toast } = useToast();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "My Policies", path: "/policies", icon: Shield },
    { name: "Claims", path: "/claims", icon: FileText },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const isActivePage = (path: string) => location.pathname === path;

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Dirección copiada",
      description: "La dirección de la wallet ha sido copiada al portapapeles",
    });
  };

  const handleDisconnect = () => {
    disconnectWallet();
    navigate("/");
    toast({
      title: "Wallet desconectada",
      description: "Tu wallet ha sido desconectada exitosamente",
    });
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border/40 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate("/")}
          >
            <div className="p-2 bg-gradient-to-br from-agriculture to-agriculture-dark rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-agriculture to-agriculture-dark bg-clip-text text-transparent">
                CropLex
              </h1>
              <p className="text-xs text-muted-foreground">Agro Insurance</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  variant={isActivePage(item.path) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => navigate(item.path)}
                  className={`${
                    isActivePage(item.path)
                      ? "bg-gradient-to-r from-agriculture to-agriculture-dark text-white"
                      : "text-muted-foreground hover:text-foreground"
                  } transition-all duration-200`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Button>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500">
                3
              </Badge>
            </Button>

            {/* Wallet Connected Display */}
            {isWalletConnected && walletProvider ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                    <span className="text-lg">{walletProvider.icon}</span>
                    <div className="flex flex-col items-start">
                      <span className="text-xs font-medium">{walletProvider.name}</span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {formatAddress(walletAddress)}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <div className="p-3 border-b">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{walletProvider.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{walletProvider.name}</p>
                        <p className="text-xs text-muted-foreground">Conectada</p>
                      </div>
                    </div>
                    <p className="text-xs font-mono bg-muted p-2 rounded">
                      {walletAddress}
                    </p>
                    {walletBalance && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Balance: {walletBalance} ETH
                      </p>
                    )}
                  </div>
                  
                  <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar dirección
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem 
                    onClick={() => window.open(`https://etherscan.io/address/${walletAddress}`, '_blank')}
                    className="cursor-pointer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver en Etherscan
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={handleDisconnect} className="cursor-pointer text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Desconectar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden sm:flex"
                onClick={() => navigate("/")}
              >
                <Wallet className="h-4 w-4 mr-2" />
                Conectar Wallet
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/40 animate-fade-in">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant={isActivePage(item.path) ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full justify-start ${
                      isActivePage(item.path)
                        ? "bg-gradient-to-r from-agriculture to-agriculture-dark text-white"
                        : ""
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
