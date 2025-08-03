// Tipos para el sistema de wallets
export interface WalletProvider {
  id: string;
  name: string;
  icon: string;
  detected: boolean;
  isMetaMask?: boolean;
  isRabby?: boolean;
  isCoinbaseWallet?: boolean;
  isTrustWallet?: boolean;
  isPhantom?: boolean;
}

export interface ConnectedWallet {
  address: string;
  provider: WalletProvider;
  balance?: string;
}

export interface WalletError {
  code: number;
  message: string;
}

// Definición de wallets soportadas
export const SUPPORTED_WALLETS: Omit<WalletProvider, 'detected'>[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: '🦊',
    isMetaMask: true
  },
  {
    id: 'rabby',
    name: 'Rabby Wallet',
    icon: '🐰',
    isRabby: true
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: '🟦',
    isCoinbaseWallet: true
  },
  {
    id: 'trust',
    name: 'Trust Wallet',
    icon: '🛡️',
    isTrustWallet: true
  },
  {
    id: 'phantom',
    name: 'Phantom',
    icon: '👻',
    isPhantom: true
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: '🔗'
  }
];

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      isRabby?: boolean;
      isCoinbaseWallet?: boolean;
      isTrustWallet?: boolean;
      isPhantom?: boolean;
      providers?: any[];
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
    };
    solana?: {
      isPhantom?: boolean;
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
    };
  }
}
