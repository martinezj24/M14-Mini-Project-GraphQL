import { useEffect, useState } from 'react';
import { Spinner, Alert, ListGroup, Button } from 'react-bootstrap';
import { gql, request } from 'graphql-request';

const TODOS_QUERY = gql`
  query GetTodos {
    todos {
      data {
        id
        title
        completed
      }
    }
  }
`;

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodosResponse {
  todos: {
    data: Todo[];
  };
}

function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await request<TodosResponse>('https://graphqlzero.almansi.me/api', TODOS_QUERY);
        setTodos(response.todos.data);
      } catch (err) {
        setError('Failed to fetch todos.');
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <ListGroup>
      {todos.map(todo => (
        <ListGroup.Item key={todo.id}>
          <div className="d-flex justify-content-between align-items-center">
            <span>{todo.title}</span>
            <Button
              variant={todo.completed ? 'success' : 'warning'}
              disabled
            >
              {todo.completed ? 'Completed' : 'Incomplete'}
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Todos;
