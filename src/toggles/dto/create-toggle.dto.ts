import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateToggleDto {
  @ApiProperty({ example: 'new-checkout-flow', description: 'Unique feature toggle key' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ example: 'product_x', description: 'Product identifier' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 'Enables the new checkout flow', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ 
    example: { dev: true, staging: false, prod: false }, 
    description: 'Map of environment names to boolean state' 
  })
  @IsObject()
  @IsOptional()
  environments?: Record<string, boolean>;
}
