import { Injectable } from '@nestjs/common';
import { CreateInvitationDto } from '../dto/create-invitation.dto';
import { UpdateInvitationDto } from '../dto/update-invitation.dto';
import { InvitationRepository } from '../repository/invitation-repository.repository';

@Injectable()
export class InvitationService {
  constructor(
    private invitationRepository: InvitationRepository
  ){}

  async create(createInvitationDto: CreateInvitationDto) {
    try {
      //TODO: validar que los id existan ---> todavia por verificar
      return await this.invitationRepository.createInvitation(createInvitationDto.userId, createInvitationDto.refUserId)
    } catch (error) {
      console.error(error);
    }
  }

  async findAllByUserId(userId: string) {
    try {
      const result = await this.invitationRepository.findAllByUserId(userId)
      const count = result.length
      return {
        data: result,
        count: count
      }
    } catch (error) {
      console.error(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} invitation`;
  }

  update(id: number, updateInvitationDto: UpdateInvitationDto) {
    return `This action updates a #${id} invitation`;
  }

  remove(id: number) {
    return `This action removes a #${id} invitation`;
  }
}
