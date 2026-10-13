
import { useEffect, useState } from 'react';
import { getMyProfile } from '../services/authServices';
import { getMySkills } from '../services/skillServices';
import { getSwapRequests } from '../services/swapRequestServices';
import type { User } from '../types/user';
import type { UserSkill } from '../types/skill';
import type { SwapRequest } from '../types/swaprequest';

function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [skills, setSkills] = useState<UserSkill[]>([]);
  const [requests, setRequests] = useState<SwapRequest[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await getMyProfile();
        const skillsData = await getMySkills();
        const requestData = await getSwapRequests();

        setUser(userData);
        setSkills(skillsData);
        setRequests(requestData);
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="dashboard">
      <h2>Welcome, {user?.name || 'User'}!</h2>
      <p>Share your skills and learn something new today.</p>

      <h3>My Summary</h3>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>{skills.filter((s) => s.type === 'TEACH').length}</h3>
          <p>Skills to Teach</p>
        </div>

        <div className="dashboard-card">
          <h3>{skills.filter((s) => s.type === 'LEARN').length}</h3>
          <p>Skills to Learn</p>
        </div>

        <div className="dashboard-card">
          <h3>{requests.filter((r) => r.status === 'PENDING').length}</h3>
          <p>Pending Requests</p>
        </div>

        <div className="dashboard-card">
          <h3>{requests.filter((r) => r.status === 'ACCEPTED').length}</h3>
          <p>Accepted Requests</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
