import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';


@Schema({ timestamps: true })
export class Skill {
  @Prop({default: uuidv4, unique:true})
  id: string
  @Prop({ required: true, unique: true, trim: true })
  name: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);