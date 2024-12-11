import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Menu() {
  return (
    <Navbar expand="lg" style={{backgroundColor: "#1DB954"}}>
      <Container>
        <Navbar.Brand href="/">SpotiFaique</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/artistas">Artistas</Nav.Link>
            <Nav.Link href="/albuns">Álbuns</Nav.Link>
            <Nav.Link href="/musicas">Músicas</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;