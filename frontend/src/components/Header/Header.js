import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form'; 
import { Link, useNavigate } from 'react-router-dom';   // ← заменили useHistory
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'; // 

const Header = () => {
  const navigate = useNavigate(); 

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/'); // перенаправляем на главную страницу после выхода
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="primary" variant='dark'>
      <Container>
        <Navbar.Brand>
          <Link to='/'>Notes</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Form>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
          </Nav>
          <Nav className="me-auto">
            <Nav.Link href="/mynotes">My Notes</Nav.Link>
            <NavDropdown title="Dinyar" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item 
                onClick={logoutHandler}
              >
                LogOut
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;