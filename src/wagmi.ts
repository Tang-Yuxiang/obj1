import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {http} from 'viem'
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  // transports: {
  //   // 替换之前 不可用的 https://rpc.sepolia.org/
  //   [sepolia.id]: http('https://sepolia.infura.io/v3/fbb40e9c981044028503003518e5039b')
  // },
  ssr: true,
});
