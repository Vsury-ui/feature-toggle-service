import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TogglesService } from './toggles.service';
import { TogglesController } from './toggles.controller';
import { FeatureToggle } from './entities/toggle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureToggle])],
  controllers: [TogglesController],
  providers: [TogglesService],
})
export class TogglesModule {}
