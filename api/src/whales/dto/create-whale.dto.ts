import {
  IsEthereumAddress,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateWhaleDto {
  @IsEthereumAddress({ message: 'Address must be a valid Ethereum address' })
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  label!: string;
}
