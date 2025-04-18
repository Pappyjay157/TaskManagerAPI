import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";



const API_URL = "https://taskmanagerapi-7.onrender.com/api/task";

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
    console.log("Submitting new task:", newTask);
  
    axios.post(API_URL, newTask)
      .then((res) => {
        setTasks((prev) => [...prev, res.data]);
        setNewTask({ title: "", description: "", isComplete: false });
        toast.success("Task added successfully!");
      })
      .catch(err => {
        console.error("Error adding task:", err);
        toast.error("Failed to add task.");
      });
  };
  

  
  
  // DELETE request
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        fetchTasks();
        toast.success("Task deleted.");
      })
      .catch(err => {
        console.error("Error deleting task:", err);
        toast.error("Failed to delete task.");
      });
  };
  
  
  // PUT request to toggle isComplete
  const handleToggle = (task) => {
    const updatedTask = { ...task, isComplete: !task.isComplete };
    axios.put(`${API_URL}/${task.id}`, updatedTask)
      .then(() => {
        fetchTasks();
        toast.success(
          `Marked as ${updatedTask.isComplete ? "complete ✅" : "pending ❌"}`
        );
      })
      .catch(err => {
        console.error("Error updating task:", err);
        toast.error("Failed to update task.");
      });
  };
  
  


  return (
    
    <div className="min-h-screen bg-gray-100 p-4">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#fff',
              color: '#333',
              border: '1px solid #ccc'
            }
          }}
        />
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
        <button
              type="submit"
              className={`px-4 py-2 rounded font-semibold shadow transition 
                ${newTask.title.trim() === "" 
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                  : "bg-blue-600 text-white hover:bg-blue-700"}`}
              disabled={newTask.title.trim() === ""}
            >
              Add Task
            </button>

        </form>

      {/* Task List */}
      <ul className="space-y-3">
        <AnimatePresence>
            {tasks.map(task => (
            <motion.li
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                layout
                className="p-4 bg-white text-gray-900 border rounded shadow"
            >
                <h2 className="text-lg font-bold text-gray-900">{task.title}</h2>
                <p className="text-gray-700">{task.description}</p>
                <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-gray-500">
                    Status: {task.isComplete ? "✅ Done" : "❌ Pending"}
                </p>
                <div className="space-x-2">
                    <button
                    onClick={() => handleToggle(task)}
                    className="px-2 py-1 text-xs bg-yellow-400 text-white rounded shadow"
                    >
                    Toggle
                    </button>
                    <button
                    onClick={() => handleDelete(task.id)}
                    className="px-2 py-1 text-xs bg-yellow-400 text-white rounded shadow"
                    >
                    Delete
                    </button>
                </div>
                </div>
            </motion.li>
            ))}
        </AnimatePresence>
        </ul>

    </div>
    </div>
  );
}

export default TaskList;
