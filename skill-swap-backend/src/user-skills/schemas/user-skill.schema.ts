import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true , 
  })
export class UserSkill {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  skillId: string;

  @Prop({ required: true, enum: ['TEACH', 'LEARN'] })
  type: string;
}

export const UserSkillSchema = SchemaFactory.createForClass(UserSkill);