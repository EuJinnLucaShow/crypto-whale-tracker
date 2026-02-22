import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateWhaleDto } from './dto/create-whale.dto';
import { UpdateWhaleDto } from './dto/update-whale.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Web3Service } from '../web3/web3.service';

@Injectable()
export class WhalesService {
  private readonly logger = new Logger(WhalesService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly web3: Web3Service,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCron() {
    this.logger.debug('Starting scheduled balance update for all whales...');

    const whales = await this.prisma.monitored_wallets.findMany();

    for (const whale of whales) {
      const newBalance = await this.web3.getEthBalance(whale.address);

      if (newBalance !== null) {
        await this.prisma.monitored_wallets.update({
          where: { id: whale.id },
          data: { balance: newBalance },
        });
        this.logger.log(
          `Updated: ${whale.label || whale.address} -> ${newBalance} ETH`,
        );
      }
    }
    this.logger.debug('Balance update task finished.');
  }

  async create(createWhaleDto: CreateWhaleDto) {
    const { address, label } = createWhaleDto;

    const existing = await this.prisma.monitored_wallets.findUnique({
      where: { address },
    });

    if (existing) {
      throw new ConflictException('A whale with this address already exists');
    }

    const balance = await this.web3.getEthBalance(address);

    return this.prisma.monitored_wallets.create({
      data: {
        address,
        label,
        balance,
      },
    });
  }

  async findAll() {
    return await this.prisma.monitored_wallets.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: number) {
    return await this.prisma.monitored_wallets.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateWhaleDto: UpdateWhaleDto) {
    return await this.prisma.monitored_wallets.update({
      where: { id },
      data: updateWhaleDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.monitored_wallets.delete({
      where: { id },
    });
  }
}
