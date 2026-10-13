import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop({ required: true , select:false})
  passwordHash: string;

  @Prop()
  bio?: string;

  @Prop()
  location?: string;

  @Prop({ default: 'USER' })
  role: string;

  
}

export const UserSchema = SchemaFactory.createForClass(User);