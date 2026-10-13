import { IsIn, IsMongoId, IsUUID } from 'class-validator';

export class AddUserSkillDto {
  @IsUUID()
  skillId: string;

  @IsIn(['TEACH', 'LEARN'])
  type: string;
}