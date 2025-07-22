import '@walletconnect/react-native-compat';
import {createAppKit, defaultConfig} from '@reown/appkit-ethers-react-native';
import {REOWN_PROJECT_ID} from '@env';

const metadata = {
  name: 'Pione Farm',
  description: 'DApp Pione Farm',
  url: 'https://pionefarm.com',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
  redirect: {native: 'pionefarm://'},
};

const config = defaultConfig({metadata});

const chains = [
  {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com',
  },
  {
    chainId: 137,
    name: 'Polygon',
    currency: 'MATIC',
    explorerUrl: 'https://polygonscan.com',
    rpcUrl: 'https://polygon-rpc.com',
  },
  {
    chainId: 5080,
    name: 'Pione Zero',
    currency: 'PIONE',
    explorerUrl: 'https://zeroscan.org',
    rpcUrl: 'https://rpc.zeroscan.org',
  },
];

if (!global.__APPKIT_INITIALIZED__) {
  createAppKit({
    projectId: REOWN_PROJECT_ID,
    chains,
    config,
    enableAnalytics: true,
  });
  global.__APPKIT_INITIALIZED__ = true;
}
