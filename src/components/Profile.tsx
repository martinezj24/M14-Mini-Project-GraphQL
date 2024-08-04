import { useEffect, useState } from 'react';
import { Card, Spinner, Alert } from 'react-bootstrap';
import { gql, request } from 'graphql-request';

// GraphQL query to fetch user profile with all required details
const PROFILE_QUERY = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      address {
        street
        suite
        city
        zipcode
      }
      phone
      website
      company {
        name
        catchPhrase
        bs
      }
    }
  }
`;

// Define TypeScript interfaces for the user data
interface UserProfile {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface ProfileResponse {
  user: UserProfile;
}

function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await request<ProfileResponse>('https://graphqlzero.almansi.me/api', PROFILE_QUERY, { id: 1 });
        setProfile(response.user);
      } catch (err) {
        setError('Failed to fetch user profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return profile ? (
    <Card>
      <Card.Header>Profile</Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>ID:</strong> {profile.id}
        </Card.Text>
        <Card.Text>
          <strong>Name:</strong> {profile.name}
        </Card.Text>
        <Card.Text>
          <strong>Email:</strong> {profile.email}
        </Card.Text>
        <Card.Text>
          <strong>Address:</strong> {profile.address.street}, {profile.address.suite}, {profile.address.city}, {profile.address.zipcode}
        </Card.Text>
        <Card.Text>
          <strong>Phone:</strong> {profile.phone}
        </Card.Text>
        <Card.Text>
          <strong>Website:</strong> <a href={`http://${profile.website}`} target="_blank" rel="noopener noreferrer">{profile.website}</a>
        </Card.Text>
        <Card.Text>
          <strong>Company:</strong> {profile.company.name} - {profile.company.catchPhrase} ({profile.company.bs})
        </Card.Text>
      </Card.Body>
    </Card>
  ) : null;
}

export default Profile;
