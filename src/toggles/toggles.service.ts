import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateToggleDto } from './dto/create-toggle.dto';
import { UpdateToggleDto } from './dto/update-toggle.dto';
import { FeatureToggle } from './entities/toggle.entity';

@Injectable()
export class TogglesService {
  constructor(
    @InjectRepository(FeatureToggle)
    private toggleRepository: Repository<FeatureToggle>,
  ) {}

  async create(createToggleDto: CreateToggleDto): Promise<FeatureToggle> {
    const existing = await this.toggleRepository.findOne({
      where: { key: createToggleDto.key, productId: createToggleDto.productId },
    });
    if (existing) {
      throw new ConflictException(`Feature toggle '${createToggleDto.key}' already exists for product '${createToggleDto.productId}'`);
    }
    const toggle = this.toggleRepository.create(createToggleDto);
    return this.toggleRepository.save(toggle);
  }

  async findAllByProduct(productId: string): Promise<FeatureToggle[]> {
    return this.toggleRepository.find({ where: { productId } });
  }

  async findByProductAndEnv(productId: string, env: string): Promise<Record<string, boolean>> {
    const toggles = await this.toggleRepository.find({ where: { productId } });
    
    // Create a simple map of { toggleKey: isEnabled }
    const toggleMap: Record<string, boolean> = {};
    for (const toggle of toggles) {
      // Missing environment implies false
      toggleMap[toggle.key] = toggle.environments?.[env] ?? false;
    }
    
    return toggleMap;
  }

  async update(id: string, updateToggleDto: UpdateToggleDto): Promise<FeatureToggle> {
    const toggle = await this.toggleRepository.findOne({ where: { id } });
    if (!toggle) {
      throw new NotFoundException(`Feature Toggle #${id} not found`);
    }
    
    // Merge new data
    Object.assign(toggle, updateToggleDto);
    return this.toggleRepository.save(toggle);
  }

  async remove(id: string): Promise<void> {
    const result = await this.toggleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Feature Toggle #${id} not found`);
    }
  }
}
