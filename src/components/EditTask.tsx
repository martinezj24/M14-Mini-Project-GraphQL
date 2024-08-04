import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gql, request } from 'graphql-request';
import TaskForm from './TaskForm';

const TASK_QUERY = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      title
      description
    }
  }
`;

const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($id: ID!, $title: String, $description: String) {
    updateTask(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

function EditTask() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<{ id: number; title: string; description: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (id) {
          const response = await request<{ task: { id: number; title: string; description: string } }>(
            'https://graphqlzero.almansi.me/api',
            TASK_QUERY,
            { id }
          );
          setTask(response.task);
        }
      } catch (err) {
        console.error('Failed to fetch task:', err);
      }
    };
    fetchTask();
  }, [id]);

  const handleSave = async (updatedTask: { id?: number; title: string; description: string }) => {
    try {
      if (id && updatedTask.id) {
        await request('https://graphqlzero.almansi.me/api', UPDATE_TASK_MUTATION, {
          id: updatedTask.id,
          title: updatedTask.title,
          description: updatedTask.description,
        });
        navigate('/tasks');
      }
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  return (
    <div>
      <h1>Edit Task</h1>
      {task ? <TaskForm onSave={handleSave} existingTask={task} /> : <p>Loading...</p>}
    </div>
  );
}

export default EditTask;
