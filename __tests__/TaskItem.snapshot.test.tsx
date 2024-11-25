import renderer from 'react-test-renderer';
import TaskItem from '@/components/TaskItem';
import { Task } from '@/context/TaskContext';

describe('TaskItem Snapshots', () => {
  it('renders TaskItem snapshot correctly', () => {
    const task: Task = {
      id: '1',
      title: 'Snapshot Task',
      description: 'Snapshot Description',
      status: 'Pending',
      dueDate: '2024-12-31',
    };

    const tree = renderer.create(<TaskItem task={task} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders overdue TaskItem snapshot correctly', () => {
    const overdueTask: Task = {
      id: '2',
      title: 'Overdue Task',
      description: 'Past due date',
      status: 'Pending',
      dueDate: '2023-01-01',
    };

    const tree = renderer.create(<TaskItem task={overdueTask} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
