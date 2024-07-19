import { Module } from '@nestjs/common';
import { InvitationService } from './services/invitation.service';
import { InvitationController } from './controllers/invitation.controller';
import { InvitationRepositoryModule } from './repository/invitation-repository.module';

@Module({
  controllers: [InvitationController],
  providers: [
    InvitationService
  ],
  imports: [InvitationRepositoryModule],
})
export class InvitationModule {}
