import { useEffect, useState } from 'react';
import {
  getMyProfile,
  updateMyProfile,
} from '../services/authServices';
import type { User } from '../types/user';

function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setUser(data);
      } catch (error) {
        console.log('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    try {
      const updatedUser = await updateMyProfile({
        name: user.name,
        phone: user.phone,
        bio: user.bio,
        location: user.location,
      });

      setUser(updatedUser);
      alert('Profile updated successfully');
    } catch (error) {
      console.log('Error updating profile:', error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      <form className="profile-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          value={user.name}
          onChange={(e) =>
            setUser({ ...user, name: e.target.value })
          }
          required
        />

        <label>Email</label>
        <input value={user.email} readOnly />

        <label>Phone</label>
        <input
          value={user.phone || ''}
          onChange={(e) =>
            setUser({ ...user, phone: e.target.value })
          }
        />

        <label>Location</label>
        <input
          value={user.location || ''}
          onChange={(e) =>
            setUser({ ...user, location: e.target.value })
          }
        />

        <label>Bio</label>
        <textarea
          value={user.bio || ''}
          onChange={(e) =>
            setUser({ ...user, bio: e.target.value })
          }
          rows={4}
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;