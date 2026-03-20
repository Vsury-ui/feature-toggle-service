import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TogglesModule } from './toggles/toggles.module';
import { FeatureToggle } from './toggles/entities/toggle.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'feature_toggle_service',
      entities: [FeatureToggle],
      synchronize: process.env.NODE_ENV !== 'production', // Allows sync during dev
    }),
    TogglesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
