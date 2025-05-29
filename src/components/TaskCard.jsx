import { useState } from 'react';

function TaskCard({ id, title, description, done, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const handleSave = () => {
    onEdit(id, { title: newTitle, description: newDescription });
    setIsEditing(false);
  };

  return (
    <div className="task-card">
      <input type="checkbox" checked={done} onChange={() => onToggle(id)} />
      {isEditing ? (
        <>
          <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <input value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
          <button onClick={handleSave}>💾</button>
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <p>{description}</p>
          <button onClick={() => setIsEditing(true)}>✏️</button>
        </>
      )}
      <button onClick={() => onDelete(id)}>🗑️</button>
    </div>
  );
}

export default TaskCard;
