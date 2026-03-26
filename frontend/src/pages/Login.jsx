import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { AlertCircle } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student' // default role for testing
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login and store role in localStorage for frontend demonstration
    localStorage.setItem('userRole', formData.role);
    localStorage.setItem('userName', formData.email.split('@')[0]);
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo">
          <AlertCircle size={40} className="logo-icon" />
          <h1>SmartFix</h1>
          <p>Login to your account to manage complaints.</p>
        </div>

        <Card className="auth-card">
          <CardHeader title="Sign In" />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Input
                id="email"
                label="Email Address"
                type="email"
                placeholder="you@university.edu"
                value={formData.email}
                onChange={handleChange}
                required
              />
              
              <Input
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <Input
                id="role"
                label="Login As (Demo Feature)"
                type="select"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="student">Student</option>
                <option value="staff">Staff/Maintenance</option>
                <option value="admin">Administrator</option>
              </Input>

              <Button type="submit" variant="primary" fullWidth className="mt-4">
                Login
              </Button>
            </form>
            
            <div className="auth-footer">
              Don't have an account? <Link to="/register">Register here</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
