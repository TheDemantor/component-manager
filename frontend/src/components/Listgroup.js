import {Col, Row, Tab, ListGroup} from 'react-bootstrap';
import ComponetInCat from './ComponetInCat';
import Button from 'react-bootstrap/Button';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';


import { 
  useCreateComponentMutation, 
} from '../slices/componentApiSlice';


const Listgroup= ()=> {
//For the mutation 
const [createComponent, { isLoading: loadingCreate }] = useCreateComponentMutation();

const createComponentHandler = async () => {
  // console.log("new Components");
  try {
    await createComponent();
    console.log("success")
    // refetch();
  } catch (err) {
    toast.error(err?.data?.message || err.error);
  }
};
  return (
    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1" >
      <Row>
        <Col sm={4}>
          <Row>
          <ListGroup >
            
            <ListGroup.Item variant="light" action href="#link1" className='d-flex justify-content-between'>
              Laptop Components
          <Button variant="outline-warning" size="sm" onClick={createComponentHandler}><FaPlus/> Create New</Button>

            </ListGroup.Item>
            <ListGroup.Item variant="light" action href="#link2" className='d-flex justify-content-between'>
              Robotic components
              <Button variant="outline-warning" size="sm"><FaPlus/> Create New</Button>
            </ListGroup.Item>
          </ListGroup>
          </Row>
         

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