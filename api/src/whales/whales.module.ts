import { Module } from '@nestjs/common';
import { WhalesService } from './whales.service';
import { WhalesController } from './whales.controller';
import { Web3Module } from '../web3/web3.module';

@Module({
  imports: [Web3Module],
  controllers: [WhalesController],
  providers: [WhalesService],
})
export class WhalesModule {}
