import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const NavbarElement = () => {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Chat</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavbarElement;
