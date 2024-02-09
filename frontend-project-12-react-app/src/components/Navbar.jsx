import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../hooks';

const NavbarElement = () => {
  console.log(useAuth());
  const { loggedIn, logOut } = useAuth();
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Chat
        </Navbar.Brand>
        {loggedIn && <Button onClick={logOut}>Выйти</Button>}
      </Container>
    </Navbar>
  );
};

export default NavbarElement;
