import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';

function Login() {
          const [email, setEmail] = useState('');
          const [password, setPassword] = useState('');
          const [error, setError] = useState('');
          const [loading, setLoading] = useState(false);
          const navigate = useNavigate();

          const handleSubmit = async (event) => {
                    event.preventDefault();
                    setError('');
                    setLoading(true);

                    try {
                              const response = await login({ email, password });
                              const token = response.data.token || response.data.accessToken || response.data.data?.token;

                              if (!token) {
                                        throw new Error('Invalid server response.');
                              }

                              localStorage.setItem('taskManagerToken', token);
                              navigate('/dashboard');
                    } catch (err) {
                              const message = err.response?.data?.message || err.message || 'Login failed.';
                              setError(message);
                    } finally {
                              setLoading(false);
                    }
          };

          return (
                    <div className="page page--centered">
                              <div className="auth-card">
                                        <h1>Login</h1>
                                        <form onSubmit={handleSubmit} className="form">
                                                  <label>
                                                            Email
                                                            <input
                                                                      type="email"
                                                                      value={email}
                                                                      onChange={(event) => setEmail(event.target.value)}
                                                                      required
                                                                      placeholder="you@example.com"
                                                            />
                                                  </label>
                                                  <label>
                                                            Password
                                                            <input
                                                                      type="password"
                                                                      value={password}
                                                                      onChange={(event) => setPassword(event.target.value)}
                                                                      required
                                                                      placeholder="Your password"
                                                            />
                                                  </label>
                                                  {error && <div className="alert">{error}</div>}
                                                  <button type="submit" className="button" disabled={loading}>
                                                            {loading ? 'Logging in...' : 'Login'}
                                                  </button>
                                        </form>
                                        <p className="text-sm">
                                                  New here? <Link to="/register">Create an account</Link>
                                        </p>
                              </div>
                    </div>
          );
}

export default Login;
