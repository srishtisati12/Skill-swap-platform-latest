import { Module } from '@nestjs/common';
import { UserSkillsController } from './user-skills.controller';
import { UserSkillsService } from './user-skills.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSkill, UserSkillSchema } from './schemas/user-skill.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule,
    MongooseModule.forFeature([
      { name: UserSkill.name, schema: UserSkillSchema },
    ]),
  ],
  controllers: [UserSkillsController],
  providers: [UserSkillsService]
})
export class UserSkillsModule {}
