import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { createTask, deleteTask, getTasks, updateTask } from '../services/api';

function Dashboard() {
          const [tasks, setTasks] = useState([]);
          const [title, setTitle] = useState('');
          const [description, setDescription] = useState('');
          const [error, setError] = useState('');
          const [editId, setEditId] = useState(null);
          const [loading, setLoading] = useState(false);
          const navigate = useNavigate();

          useEffect(() => {
                    if (!localStorage.getItem('taskManagerToken')) {
                              navigate('/login');
                              return;
                    }

                    fetchTasks();
          }, [navigate]);

          const fetchTasks = async () => {
                    setError('');
                    try {
                              const response = await getTasks();
                              setTasks(response.data || []);
                    } catch (err) {
                              setError(err.response?.data?.message || 'Unable to load tasks.');
                    }
          };

          const resetForm = () => {
                    setTitle('');
                    setDescription('');
                    setEditId(null);
          };

          const handleSubmit = async (event) => {
                    event.preventDefault();
                    if (!title.trim()) {
                              setError('Please add a title for the task.');
                              return;
                    }

                    setError('');
                    setLoading(true);

                    try {
                              if (editId) {
                                        const response = await updateTask(editId, { title, description });
                                        setTasks((current) => current.map((task) => (task._id === editId ? response.data : task)));
                              } else {
                                        const response = await createTask({ title, description });
                                        setTasks((current) => [response.data, ...current]);
                              }
                              resetForm();
                    } catch (err) {
                              setError(err.response?.data?.message || 'Failed to save the task.');
                    } finally {
                              setLoading(false);
                    }
          };

          const startEdit = (task) => {
                    setEditId(task._id);
                    setTitle(task.title || '');
                    setDescription(task.description || '');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
          };

          const handleDelete = async (taskId) => {
                    if (!window.confirm('Delete this task?')) {
                              return;
                    }

                    try {
                              await deleteTask(taskId);
                              setTasks((current) => current.filter((task) => task._id !== taskId));
                    } catch (err) {
                              setError(err.response?.data?.message || 'Unable to delete the task.');
                    }
          };

          return (
                    <div className="page page--dashboard">
                              <Navbar />
                              <main className="dashboard">
                                        <section className="panel">
                                                  <div className="panel__header">
                                                            <div>
                                                                      <h1>My Tasks</h1>
                                                                      <p>Manage your tasks quickly and securely.</p>
                                                            </div>
                                                  </div>

                                                  <div className="task-form-card">
                                                            <h2>{editId ? 'Edit Task' : 'New Task'}</h2>
                                                            <form onSubmit={handleSubmit} className="form form--task">
                                                                      <label>
                                                                                Title
                                                                                <input
                                                                                          type="text"
                                                                                          value={title}
                                                                                          onChange={(event) => setTitle(event.target.value)}
                                                                                          placeholder="Task title"
                                                                                          required
                                                                                />
                                                                      </label>
                                                                      <label>
                                                                                Description
                                                                                <textarea
                                                                                          rows="4"
                                                                                          value={description}
                                                                                          onChange={(event) => setDescription(event.target.value)}
                                                                                          placeholder="Optional details"
                                                                                />
                                                                      </label>
                                                                      {error && <div className="alert">{error}</div>}
                                                                      <div className="form__actions">
                                                                                <button type="submit" className="button" disabled={loading}>
                                                                                          {loading ? 'Saving...' : editId ? 'Update Task' : 'Create Task'}
                                                                                </button>
                                                                                {editId && (
                                                                                          <button type="button" className="button button--ghost" onClick={resetForm}>
                                                                                                    Cancel
                                                                                          </button>
                                                                                )}
                                                                      </div>
                                                            </form>
                                                  </div>

                                                  <div className="task-list">
                                                            {tasks.length === 0 ? (
                                                                      <div className="empty-state">
                                                                                No tasks yet. Create your first task to get started.
                                                                      </div>
                                                            ) : (
                                                                      tasks.map((task) => (
                                                                                <article key={task._id} className="task-card">
                                                                                          <div>
                                                                                                    <h3>{task.title}</h3>
                                                                                                    <p>{task.description || 'No description provided.'}</p>
                                                                                          </div>
                                                                                          <div className="task-card__actions">
                                                                                                    <button className="button button--small" onClick={() => startEdit(task)}>
                                                                                                              Edit
                                                                                                    </button>
                                                                                                    <button className="button button--danger button--small" onClick={() => handleDelete(task._id)}>
                                                                                                              Delete
                                                                                                    </button>
                                                                                          </div>
                                                                                </article>
                                                                      ))
                                                            )}
                                                  </div>
                                        </section>
                              </main>
                    </div>
          );
}

export default Dashboard;
