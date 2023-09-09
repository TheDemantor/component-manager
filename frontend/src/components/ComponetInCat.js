import React from 'react'
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import components from '../components2'
import { FaEdit, FaTrash } from 'react-icons/fa';

const ComponetInCat = () => {
  const items = components;
  return (
    <div>
      <ListGroup variant="flush" className='mx-3 px-3 d-flex justify-content-between'>
        {items.map((item, index) => ( 
          item.parent_id==="000" &&
          (<ListGroup.Item key={index}>
            <Row>
              <Col md={1}>
                <Image src={item.image} alt={item.name} fluid rounded />
              </Col>
              <Col >
                <Link to={`/${item._id.$oid}`}>
                  {item.component_name}
                  {/* {item._id.$oid} */}
                </Link>
              </Col>
              <Col md={4}>
              <Link to={`/${item._id}/edit`}>
                <Button variant='outline-warning' className='btn-sm mx-2'>
                  <FaEdit />
                </Button>
              </Link>
              <Button
                variant='outline-danger'
                className='btn-sm'
                // onClick={() => deleteHandler(product._id)}
              >
                <FaTrash  />
              </Button>
              </Col>
            </Row>
          </ListGroup.Item>)
        ))}
      </ListGroup>
    </div>
  )
}

export default ComponetInCat