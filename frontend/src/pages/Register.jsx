import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';

function Register() {
          const [name, setName] = useState('');
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
                              const response = await register({ name, email, password });
                              const token = response.data.token || response.data.accessToken || response.data.data?.token;

                              if (!token) {
                                        throw new Error('Registration succeeded but no token was returned.');
                              }

                              localStorage.setItem('taskManagerToken', token);
                              navigate('/dashboard');
                    } catch (err) {
                              const message = err.response?.data?.message || err.message || 'Registration failed.';
                              setError(message);
                    } finally {
                              setLoading(false);
                    }
          };

          return (
                    <div className="page page--centered">
                              <div className="auth-card">
                                        <h1>Register</h1>
                                        <form onSubmit={handleSubmit} className="form">
                                                  <label>
                                                            Name
                                                            <input
                                                                      type="text"
                                                                      value={name}
                                                                      onChange={(event) => setName(event.target.value)}
                                                                      required
                                                                      placeholder="Your name"
                                                            />
                                                  </label>
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
                                                                      placeholder="Choose a secure password"
                                                            />
                                                  </label>
                                                  {error && <div className="alert">{error}</div>}
                                                  <button type="submit" className="button" disabled={loading}>
                                                            {loading ? 'Creating account...' : 'Register'}
                                                  </button>
                                        </form>
                                        <p className="text-sm">
                                                  Already have an account? <Link to="/login">Login</Link>
                                        </p>
                              </div>
                    </div>
          );
}

export default Register;
