import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvitationSchema } from 'src/schemas/invitation/invitation.schema';
import { invitationProvider } from 'src/schemas/invitation';
import { InvitationRepository } from './invitation-repository.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
          invitationProvider, 
        ]),
      ],
    providers: [InvitationRepository],
    exports: [InvitationRepository]
})
export class InvitationRepositoryModule {}
