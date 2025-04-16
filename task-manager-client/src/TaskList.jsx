import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5012/api/task";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    isComplete: false
  });

  // Fetch all tasks
  const fetchTasks = () => {
    axios.get(API_URL)
      .then(res => setTasks(res.data))
      .catch(err => console.error("Error fetching tasks:", err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting new task:", newTask); // ← Add this
  
    axios.post(API_URL, newTask)
      .then(() => {
        fetchTasks();
        setNewTask({ title: "", description: "", isComplete: false });
      })
      .catch(err => console.error("Error adding task:", err));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">My Tasks</h1>

      {/* Task Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6 bg-white p-4 rounded shadow">
        <input
            name="title"
            placeholder="Task title"
            value={newTask.title}
            onChange={handleChange}
            className="w-full p-2 border rounded text-gray-800 bg-white"
            required
        />
        <textarea
            name="description"
            placeholder="Task description"
            value={newTask.description}
            onChange={handleChange}
            className="w-full p-2 border rounded text-gray-800 bg-white"
        />
        <label className="flex items-center space-x-2 text-gray-800">
            <input
            type="checkbox"
            name="isComplete"
            checked={newTask.isComplete}
            onChange={handleChange}
            className="accent-blue-600"
            />
            <span>Mark this task as complete</span>
        </label>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Task
        </button>
        </form>

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.map(task => (
          <li key={task.id} className="p-4 bg-white border rounded shadow">
            <h2 className="font-semibold">{task.title}</h2>
            <p>{task.description}</p>
            <p className="text-sm text-gray-500">
              Status: {task.isComplete ? "✅ Done" : "❌ Pending"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
