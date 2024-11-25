'use client';

import React, { useState } from 'react';
// import { useTasks } from './context/TaskContext';
import { useTasks } from '@/context/TaskContext';

const TaskForm: React.FC = () => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<'Pending' | 'In Progress' | 'Completed'>('Pending');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !dueDate) {
      alert('Title and Due Date are required!');
      return;
    }

    const newTask = {
      id: Date.now().toString(), // Generate a unique ID
      title,
      description,
      dueDate,
      status,
    };

    addTask(newTask);

    // Clear the form fields
    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus('Pending');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>
      
      <input
        type="text"
        placeholder="Title"
        className="border rounded-md p-2 w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      
      <textarea
        placeholder="Description"
        className="border rounded-md p-2 w-full mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      
      <input
        type="date"
        className="border rounded-md p-2 w-full mb-2"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      
      <select
        className="border rounded-md p-2 w-full mb-4"
        value={status}
        onChange={(e) => setStatus(e.target.value as 'Pending' | 'In Progress' | 'Completed')}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md w-full"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
