import {Col, Row, Tab, ListGroup} from 'react-bootstrap';
import ComponetInCat from './ComponetInCat';


function Listgroup() {
  return (
    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1" >
      <Row>
        <Col sm={4}>
          <ListGroup >
            <ListGroup.Item variant="light" action href="#link1">
              Laptop Components
            </ListGroup.Item>
            <ListGroup.Item variant="light" action href="#link2">
              Robotic components
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content>
            <Tab.Pane eventKey="#link1">
              <ComponetInCat/>
            </Tab.Pane>
            <Tab.Pane eventKey="#link2">Tab pane content 2</Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default Listgroup;