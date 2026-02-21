import { Injectable } from '@nestjs/common';
import { CreateWhaleDto } from './dto/create-whale.dto';
import { UpdateWhaleDto } from './dto/update-whale.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WhalesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWhaleDto: CreateWhaleDto) {
    return await this.prisma.monitored_wallets.create({
      data: createWhaleDto,
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
