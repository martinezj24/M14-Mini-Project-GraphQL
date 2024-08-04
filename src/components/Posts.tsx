import React, { useEffect, useState } from 'react';
import { Card, Spinner, Alert, Button } from 'react-bootstrap';
import { gql, request } from 'graphql-request';
import { Link } from 'react-router-dom';

const POSTS_QUERY = gql`
  query GetPosts {
    posts(options: { paginate: { page: 1, limit: 10 } }) {
      data {
        id
        title
        body
      }
    }
  }
`;

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsResponse {
  posts: {
    data: Post[];
  };
}

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await request<PostsResponse>('https://graphqlzero.almansi.me/api', POSTS_QUERY);
        setPosts(response.posts.data);
      } catch (err) {
        setError('Failed to fetch posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <>
      {posts.map(post => (
        <Card key={post.id} className="mb-3">
          <Card.Header>{post.title}</Card.Header>
          <Card.Body>
            <Card.Text>{post.body}</Card.Text>
            <Button as={Link} to={`/posts/${post.id}`} variant="primary">
              View Details
            </Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default Posts;
