import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateRequestDto {
  @IsUUID()
  receiverId: string;
  
  @IsUUID()
  @IsNotEmpty()
  skillOffered: string;

  @IsUUID()
  @IsNotEmpty()
  skillWanted: string;
}