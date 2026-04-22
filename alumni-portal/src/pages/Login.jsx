import { Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'alumni'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Login failed. Please check your credentials.');
        return;
      }

      // Store JWT token and user data
      localStorage.setItem('alumniToken', data.token);
      localStorage.setItem('alumniUser', JSON.stringify({ ...data.user, isLoggedIn: true }));
      console.log('Login successful:', data.user);
      window.location.href = '/alumni-directory';
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please ensure the server is running.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-theme-bg py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 premium-card p-10 bg-theme-card">
        <div className="text-center">
          <img 
            src="/images/srm_logo_official.png" 
            alt="SRM University AP" 
            className="h-24 w-auto mx-auto mb-6"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-theme-text transition-colors">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-theme-muted transition-colors">
            Or{' '}
            <Link to="/register" className="font-medium text-university-green dark:text-university-gold hover:text-university-gold dark:hover:text-white transition-colors">
              create a new account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-theme-muted" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-theme-border bg-theme-section text-theme-text placeholder-theme-muted focus:outline-none focus:ring-university-gold focus:border-university-gold sm:text-sm transition-colors"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-theme-muted" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-theme-border bg-theme-section text-theme-text placeholder-theme-muted focus:outline-none focus:ring-university-gold focus:border-university-gold sm:text-sm transition-colors"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="py-2">
            <label className="block text-sm font-bold text-theme-text mb-3 transition-colors">Login as:</label>
            <div className="flex space-x-8">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={formData.role === 'student'}
                  onChange={handleChange}
                  className="w-4 h-4 text-university-green focus:ring-university-gold border-theme-border rounded-full bg-theme-section cursor-pointer"
                />
                <span className={`text-sm font-bold transition-colors ${formData.role === 'student' ? 'text-university-green' : 'text-theme-muted group-hover:text-university-green'}`}>Student</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="radio"
                  name="role"
                  value="alumni"
                  checked={formData.role === 'alumni'}
                  onChange={handleChange}
                  className="w-4 h-4 text-university-green focus:ring-university-gold border-theme-border rounded-full bg-theme-section cursor-pointer"
                />
                <span className={`text-sm font-bold transition-colors ${formData.role === 'alumni' ? 'text-university-green' : 'text-theme-muted group-hover:text-university-green'}`}>Alumni</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-university-green focus:ring-university-gold border-theme-border rounded bg-theme-section"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-theme-text transition-colors">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-university-green dark:text-university-gold hover:text-university-gold dark:hover:text-white transition-colors">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-university-green hover:bg-university-olive focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-university-gold focus:ring-offset-theme-bg transition-colors shadow-md"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
