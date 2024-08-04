import { useEffect, useState } from 'react';
import { Card, Spinner, Alert, ListGroup } from 'react-bootstrap';
import { gql, request } from 'graphql-request';
import { useParams } from 'react-router-dom';

const POST_DETAILS_QUERY = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      body
      comments {
        id
        body
      }
    }
  }
`;

interface Comment {
  id: number;
  body: string;
}

interface PostDetails {
  id: number;
  title: string;
  body: string;
  comments: Comment[];
}

interface PostDetailsResponse {
  post: PostDetails;
}

function PostDetails() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        if (id) {
          const response = await request<PostDetailsResponse>('https://graphqlzero.almansi.me/api', POST_DETAILS_QUERY, { id });
          setPost(response.post);
        }
      } catch (err) {
        setError('Failed to fetch post details.');
      } finally {
        setLoading(false);
      }
    };
    fetchPostDetails();
  }, [id]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return post ? (
    <Card>
      <Card.Header>{post.title}</Card.Header>
      <Card.Body>
        <Card.Text>{post.body}</Card.Text>
        <ListGroup variant="flush">
          {post.comments.map(comment => (
            <ListGroup.Item key={comment.id}>{comment.body}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  ) : null;
}

export default PostDetails;
