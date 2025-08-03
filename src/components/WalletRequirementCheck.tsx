import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, AlertTriangle, Download, CheckCircle } from "lucide-react";
import { SUPPORTED_WALLETS } from "@/types/wallet";

interface WalletRequirementCheckProps {
  hasAnyWallet: boolean;
  onContinue?: () => void;
}

const WalletRequirementCheck = ({ hasAnyWallet, onContinue }: WalletRequirementCheckProps) => {
  const installUrls: Record<string, string> = {
    metamask: 'https://metamask.io/download/',
    rabby: 'https://rabby.io/',
    coinbase: 'https://www.coinbase.com/wallet',
    trust: 'https://trustwallet.com/',
    phantom: 'https://phantom.app/'
  };

  const recommendedWallets = SUPPORTED_WALLETS.filter(wallet => 
    wallet.id !== 'walletconnect' && installUrls[wallet.id]
  );

  if (hasAnyWallet) {
    return (
      <Card className="border-agriculture/20 bg-gradient-to-br from-agriculture/5 to-agriculture/10">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-agriculture/20 rounded-full">
              <CheckCircle className="h-6 w-6 text-agriculture" />
            </div>
            <div>
              <h3 className="font-semibold text-agriculture">Wallet Detectada ✓</h3>
              <p className="text-sm text-muted-foreground">
                Tienes wallets instaladas. Puedes continuar con la conexión.
              </p>
            </div>
          </div>
          {onContinue && (
            <Button 
              onClick={onContinue}
              className="w-full mt-4 bg-agriculture hover:bg-agriculture-dark"
            >
              Continuar con la Conexión
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <AlertTriangle className="h-5 w-5" />
          Wallet Requerida
        </CardTitle>
        <CardDescription className="text-orange-700">
          Para acceder a CropLex necesitas tener al menos una wallet de criptomonedas instalada en tu navegador.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Requisito Mínimo:</strong> Instala una wallet compatible para usar todos los servicios de CropLex.
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          <h4 className="font-medium text-orange-800">Wallets Recomendadas:</h4>
          
          {recommendedWallets.map((wallet) => (
            <Card key={wallet.id} className="border-orange-100 hover:border-orange-200 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{wallet.icon}</span>
                    <div>
                      <h5 className="font-medium text-orange-900">{wallet.name}</h5>
                      <p className="text-sm text-orange-600">
                        {wallet.id === 'metamask' && 'La wallet más popular para DeFi'}
                        {wallet.id === 'rabby' && 'Optimizada para DeFi y multi-chain'}
                        {wallet.id === 'coinbase' && 'Fácil de usar para principiantes'}
                        {wallet.id === 'trust' && 'Wallet móvil y de escritorio'}
                        {wallet.id === 'phantom' && 'Multi-chain con soporte Ethereum'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {wallet.id === 'metamask' && (
                      <Badge variant="secondary" className="bg-agriculture/20 text-agriculture">
                        Recomendada
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-orange-300 hover:bg-orange-100"
                      onClick={() => window.open(installUrls[wallet.id], '_blank')}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Instalar
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-2">
          <h5 className="font-medium text-orange-800 text-sm">¿Por qué necesito una wallet?</h5>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• <strong>Seguridad:</strong> Tus claves privadas permanecen bajo tu control</li>
            <li>• <strong>Descentralización:</strong> Acceso directo a blockchain sin intermediarios</li>
            <li>• <strong>Transparencia:</strong> Todas las transacciones son verificables</li>
            <li>• <strong>Interoperabilidad:</strong> Compatible con todo el ecosistema DeFi</li>
          </ul>
        </div>

        <Alert className="border-blue-200 bg-blue-50">
          <AlertDescription className="text-blue-800">
            <strong>Después de instalar:</strong> Recarga esta página para detectar tu nueva wallet automáticamente.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default WalletRequirementCheck;
