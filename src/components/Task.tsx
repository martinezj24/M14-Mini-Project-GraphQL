import { useEffect, useState } from 'react';
import { gql, request } from 'graphql-request';
import { ListGroup, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TASKS_QUERY = gql`
  query GetTasks {
    tasks {
      data {
        id
        title
        description
      }
    }
  }
`;

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

function Tasks() {
    const [tasks, setTasks] = useState<{ id: number; title: string; description: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await request<{ tasks: { data: { id: number; title: string; description: string }[] } }>(
                    'https://graphqlzero.almansi.me/api',
                    TASKS_QUERY
                );
                setTasks(response.tasks.data);
            } catch (err) {
                setError('Failed to fetch tasks.');
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await request('https://graphqlzero.almansi.me/api', DELETE_TASK_MUTATION, { id });
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            console.error('Failed to delete task:', err);
        }
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <Link to="/tasks/create" className="btn btn-primary mb-3">Create Task</Link>
            <ListGroup>
                {tasks.map(task => (
                    <ListGroup.Item key={task.id}>
                        <div className="d-flex justify-content-between align-items-center">
                            <span>{task.title}</span>
                            <div>
                                <Link to={`/tasks/edit/${task.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(task.id)}>Delete</Button>
                            </div>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default Tasks;
