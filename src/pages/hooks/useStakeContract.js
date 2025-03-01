import { Contract, Signer, ethers } from "ethers";
import { stakeAbi } from "../../abis/stake";
import { useEffect, useState } from "react"; // 引入 React 钩子

const daiAddress = "0x01A01E8B862F10a3907D0fC7f47eBF5d34190341";

const useStakeContract = (signer) => {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    // 确保代码只在浏览器环境中执行
    if (typeof window !== "undefined" && window.ethereum) {
      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(browserProvider);
    }
  }, []);

  if (!provider) {
    return null; // 或者返回一个默认的 Contract 实例
  }

  return new Contract(daiAddress, stakeAbi, signer || provider);
};

export { useStakeContract };