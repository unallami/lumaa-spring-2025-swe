import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
}

const TasksPage = () => {
  const { token, setToken } = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [modalIsComplete, setModalIsComplete] = useState(false);
  const navigate = useNavigate();

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
      if (!response.data.find((t: Task) => t.id === selectedTaskId)) {
        setSelectedTaskId(null);
      }
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  useEffect(() => {
    fetchTasks();

  }, [token]);


  const openCreateModal = () => {
    setModalType('create');
    setModalTitle('');
    setModalDescription('');
    setModalIsComplete(false);
    setModalOpen(true);
  };


  const openEditModal = () => {
    if (selectedTaskId === null) return;
    const task = tasks.find((t) => t.id === selectedTaskId);
    if (task) {
      setModalType('edit');
      setModalTitle(task.title);
      setModalDescription(task.description || '');
      setModalIsComplete(task.isComplete);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Create a new task or update the selected task
  const handleSaveModal = async () => {
    if (modalType === 'create') {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/tasks`,
          { title: modalTitle, description: modalDescription },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSelectedTaskId(null);
        fetchTasks();
        closeModal();
      } catch (error) {
        console.error('Error creating task', error);
      }
    } else if (modalType === 'edit' && selectedTaskId !== null) {
      try {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/tasks/${selectedTaskId}`,
          { title: modalTitle, description: modalDescription, isComplete: modalIsComplete },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSelectedTaskId(null);
        fetchTasks();
        closeModal();
      } catch (error) {
        console.error('Error updating task', error);
      }
    }
  };

  // Delete the selected task
  const handleDelete = async () => {
    if (selectedTaskId === null) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${selectedTaskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
      setSelectedTaskId(null);
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const handleLogout = () => {
    setToken(null);
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Tasks</h2>
      <button onClick={handleLogout}>Logout</button>

 
      <table border={1} cellPadding={5} style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Select</th>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td style={{ textAlign: 'center' }}>
                <input
                  type="radio"
                  name="selectedTask"
                  checked={selectedTaskId === task.id}
                  onChange={() => setSelectedTaskId(task.id)}
                />
              </td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td style={{ textAlign: 'center' }}>{task.isComplete ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>

    
      <div style={{ marginTop: '20px' }}>
        <button onClick={openCreateModal} >
          Create Task
        </button>
        <button onClick={openEditModal} disabled={selectedTaskId === null}>
          Edit Task
        </button>
        <button onClick={handleDelete} disabled={selectedTaskId === null}>
          Delete Task
        </button>
      </div>

   
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '5px',
              minWidth: '300px',
            }}
          >
            <h3>{modalType === 'create' ? 'Create Task' : 'Edit Task'}</h3>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={modalTitle}
                onChange={(e) => setModalTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                value={modalDescription}
                onChange={(e) => setModalDescription(e.target.value)}
              />
            </div>
       <> 
      { (modalType=='edit') && (<div>
              <label>
                Completed:
                <input
                  type="checkbox"
                  checked={modalIsComplete}
                  onChange={(e) => setModalIsComplete(e.target.checked)}
                />
              </label>
            </div>)}
            </>
            <div style={{ marginTop: '10px' }}>
              <button onClick={handleSaveModal}>Save</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
