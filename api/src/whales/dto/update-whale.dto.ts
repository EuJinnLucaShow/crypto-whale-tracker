import { PartialType } from '@nestjs/mapped-types';
import { CreateWhaleDto } from './create-whale.dto';

export class UpdateWhaleDto extends PartialType(CreateWhaleDto) {}
