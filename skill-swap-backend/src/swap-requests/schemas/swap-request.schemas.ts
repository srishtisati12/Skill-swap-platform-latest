import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true})
export class SwapRequest {
  @Prop({ default: uuidv4, unique: true })
  id: string;

  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  receiverId: string;

  @Prop({ required: true })
  skillOffered: string;

  @Prop({ required: true })
  skillWanted: string;

  @Prop({
    required: true,
    enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
    default: 'PENDING',
  })
  status: string;
}
export const SwapRequestSchema = SchemaFactory.createForClass(SwapRequest);