import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill } from './schemas/skill.schema';
import { CreateSkillDto } from './dto/create-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name)
    private skillModel: Model<Skill>,
  ) {}

  async createSkill(createSkillDto: CreateSkillDto) {
    const existingSkill = await this.skillModel.findOne({
      name: createSkillDto.name.trim(),
    });

    if (existingSkill) {
      throw new ConflictException('Skill already exists');
    }

    return this.skillModel.create(createSkillDto);
  }

  async getSkills() {
    return this.skillModel.find().sort({ name: 1 });
  }
}