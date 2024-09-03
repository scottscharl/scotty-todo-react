import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

export default function App() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, { task: newItem, completed: false }]);
      setNewItem("");
    }
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    setItems(
      items.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const editItem = (index, newTask) => {
    setItems(
      items.map((item, i) => (i === index ? { ...item, task: newTask } : item))
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (newItem.trim()) {
        setItems([...items, { task: newItem, completed: false }]);
        setNewItem("");
      }
    }
  };

  return (
    <div className="App">
      <h1>Scotty's Task List</h1>
      <div>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Task"
          onKeyPress={handleKeyPress}
        />
        <button onClick={addItem}>Add</button>
      </div>
      <div>
        <h2>Tasks</h2>
        {items.length > 0 ? (
          <button onClick={() => setItems([])}>
            Delete all {items.length} task(s).
          </button>
        ) : (
          <i>no tasks</i>
        )}
        {items.map((item, index) => (
          <Task
            key={index}
            item={item}
            index={index}
            onDelete={deleteItem}
            onToggleComplete={toggleComplete}
            onEdit={editItem}
          />
        ))}
      </div>
    </div>
  );
}

function Task({ item, index, onDelete, onToggleComplete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(item.task);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    onEdit(index, editedTask);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    }
  };

  if (isEditing) {
    return (
      <div className="Task">
        <input
          ref={inputRef}
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleEdit}>Save</button>
      </div>
    );
  }

  return (
    <div className="Task">
      <button onClick={() => onDelete(index)}>Delete</button>
      <button onClick={() => setIsEditing(true)} disabled={item.completed}>
        Edit
      </button>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggleComplete(index)}
      />
      <span
        style={{ textDecoration: item.completed ? "line-through" : "none" }}
      >
        {index + 1}. {item.task}
      </span>
    </div>
  );
}
