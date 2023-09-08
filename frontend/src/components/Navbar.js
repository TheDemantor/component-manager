import {Container, Navbar, Form, Button} from 'react-bootstrap';

function Nav() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="./logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
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
          </Form>
        </Container>
      </Navbar>
    </>
  );
}

export default Nav;