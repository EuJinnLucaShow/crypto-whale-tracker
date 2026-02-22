import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  createPublicClient,
  http,
  formatEther,
  PublicClient,
  parseAbi,
  formatUnits,
} from 'viem';
import { mainnet } from 'viem/chains';

export interface WhaleBalances {
  eth: string;
  usdt: string;
}

@Injectable()
export class Web3Service {
  private readonly logger = new Logger(Web3Service.name);
  private readonly publicClient: PublicClient;

  private readonly multicallAbi = parseAbi([
    'function getEthBalance(address addr) view returns (uint256 balance)',
  ]);

  private readonly erc20Abi = parseAbi([
    'function balanceOf(address account) view returns (uint256)',
  ]);

  private readonly multicallAddress: `0x${string}`;
  private readonly usdtAddress: `0x${string}` =
    '0xdAC17F958D2ee523a2206206994597C13D831ec7';

  constructor(private readonly configService: ConfigService) {
    const rpcUrl =
      this.configService.get<string>('ETH_RPC_URL') ||
      'https://cloudflare-eth.com';

    this.publicClient = createPublicClient({
      chain: mainnet,
      transport: http(rpcUrl),
    });

    const envMulticall =
      this.configService.get<string>('MULTICALL_ADDRESS') ||
      '0xcA11bde05977b3631167028862bE2a173976CA11';
    this.multicallAddress = envMulticall as `0x${string}`;
  }

  async getBalancesMulticall(
    addresses: string[],
  ): Promise<Record<string, WhaleBalances>> {
    if (addresses.length === 0) return {};

    try {
      const calls = addresses.flatMap((address) => [
        {
          address: this.multicallAddress,
          abi: this.multicallAbi,
          functionName: 'getEthBalance',
          args: [address as `0x${string}`],
        },
        {
          address: this.usdtAddress,
          abi: this.erc20Abi,
          functionName: 'balanceOf',
          args: [address as `0x${string}`],
        },
      ]);

      const results = await this.publicClient.multicall({
        contracts: calls,
      });

      const balances: Record<string, WhaleBalances> = {};

      addresses.forEach((address, index) => {
        const ethResult = results[index * 2];
        const usdtResult = results[index * 2 + 1];

        balances[address] = {
          eth:
            ethResult.status === 'success'
              ? formatEther(ethResult.result)
              : '0',

          usdt:
            usdtResult.status === 'success'
              ? formatUnits(usdtResult.result, 6)
              : '0',
        };

        if (ethResult.status === 'failure' || usdtResult.status === 'failure') {
          this.logger.warn(`Partial or full multicall failure for ${address}`);
        }
      });

      return balances;
    } catch (error: any) {
      this.logger.error('Multicall execution failed:', error.message);
      return {};
    }
  }
}
