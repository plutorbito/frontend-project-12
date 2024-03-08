import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';

const NavbarElement = () => {
  const { t } = useTranslation();
  const { loggedIn, logOut, username } = useAuth();
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {t('navbar.brand')}
        </Navbar.Brand>
        {loggedIn && (
          <Navbar>
            <Container>
              <Navbar.Brand>
                <b>{username ?? null}</b>
              </Navbar.Brand>
            </Container>
          </Navbar>
        )}
        {loggedIn && <Button onClick={logOut}>{t('navbar.logout')}</Button>}
      </Container>
    </Navbar>
  );
};

export default NavbarElement;
