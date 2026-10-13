export interface Skill {
  _id: string;
  name: string;
  id: string
}

export interface UserSkill {
  _id: string;
  skillId: string;
  skillName: string;
  type: 'TEACH' | 'LEARN';
}