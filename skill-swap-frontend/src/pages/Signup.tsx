
import { useState } from 'react';
import { registerUser } from '../services/authServices';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
 // const [profileImage, setProfileImage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await registerUser(
        name,
        email,
        password,
        phone || undefined,
        bio || undefined,
        location || undefined,
       // profileImage || undefined,
      );

      alert('Registration successful');
      navigate('/login');
    } catch (error) {
      console.log(error);
      alert('Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password (minimum 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <textarea
          placeholder="Tell us about yourself"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
        />

        

        <button type="submit">Sign Up</button>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
