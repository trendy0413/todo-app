import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TaskItem from '@/components/TaskItem';
import { Task } from '@/context/TaskContext';

describe('TaskItem', () => {
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'Pending',
    dueDate: '2024-12-31',
  };

  it('renders task details correctly', () => {
    render(<TaskItem task={mockTask} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Due: 2024-12-31')).toBeInTheDocument();
  });

  it('applies correct styling for overdue tasks', () => {
    const overdueTask: Task = {
      ...mockTask,
      dueDate: '2023-01-01', // Past date
    };

    render(<TaskItem task={overdueTask} />);
    const taskElement = screen.getByTestId('task-item');
    expect(taskElement).toHaveClass('bg-red-50');
  });

  it('applies correct styling for non-overdue tasks', () => {
    const futureTask: Task = {
      ...mockTask,
      dueDate: '2025-12-31', // Future date
    };

    render(<TaskItem task={futureTask} />);
    const taskElement = screen.getByTestId('task-item');
    expect(taskElement).toHaveClass('bg-gray-50');
  });

  it('applies correct status color for completed tasks', () => {
    const completedTask: Task = {
      ...mockTask,
      status: 'Completed',
    };

    render(<TaskItem task={completedTask} />);
    const statusElement = screen.getByText('Completed');
    expect(statusElement).toHaveClass('text-green-600');
  });

  it('applies correct status color for pending tasks', () => {
    render(<TaskItem task={mockTask} />);
    const statusElement = screen.getByText('Pending');
    expect(statusElement).toHaveClass('text-red-600');
  });
});
