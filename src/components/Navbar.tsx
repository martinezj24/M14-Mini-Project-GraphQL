import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';

function Navbar() {
  return (
    <BootstrapNavbar bg="light" expand="md">
      <BootstrapNavbar.Brand as={Link} to="/">Dashboard</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
      <BootstrapNavbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
          <Nav.Link as={Link} to="/albums">Albums</Nav.Link>
          <Nav.Link as={Link} to="/todos">Todos</Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}

export default Navbar;
