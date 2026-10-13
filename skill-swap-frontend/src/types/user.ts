
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  location?: string;
  teachSkills?: string[];
  learnSkills?: string[];
  
}

export interface UpdateUserData {
  name?: string;
  phone?: string;
  bio?: string;
  location?: string;
  
}
