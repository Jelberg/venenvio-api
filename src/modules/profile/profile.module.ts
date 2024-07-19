import { Module } from '@nestjs/common';
import { ProfileService } from './services/profile.service';
import { ProfileController } from './controllers/profile.controller';
import { ProfileRepositoryModule } from './repository/profile.module';
@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [ProfileRepositoryModule],
})
export class ProfileModule {}
