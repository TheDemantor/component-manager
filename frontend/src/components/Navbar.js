import {Container, Navbar, Form, Button, Image} from 'react-bootstrap';
import SearchBar from './SearchBar';

function Nav() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
           
           <span className='text-warning'>
            <strong>ACE</strong> - Manufacturing India
            </span> 
          </Navbar.Brand>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-warning">Search</Button>
            <SearchBar/>
          </Form>
        </Container>
      </Navbar>
    </>
  );
}

export default Nav;