import React from 'react'
import { Dropdown, Button, Container, Row, Col } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; // Import icons you need


const ChildCrud = () => {
  const { data: allItems, isLoading: itemsLoading, error: itemsError } = useGetComponentsQuery({});

  return (
    <Container>
      <Row className='d-flex justify-content-start'>
        <Col >
          {/* <Button variant="success" className='btn-sm'></Button> */}
          <Dropdown >
            <Dropdown.Toggle variant='success' className='btn-sm mx-2' id="dropdown-basic">
              <FaPlus /> Create New child
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {itemsLoading ? (
                <Loading />
              ) : itemsError ? (
                <Message variant="danger"> {itemsError?.data?.massage || itemsError.error} {console.log(itemsError)}</Message>

              ) : (
                allItems.map((comp, ind) => (
                  <Dropdown.Item key={ind} className='d-flex justify-content-start'>
                    <Button
                      variant='outline-success'
                      className='btn-sm'
                      onClick={() => connectChildHandler(comp._id)}
                    >
                      {comp.component_name}

                    </Button>
                  </Dropdown.Item>
                )))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col >

          <Dropdown >
            <Dropdown.Toggle variant='warning' className='btn-sm mx-2' id="dropdown-basic">
              <FaEdit /> Edit child
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {!childrenLoading && (children.map((ch, ind) => (
                <Dropdown.Item eventKey={ind} className='d-flex justify-content-start'>
                  <Button
                    variant='outline-warning'
                    className='btn-sm'
                    onClick={() => editHandler(ch.child_id, ch.weight)}
                  >

                    {loadingConnectChild ? (<Loading />) : <>{ch.component_name}</>}

                  </Button>
                </Dropdown.Item>
              )
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col >

          <Dropdown >
            <Dropdown.Toggle variant='danger' className='btn-sm mx-2' id="dropdown-basic">
              <FaTrash /> Delete child
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {!childrenLoading && (children.map((ch, ind) => (
                <Dropdown.Item eventKey={ind} className='d-flex justify-content-start'>


                  <Button
                    variant='outline-danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(ch.child_id)}
                  >
                    {ch.component_name}

                  </Button>

                </Dropdown.Item>
              )
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

      </Row>
    </Container>
  )
}

export default ChildCrud