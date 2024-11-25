'use client';

import React, { createContext, useReducer, useContext } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
}

type TaskState = Task[];

interface TaskContextProps {
  tasks: TaskState;
  addTask: (task: Task) => void;
  editTask: (id: string, updatedTask: Task) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextProps | null>(null);

const taskReducer = (state: TaskState, action: any): TaskState => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'EDIT_TASK':
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  const addTask = (task: Task) => dispatch({ type: 'ADD_TASK', payload: task });
  const editTask = (id: string, updatedTask: Task) =>
    dispatch({ type: 'EDIT_TASK', payload: { id, updatedTask } });
  const deleteTask = (id: string) => dispatch({ type: 'DELETE_TASK', payload: id });

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
};
