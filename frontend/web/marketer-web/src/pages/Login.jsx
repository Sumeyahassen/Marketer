import { useState } from 'react';
import api from '../services/api';
import { login } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const payload = isRegister
        ? { email, password, role: 'AGENT' } // Only Agent can register
        : { email, password };

      const res = await api.post(endpoint, payload);
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
          {isRegister ? 'Agent Register' : 'Login'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 border rounded-lg focus:outline-none focus:border-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 border rounded-lg focus:outline-none focus:border-indigo-500"
          />
          {isRegister && (
            <p className="text-sm text-gray-600">
              Only Agents can register. 
            </p>
          )}
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : isRegister ? 'Register as Agent' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-6">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-indigo-600 hover:underline"
          >
            {isRegister ? 'Have account? Login' : 'New Agent? Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;