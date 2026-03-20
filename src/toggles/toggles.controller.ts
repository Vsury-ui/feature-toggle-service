import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TogglesService } from './toggles.service';
import { CreateToggleDto } from './dto/create-toggle.dto';
import { UpdateToggleDto } from './dto/update-toggle.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { FeatureToggle } from './entities/toggle.entity';

@ApiTags('FeatureFlags')
@Controller('toggles')
export class TogglesController {
  constructor(private readonly togglesService: TogglesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new feature toggle' })
  @ApiResponse({ status: 201, description: 'Created successfully.', type: FeatureToggle })
  @ApiResponse({ status: 409, description: 'Toggle already exists.' })
  create(@Body() createToggleDto: CreateToggleDto) {
    return this.togglesService.create(createToggleDto);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get all feature toggles for a specific product' })
  @ApiParam({ name: 'productId', type: 'string' })
  findAllByProduct(@Param('productId') productId: string) {
    return this.togglesService.findAllByProduct(productId);
  }

  @Get('product/:productId/env/:env')
  @ApiOperation({ summary: 'Get enabled state of all toggles for a specific product in a specific environment' })
  @ApiParam({ name: 'productId', type: 'string' })
  @ApiParam({ name: 'env', type: 'string', description: 'Environment name (e.g. dev, prod)' })
  findByProductAndEnv(
    @Param('productId') productId: string,
    @Param('env') env: string,
  ) {
    return this.togglesService.findByProductAndEnv(productId, env);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing feature toggle' })
  @ApiParam({ name: 'id', type: 'string', description: 'UUID of the toggle' })
  update(@Param('id') id: string, @Body() updateToggleDto: UpdateToggleDto) {
    return this.togglesService.update(id, updateToggleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a feature toggle' })
  @ApiParam({ name: 'id', type: 'string', description: 'UUID of the toggle' })
  remove(@Param('id') id: string) {
    return this.togglesService.remove(id);
  }
}
