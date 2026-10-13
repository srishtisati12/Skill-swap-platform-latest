
import { useEffect, useState } from 'react';
import {
  getAllSkills,
  getMySkills,
  createSkill,
  addMySkill,
  removeMySkill,
} from '../services/skillServices';

import type { Skill, UserSkill } from '../types/skill';

function MySkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [mySkills, setMySkills] = useState<UserSkill[]>([]);
  const [skillName, setSkillName] = useState('');
  const [skillId, setSkillId] = useState('');
  const [type, setType] = useState<'TEACH' | 'LEARN'>('TEACH');

  useEffect(() => {
  const fetchData = async () => {
    try {
      const skillsData = await getAllSkills();
      setSkills(skillsData);

      const mySkillsData = await getMySkills();
      console.log('My skills from backend:', mySkillsData);
      setMySkills(mySkillsData);
    } catch (error) {
      console.log('Error fetching skills:', error);
    }
  };

  fetchData();
}, []);

  const handleCreateSkill = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newSkill = await createSkill(skillName);
      setSkills([...skills, newSkill]);
      setSkillName('');
    } catch (error) {
      console.log('Error creating skill:', error);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await addMySkill(skillId, type);

    const mySkillsData = await getMySkills();
    setMySkills(mySkillsData);

    setSkillId('');
  } catch (error) {
    console.log('Error adding skill:', error);
  }
};

  const handleRemoveSkill = async (id: string) => {
    try {
      await removeMySkill(id);
      setMySkills(mySkills.filter((skill) => skill._id !== id));
    } catch (error) {
      console.log('Error removing skill:', error);
    }
  };

  return (
    <div className="my-skills-page">
      <h2>My Skills</h2>

      <form onSubmit={handleCreateSkill}>
        <h3>Create a Skill</h3>
        <input
          type="text"
          placeholder="Enter skill name"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          required
        />
        <button type="submit">Create Skill</button>
      </form>

      <hr />

      <form onSubmit={handleAddSkill}>
        <h3>Add Skill to My Profile</h3>

        <label>Select Skill</label>
        <select
          value={skillId}
          onChange={(e) => setSkillId(e.target.value)}
          required
        >
          <option value="">Choose a skill</option>
          {skills.map((skill) => (
            <option key={skill.id} value={skill.id}>
  {skill.name}
</option>
          ))}
        </select>

        <label>Skill Type</label>
        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value as 'TEACH' | 'LEARN')
          }
        >
          <option value="TEACH">I can teach</option>
          <option value="LEARN">I want to learn</option>
        </select>

        <button type="submit">Add Skill</button>
      </form>

      <hr />

      <h3>My Added Skills</h3>

      {mySkills.length === 0 ? (
        <p>You have not added any skills yet.</p>
      ) : (
        mySkills.map((skill) => (
          <div key={skill._id}>
            <span>{skill.skillName} - {skill.type}</span>
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill._id)}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MySkills;
