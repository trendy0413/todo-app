'use client';

import React from 'react';
import { Task } from '@/context/TaskContext';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = React.memo(({ task }) => {
  const isOverdue = new Date(task.dueDate) < new Date();

  return (
    <div
      className={`${
        isOverdue ? 'bg-red-50' : 'bg-gray-50'
      } border border-gray-200 rounded-lg p-4 transition-shadow hover:shadow-md`}
      data-testid="task-item"
    >
      <h2 className="font-bold text-lg">{task.title}</h2>
      <p className="text-gray-700">{task.description}</p>
      <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
      <p
        className={`text-sm ${
          task.status === 'Completed' ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {task.status}
      </p>
    </div>
  );
});

TaskItem.displayName = 'TaskItem';

export default TaskItem;
