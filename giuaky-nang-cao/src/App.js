import { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import TaskDetail from './pages/TaskDetail';
import './App.css';

const readSavedTasks = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('gk_tasks'));
    return Array.isArray(saved) ? saved : null;
  } catch (err) {
    return null;
  }
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const loaded = useRef(false);

  useEffect(() => {
    const saved = readSavedTasks();
    if (saved) {
      setTasks(saved);
      loaded.current = true;
      setLoading(false);
      return undefined;
    }

    const controller = new AbortController();

    axios
      .get('/data/tasks.json', { signal: controller.signal })
      .then((res) => {
        if (!Array.isArray(res.data)) {
          throw new Error('Dữ liệu không hợp lệ');
        }
        setTasks(res.data);
        loaded.current = true;
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError('Không tải được dữ liệu');
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (loading || !loaded.current) return;
    localStorage.setItem('gk_tasks', JSON.stringify(tasks));
  }, [tasks, loading]);

  const addTask = (task) => {
    setTasks((prev) => {
      const nextId = prev.reduce((max, { id }) => Math.max(max, id), 0) + 1;
      return [...prev, { id: nextId, ...task, done: false }];
    });
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} error={error} />}>
        <Route index element={<Home tasks={tasks} />} />
        <Route
          path="tasks"
          element={<TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />}
        />
        <Route path="tasks/new" element={<AddTask onAdd={addTask} />} />
        <Route path="tasks/:id" element={<TaskDetail tasks={tasks} />} />
      </Route>
    </Routes>
  );
};

export default App;
