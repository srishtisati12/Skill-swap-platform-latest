import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
  Get
} from '@nestjs/common';
import { UserSkillsService } from './user-skills.service';
import { AddUserSkillDto } from './dto/add-user-skill.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users/me/skills')
export class UserSkillsController {
  constructor(private readonly userSkillsService: UserSkillsService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  getMySkills(@Req() req: any) {
    return this.userSkillsService.getMySkills(req.user.sub);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  addSkill(@Req() req: any, @Body() dto: AddUserSkillDto) {
    return this.userSkillsService.addSkill(req.user.sub, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  removeSkill(@Req() req: any, @Param('id') id: string) {
    return this.userSkillsService.removeSkill(req.user.sub, id);
  }
}