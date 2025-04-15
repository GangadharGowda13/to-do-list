import React, { useState, useEffect } from "react";
import "./App.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TaskIcon from "@mui/icons-material/Task";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState("");
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleKey(event) {
    if (event.key === "Enter") {
      addTask();
    }
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, { text: newTask, completed: false }]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function completedTask(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleKey}
        />
        <button className="add-button" onClick={addTask}>
          ADD
        </button>
        <div className="content-style">
          <ol>
            {tasks.map((task, index) => (
              <li key={index} className={task.completed ? "completed" : ""}>
                <span className="text">{task.text}</span>
                <button
                  className="delete-button"
                  title="Delete"
                  onClick={() => deleteTask(index)}
                >
                  <DeleteForeverIcon />
                </button>
                <button
                  className="complete-button overline-text"
                  title="Completed"
                  onClick={() => completedTask(index)}
                >
                  <TaskIcon />
                </button>
                <button
                  className="move-button"
                  title="moveUp"
                  onClick={() => moveTaskUp(index)}
                >
                  👆
                  
                </button>
                <button
                  className="move-button"
                  title="moveDown"
                  onClick={() => moveTaskDown(index)}
                >
                  👇
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
