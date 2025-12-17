import { useState } from 'react';
import api from '../services/api';
import { login } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('AGENT'); // Default to Agent only
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let payload, endpoint;

      if (isRegister) {
        // Only allow registering as AGENT
        // Super Admin is created manually once
        payload = { email, password, role: 'AGENT' }; // Force role to AGENT
        endpoint = '/auth/register';
      } else {
        payload = { email, password };
        endpoint = '/auth/login';
      }

      const res = await api.post(endpoint, payload);
      login(res.data.token, res.data.user);

      // Redirect based on role
      if (res.data.user.role === 'ADMIN') {
        navigate('/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Marketer System
        </h2>
        <h3 className="text-xl mb-6 text-center">
          {isRegister ? 'Agent Registration' : 'Login'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? 'Please wait...' : isRegister ? 'Register as Agent' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          {isRegister ? (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-blue-600 hover:underline font-medium"
              >
                Login here
              </button>
            </>
          ) : (
            <>
              New Agent?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-blue-600 hover:underline font-medium"
              >
                Register here
              </button>
            </>
          )}
        </p>

        {!isRegister && (
          <p className="text-center mt-4 text-xs text-gray-500">
            Super Admin: Login with pre-created credentials only
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;