import { useEffect, useState } from 'react';
import { Spinner, Alert, ListGroup } from 'react-bootstrap';
import { gql, request } from 'graphql-request';

const ALBUMS_QUERY = gql`
  query GetAlbums {
    albums {
      data {
        id
        title
      }
    }
  }
`;

interface Album {
  id: number;
  title: string;
}

interface AlbumsResponse {
  albums: {
    data: Album[];
  };
}

function Albums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await request<AlbumsResponse>('https://graphqlzero.almansi.me/api', ALBUMS_QUERY);
        setAlbums(response.albums.data);
      } catch (err) {
        setError('Failed to fetch albums.');
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <ListGroup>
      {albums.map(album => (
        <ListGroup.Item key={album.id}>{album.title}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Albums;
