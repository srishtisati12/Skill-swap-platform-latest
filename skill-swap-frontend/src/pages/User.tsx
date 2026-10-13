
import { useEffect, useState } from "react";
import { getAllUsers, getMySkills } from "../services/skillServices";
import { sendSwapRequest } from "../services/swapRequestServices";
import type { User } from "../types/user";
import type { UserSkill } from "../types/skill";

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [mySkills, setMySkills] = useState<UserSkill[]>([]);
  const [receiverId, setReceiverId] = useState("");
  const [skillOffered, setSkillOffered] = useState("");
  const [skillWanted, setSkillWanted] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const usersData = await getAllUsers();
        const skillsData = await getMySkills();

        setUsers(usersData);
        setMySkills(skillsData);
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendSwapRequest({ receiverId, skillOffered, skillWanted });

      alert("Swap request sent successfully");
      setReceiverId("");
      setSkillOffered("");
      setSkillWanted("");
    } catch (error) {
      alert("Failed to send request");
    }
  };

  const handleCancel = () => {
    setReceiverId("");
    setSkillOffered("");
    setSkillWanted("");
  };

  return (
    <div className="users-page">
      <h2>Find People to Swap Skills With</h2>

      {users.map((user) => (
        <div className="user-card" key={user.id}>
          <h3>{user.name}</h3>
          <p>Location: {user.location || "Not provided"}</p>
          <p>Bio: {user.bio || "No bio available"}</p>

          <h4>Skills They Can Teach</h4>
          <p>{user.teachSkills?.join(", ") || "No teaching skills"}</p>

          <h4>Skills They Want to Learn</h4>
          <p>{user.learnSkills?.join(", ") || "No learning skills"}</p>

          <button
            type="button"
            onClick={() => {
              setReceiverId(user.id);
              setSkillOffered("");
              setSkillWanted("");
            }}
          >
            Send Swap Request
          </button>
        </div>
      ))}

      {receiverId && (
        <form onSubmit={handleSendRequest}>
          <h3>Send Swap Request</h3>

          <label>Skill You Can Teach</label>
          <select
            value={skillOffered}
            onChange={(e) => setSkillOffered(e.target.value)}
            required
          >
            <option value="">Choose a skill</option>
            {mySkills
              .filter((skill) => skill.type === "TEACH")
              .map((skill) => (
                <option key={skill._id} value={skill.skillId}>
                  {skill.skillName}
                </option>
              ))}
          </select>

          <label>Skill You Want to Learn</label>
          <select
            value={skillWanted}
            onChange={(e) => setSkillWanted(e.target.value)}
            required
          >
            <option value="">Choose a skill</option>
            {mySkills
              .filter((skill) => skill.type === "LEARN")
              .map((skill) => (
                <option key={skill._id} value={skill.skillId}>
  {skill.skillName}
</option>
              ))}
          </select>

          <button type="submit">Submit Request</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default Users;
