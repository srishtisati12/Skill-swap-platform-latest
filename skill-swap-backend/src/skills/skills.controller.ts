import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  createSkill(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.createSkill(createSkillDto);
  }

  @Get()
  getSkills() {
    return this.skillsService.getSkills();
  }
}