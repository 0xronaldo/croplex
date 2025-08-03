import { useState, useEffect } from 'react';
import { WalletProvider, SUPPORTED_WALLETS, ConnectedWallet, WalletError } from '@/types/wallet';

export const useWalletDetection = () => {
  const [detectedWallets, setDetectedWallets] = useState<WalletProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWallet, setSelectedWallet] = useState<WalletProvider | null>(null);
  const [connectedWallet, setConnectedWallet] = useState<ConnectedWallet | null>(null);
  const [error, setError] = useState<WalletError | null>(null);
  const [hasAnyWallet, setHasAnyWallet] = useState(false);

  // Verificar si hay al menos una wallet instalada
  const checkMinimumWalletRequirement = (wallets: WalletProvider[]): boolean => {
    return wallets.some(wallet => wallet.detected && wallet.id !== 'walletconnect');
  };

  // Detectar wallets instaladas
  const detectWallets = (): WalletProvider[] => {
    const detected: WalletProvider[] = [];

    SUPPORTED_WALLETS.forEach(wallet => {
      let isDetected = false;

      try {
        switch (wallet.id) {
          case 'metamask':
            isDetected = !!(window.ethereum?.isMetaMask);
            break;
          case 'rabby':
            isDetected = !!(window.ethereum?.isRabby);
            break;
          case 'coinbase':
            isDetected = !!(window.ethereum?.isCoinbaseWallet);
            break;
          case 'trust':
            isDetected = !!(window.ethereum?.isTrustWallet);
            break;
          case 'phantom':
            // Phantom funciona tanto para Ethereum como Solana
            isDetected = !!(window.ethereum?.isPhantom || window.solana?.isPhantom);
            break;
          case 'walletconnect':
            // WalletConnect siempre está disponible como opción
            isDetected = true;
            break;
          default:
            // Para wallets genéricas que injectan en window.ethereum
            isDetected = !!(window.ethereum && !window.ethereum.isMetaMask && !window.ethereum.isRabby);
            break;
        }
      } catch (err) {
        console.warn(`Error detecting ${wallet.name}:`, err);
      }

      detected.push({
        ...wallet,
        detected: isDetected
      });
    });

    return detected;
  };

  // Conectar a una wallet específica
  const connectToWallet = async (wallet: WalletProvider): Promise<boolean> => {
    setError(null);
    setSelectedWallet(wallet);

    // Verificar requisito mínimo antes de conectar
    if (!hasAnyWallet && wallet.id === 'walletconnect') {
      const walletError: WalletError = {
        code: -1,
        message: 'Debes tener al menos una wallet instalada para usar CropLex. Por favor instala MetaMask, Rabby, Coinbase Wallet u otra wallet compatible.'
      };
      setError(walletError);
      setSelectedWallet(null);
      return false;
    }

    try {
      let address = '';
      let balance = '0';

      switch (wallet.id) {
        case 'phantom':
          if (window.solana?.isPhantom) {
            // Conexión Phantom/Solana
            const response = await window.solana.connect();
            address = response.publicKey.toString();
          } else if (window.ethereum?.isPhantom) {
            // Conexión Phantom/Ethereum
            const accounts = await window.ethereum.request({
              method: 'eth_requestAccounts'
            });
            address = accounts[0];
            
            const balanceHex = await window.ethereum.request({
              method: 'eth_getBalance',
              params: [address, 'latest']
            });
            balance = (parseInt(balanceHex, 16) / 1e18).toFixed(4);
          }
          break;

        case 'walletconnect':
          // Implementación simulada de WalletConnect
          // En un entorno real, aquí usarías @walletconnect/modal
          address = "0x" + Math.random().toString(16).substr(2, 40);
          balance = (Math.random() * 10).toFixed(4);
          break;

        default:
          // Para wallets basadas en window.ethereum
          if (!window.ethereum) {
            throw new Error(`${wallet.name} no está instalada`);
          }

          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
          });

          if (!accounts || accounts.length === 0) {
            throw new Error('No se encontraron cuentas');
          }

          address = accounts[0];
          
          // Obtener balance
          try {
            const balanceHex = await window.ethereum.request({
              method: 'eth_getBalance',
              params: [address, 'latest']
            });
            balance = (parseInt(balanceHex, 16) / 1e18).toFixed(4);
          } catch (balanceError) {
            console.warn('Error obteniendo balance:', balanceError);
            balance = '0';
          }
          break;
      }

      const connected: ConnectedWallet = {
        address,
        provider: wallet,
        balance
      };

      setConnectedWallet(connected);
      return true;

    } catch (err: any) {
      const walletError: WalletError = {
        code: err.code || -1,
        message: err.message || `Error conectando a ${wallet.name}`
      };
      setError(walletError);
      setSelectedWallet(null);
      return false;
    }
  };

  // Desconectar wallet
  const disconnectWallet = async () => {
    if (connectedWallet?.provider.id === 'phantom' && window.solana?.isPhantom) {
      try {
        await window.solana.disconnect();
      } catch (err) {
        console.warn('Error desconectando Phantom:', err);
      }
    }
    
    setConnectedWallet(null);
    setSelectedWallet(null);
    setError(null);
  };

  // Formatear dirección para mostrar
  const formatAddress = (address: string): string => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Escuchar cambios de cuenta
  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (connectedWallet && accounts[0] !== connectedWallet.address) {
        // Actualizar con nueva cuenta
        setConnectedWallet(prev => prev ? {
          ...prev,
          address: accounts[0]
        } : null);
      }
    };

    const handleChainChanged = () => {
      // Recargar la página cuando cambie la red
      window.location.reload();
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [connectedWallet]);

  // Detectar wallets al montar el componente
  useEffect(() => {
    const timer = setTimeout(() => {
      const wallets = detectWallets();
      setDetectedWallets(wallets);
      setHasAnyWallet(checkMinimumWalletRequirement(wallets));
      setIsLoading(false);
    }, 1000); // Dar tiempo para que las wallets se inyecten

    return () => clearTimeout(timer);
  }, []);

  return {
    detectedWallets,
    isLoading,
    selectedWallet,
    connectedWallet,
    error,
    hasAnyWallet,
    connectToWallet,
    disconnectWallet,
    formatAddress,
    isConnected: !!connectedWallet
  };
};
