import { useState } from 'react';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import './styles.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addTask = (task) => setTasks([...tasks, task]);
  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));
  const toggleDone = (id) => setTasks(tasks.map((task) =>
    task.id === id ? { ...task, done: !task.done } : task
  ));
  const editTask = (id, updatedTask) => setTasks(tasks.map((task) =>
    task.id === id ? { ...task, ...updatedTask } : task
  ));

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <input
        className="search"
        type="text"
        placeholder="Поиск"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="columns">
        <div className="column">
          <h2>Активные</h2>
          {filteredTasks.filter(t => !t.done).map(task => (
            <TaskCard key={task.id} {...task} onDelete={deleteTask} onToggle={toggleDone} onEdit={editTask} />
          ))}
        </div>
        <div className="column">
          <h2>Завершенные</h2>
          {filteredTasks.filter(t => t.done).length === 0
            ? <p>Список задач пуст</p>
            : filteredTasks.filter(t => t.done).map(task => (
              <TaskCard key={task.id} {...task} onDelete={deleteTask} onToggle={toggleDone} onEdit={editTask} />
            ))}
        </div>
      </div>
      <TaskForm onAdd={addTask} />
    </div>
  );
}

export default App;
