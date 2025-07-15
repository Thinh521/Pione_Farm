import '@walletconnect/react-native-compat';
import {
  createAppKit,
  defaultConfig,
  AppKit,
} from '@reown/appkit-ethers-react-native';

const projectId = '6266bc3a03cf648c4df2288f781c7e25';

const metadata = {
  name: 'AppKit RN',
  description: 'AppKit RN Example',
  url: 'https://reown.com/appkit',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
  redirect: {
    native: 'pionefarm://',
  },
};

const config = defaultConfig({ metadata });

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
];

if (!global.__APPKIT_INITIALIZED__) {
  createAppKit({
    projectId,
    chains,
    config,
    enableAnalytics: true,
  });
  global.__APPKIT_INITIALIZED__ = true;
}

export default AppKit;
