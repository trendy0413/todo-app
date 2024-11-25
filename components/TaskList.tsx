'use client';

import React from 'react';
import TaskItem from './TaskItem';

const TaskList: React.FC<{ tasks: any[] }> = ({ tasks }) => {
  if (tasks.length === 0) {
    return <p>No tasks available</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
