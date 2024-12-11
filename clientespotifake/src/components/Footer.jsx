import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
    return (
        <Navbar expand="lg" style={{backgroundColor: "#1DB954"}} fixed="bottom">
            <Container className="d-flex justify-content-center">
                <Navbar.Text>SpotiFaique</Navbar.Text>
            </Container>
        </Navbar>
    );
}

export default Footer;
