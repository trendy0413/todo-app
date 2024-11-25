import { render, screen } from '@testing-library/react';
import TaskList from '@/components/TaskList';

describe('TaskList Component', () => {
    it('renders all tasks passed as props', () => {
      const tasks = [
        { id: '1', title: 'Task One', status: 'Pending', dueDate: '2024-12-31' },
        { id: '2', title: 'Task Two', status: 'In Progress', dueDate: '2024-12-31' },
        { id: '3', title: 'Task Three', status: 'Completed', dueDate: '2024-12-31' },
      ];
  
      render(<TaskList tasks={tasks} />);
  
      // Check if all tasks are rendered
      expect(screen.getByText('Task One')).toBeInTheDocument();
      expect(screen.getByText('Task Two')).toBeInTheDocument();
      expect(screen.getByText('Task Three')).toBeInTheDocument();
    });
  
    it('renders the correct number of task items', () => {
      const tasks = [
        { id: '1', title: 'Task One', status: 'Pending', dueDate: '2024-12-31' },
        { id: '2', title: 'Task Two', status: 'In Progress', dueDate: '2024-12-31' },
      ];
  
      render(<TaskList tasks={tasks} />);
  
      // Check if the correct number of TaskItem components is rendered
      const taskItems = screen.getAllByRole('heading', { level: 2 }); // Assuming TaskItem titles are <h2>
      expect(taskItems).toHaveLength(2);
    });
  
    it('renders an empty state when no tasks are provided', () => {
      render(<TaskList tasks={[]} />);
  
      // Check if a fallback message or empty state is rendered
      const emptyMessage = screen.queryByText(/no tasks available/i); // Add such a message in your component if it doesn't exist
      expect(emptyMessage).not.toBeNull(); // Check if the empty message is displayed
    });
  });