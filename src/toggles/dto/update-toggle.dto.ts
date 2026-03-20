import { PartialType } from '@nestjs/swagger';
import { CreateToggleDto } from './create-toggle.dto';

export class UpdateToggleDto extends PartialType(CreateToggleDto) {}
