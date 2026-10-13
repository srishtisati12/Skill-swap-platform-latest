import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, SkillSchema } from './schemas/skill.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule,
    MongooseModule.forFeature([
      { name: Skill.name, schema: SkillSchema },
    ]),
  ],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports:[SkillsService]
})
export class SkillsModule {}
