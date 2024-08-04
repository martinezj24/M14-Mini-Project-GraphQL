import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

interface Task {
  id?: number;
  title: string;
  description: string;
}

interface TaskFormProps {
  onSave: (task: Task) => void;
  existingTask?: Task;
}

function TaskForm({ onSave, existingTask }: TaskFormProps) {
  const [title, setTitle] = useState<string>(existingTask?.title || '');
  const [description, setDescription] = useState<string>(existingTask?.description || '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
    }
  }, [existingTask]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim() === '' || description.trim() === '') {
      setError('Title and description are required.');
      return;
    }
    onSave({ id: existingTask?.id, title, description });
    setTitle('');
    setDescription('');
    setError(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
}

export default TaskForm;
