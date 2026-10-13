import { Module } from '@nestjs/common';
import { SwapRequestsController } from './swap-requests.controller';
import { SwapRequestsService } from './swap-requests.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SwapRequest, SwapRequestSchema } from './schemas/swap-request.schemas';
import { AuthModule } from '../auth/auth.module';
import { UserSkill, UserSkillSchema } from '../user-skills/schemas/user-skill.schema';

@Module({
  imports: [AuthModule,
    MongooseModule.forFeature([
      {
        name: SwapRequest.name,
        schema: SwapRequestSchema,
      },
      {
        name: UserSkill.name,
        schema: UserSkillSchema,
      },
    ]),
  ],
  controllers: [SwapRequestsController],
  providers: [SwapRequestsService]
})
export class SwapRequestsModule {}
