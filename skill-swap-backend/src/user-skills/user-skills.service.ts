
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSkill } from './schemas/user-skill.schema';
import { AddUserSkillDto } from './dto/add-user-skill.dto';

@Injectable()
export class UserSkillsService {
  constructor(
    @InjectModel(UserSkill.name)
    private userSkillModel: Model<UserSkill>,
  ) {}

  async addSkill(userId: string, dto: AddUserSkillDto) {
    const existingSkill = await this.userSkillModel.findOne({
      userId,
      skillId: dto.skillId,
      
    });
    if (existingSkill) {
    if (existingSkill.type === dto.type) {
      throw new ConflictException(
        'You have already added this skill with the same type',
      );
    }

    throw new ConflictException(
      'You cannot add the same skill as both Teach and Learn',
    );
  }


    return this.userSkillModel.create({
      userId,
      skillId: dto.skillId,
      type: dto.type,
    });
  }

  async removeSkill(userId: string, id: string) {
    const result = await this.userSkillModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!result) {
      throw new NotFoundException('User skill not found');
    }

    return { message: 'Skill removed successfully' };
  }
  async getMySkills(userId: string) {
  return this.userSkillModel.aggregate([
    { $match: { userId } },
    {
      $lookup: {
        from: 'skills',
        localField: 'skillId',
        foreignField: 'id',
        as: 'skill',
      },
    },
    {
      $unwind: {
        path: '$skill',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        userId: 1,
        skillId: 1,
        type: 1,
        skillName: '$skill.name' 
      },
    },
  ]);
}
}