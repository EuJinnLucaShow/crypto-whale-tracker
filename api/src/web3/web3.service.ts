import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPublicClient, http, formatEther, PublicClient } from 'viem';
import { mainnet } from 'viem/chains';

@Injectable()
export class Web3Service {
  private readonly logger = new Logger(Web3Service.name);
  private readonly publicClient: PublicClient;

  constructor(private readonly configService: ConfigService) {
    const rpcUrl =
      this.configService.get<string>('ETH_RPC_URL') ||
      'https://cloudflare-eth.com';

    this.publicClient = createPublicClient({
      chain: mainnet,
      transport: http(rpcUrl),
    });

    this.logger.log(`Web3Service initialized with RPC: ${rpcUrl}`);
  }

  async getEthBalance(address: string): Promise<string | null> {
    try {
      const balanceWei = await this.publicClient.getBalance({
        address: address as `0x${string}`,
      });
      const formatted = formatEther(balanceWei);

      return formatted;
    } catch (error: any) {
      this.logger.error(
        `Failed to fetch balance for ${address}:`,
        error.message,
      );
      return null;
    }
  }
}
