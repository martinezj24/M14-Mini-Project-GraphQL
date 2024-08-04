import { useNavigate } from 'react-router-dom';
import { gql, request } from 'graphql-request';
import TaskForm from './TaskForm';

const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($title: String!, $description: String!) {
    createTask(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

function CreateTask() {
  const navigate = useNavigate();

  const handleSave = async (task: { title: string; description: string }) => {
    try {
      await request('https://graphqlzero.almansi.me/api', CREATE_TASK_MUTATION, task);
      navigate('/tasks');
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  return (
    <div>
      <h1>Create Task</h1>
      <TaskForm onSave={handleSave} />
    </div>
  );
}

export default CreateTask;

