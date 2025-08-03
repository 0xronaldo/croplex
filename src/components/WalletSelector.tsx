import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Wallet, CheckCircle, AlertCircle, ExternalLink, Wifi, WifiOff, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useWalletDetection } from "@/hooks/useWalletDetection";
import { WalletProvider } from "@/types/wallet";
import { useToast } from "@/hooks/use-toast";
import WalletRequirementCheck from "./WalletRequirementCheck";

interface WalletSelectorProps {
  onWalletConnected?: (address: string, provider: WalletProvider) => void;
  onWalletDisconnected?: () => void;
}

const WalletSelector = ({ onWalletConnected, onWalletDisconnected }: WalletSelectorProps) => {
  const {
    detectedWallets,
    isLoading,
    selectedWallet,
    connectedWallet,
    error,
    hasAnyWallet,
    connectToWallet,
    disconnectWallet,
    formatAddress,
    isConnected
  } = useWalletDetection();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  const { toast } = useToast();

  const handleWalletSelect = async (wallet: WalletProvider) => {
    // Verificar requisitos antes de cualquier acción
    if (!hasAnyWallet && wallet.id === 'walletconnect') {
      setShowRequirements(true);
      toast({
        title: "Wallet Requerida",
        description: "Necesitas instalar al menos una wallet para usar CropLex",
        variant: "destructive"
      });
      return;
    }

    if (!wallet.detected && wallet.id !== 'walletconnect') {
      // Abrir página de instalación
      const installUrls: Record<string, string> = {
        metamask: 'https://metamask.io/download/',
        rabby: 'https://rabby.io/',
        coinbase: 'https://www.coinbase.com/wallet',
        trust: 'https://trustwallet.com/',
        phantom: 'https://phantom.app/'
      };

      if (installUrls[wallet.id]) {
        window.open(installUrls[wallet.id], '_blank');
      }
      return;
    }

    setIsConnecting(true);
    
    try {
      const success = await connectToWallet(wallet);
      
      if (success && connectedWallet) {
        setIsDialogOpen(false);
        setShowRequirements(false);
        toast({
          title: "¡Wallet Conectada!",
          description: `Conectado exitosamente a ${wallet.name}`,
        });
        onWalletConnected?.(connectedWallet.address, wallet);
      }
    } catch (err) {
      toast({
        title: "Error de Conexión",
        description: `No se pudo conectar a ${wallet.name}`,
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    await disconnectWallet();
    setIsDialogOpen(false);
    toast({
      title: "Wallet Desconectada",
      description: "Tu wallet ha sido desconectada exitosamente",
    });
    onWalletDisconnected?.();
  };

  if (isConnected && connectedWallet) {
    return (
      <Card className="p-6 bg-gradient-to-br from-card to-accent/20 border-primary/20 shadow-[var(--shadow-card)] animate-float">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-agriculture/20 animate-scale-in">
            <CheckCircle className="h-6 w-6 text-agriculture" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{connectedWallet.provider.icon}</span>
              <p className="font-semibold text-foreground">{connectedWallet.provider.name}</p>
              <div className="w-2 h-2 bg-agriculture rounded-full animate-pulse"></div>
            </div>
            <p className="text-sm text-muted-foreground">
              {formatAddress(connectedWallet.address)}
            </p>
            {connectedWallet.balance && (
              <p className="text-xs text-muted-foreground">
                Balance: {connectedWallet.balance} ETH
              </p>
            )}
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDisconnect}
            className="hover:bg-destructive hover:text-destructive-foreground"
          >
            Desconectar
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Card className="p-6 bg-gradient-to-br from-card to-accent/20 border-primary/20 shadow-[var(--shadow-card)] animate-float cursor-pointer hover:scale-105 transition-transform">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Conectar Wallet</p>
              <p className="text-sm text-muted-foreground">
                Selecciona tu wallet para acceder a CropLex
              </p>
            </div>
            <Button className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-primary)]">
              Conectar
            </Button>
          </div>
        </Card>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Conectar Wallet
          </DialogTitle>
          <DialogDescription>
            Selecciona una wallet para conectarte a CropLex. Las wallets detectadas aparecen marcadas.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Verificación de Requisitos */}
          {!isLoading && (!hasAnyWallet || showRequirements) && (
            <div className="space-y-4">
              <WalletRequirementCheck 
                hasAnyWallet={hasAnyWallet}
                onContinue={() => setShowRequirements(false)}
              />
              
              {!hasAnyWallet && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Acceso Restringido:</strong> Instala una wallet para continuar con CropLex.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Mostrar wallets solo si cumple requisitos */}
          {!isLoading && hasAnyWallet && !showRequirements && (
            <>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {error.message}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                {detectedWallets.map((wallet) => (
                  <Card 
                    key={wallet.id}
                    className={`cursor-pointer transition-all duration-200 hover:scale-102 ${
                      wallet.detected 
                        ? 'hover:bg-accent border-primary/20' 
                        : 'opacity-60 hover:opacity-80'
                    } ${
                      selectedWallet?.id === wallet.id && isConnecting
                        ? 'border-primary bg-primary/5'
                        : ''
                    }`}
                    onClick={() => handleWalletSelect(wallet)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{wallet.icon}</div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{wallet.name}</span>
                            {wallet.detected ? (
                              <Badge variant="default" className="text-xs bg-agriculture/20 text-agriculture">
                                <Wifi className="h-3 w-3 mr-1" />
                                Detectada
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">
                                <WifiOff className="h-3 w-3 mr-1" />
                                No instalada
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {wallet.detected 
                              ? 'Haz clic para conectar'
                              : 'Haz clic para instalar'
                            }
                          </p>
                        </div>

                        {selectedWallet?.id === wallet.id && isConnecting ? (
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        ) : wallet.detected ? (
                          <CheckCircle className="h-4 w-4 text-agriculture" />
                        ) : (
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2 text-sm text-muted-foreground">
                Detectando wallets...
              </span>
            </div>
          )}

          {/* Footer info */}
          {!isLoading && hasAnyWallet && !showRequirements && (
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground text-center">
                Al conectar tu wallet, aceptas los términos de servicio de CropLex
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletSelector;
