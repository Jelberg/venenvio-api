import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvitationService } from '../services/invitation.service';
import { CreateInvitationDto } from '../dto/create-invitation.dto';
import { UpdateInvitationDto } from '../dto/update-invitation.dto';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post()
  async create(@Body() createInvitationDto: CreateInvitationDto) {
    return await this.invitationService.create(createInvitationDto);
  }

  @Get('find/:userId')
  async findAllByUserId(@Param('userId') userId: string) {
    return await this.invitationService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvitationDto: UpdateInvitationDto) {
    return this.invitationService.update(+id, updateInvitationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitationService.remove(+id);
  }
}
