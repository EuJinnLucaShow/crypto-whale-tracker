import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WhalesService } from './whales.service';
import { CreateWhaleDto } from './dto/create-whale.dto';
import { UpdateWhaleDto } from './dto/update-whale.dto';

@Controller('whales')
export class WhalesController {
  constructor(private readonly whalesService: WhalesService) {}

  @Post()
  create(@Body() createWhaleDto: CreateWhaleDto) {
    return this.whalesService.create(createWhaleDto);
  }

  @Get()
  findAll() {
    return this.whalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.whalesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWhaleDto: UpdateWhaleDto) {
    return this.whalesService.update(+id, updateWhaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.whalesService.remove(+id);
  }
}
