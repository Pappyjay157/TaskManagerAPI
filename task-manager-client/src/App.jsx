import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskList from "./TaskList";


function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <TaskList />
    </div>
  );
}

export default App
