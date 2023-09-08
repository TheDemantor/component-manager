import React from 'react'
import { Row, Col, ListGroup, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import components from '../components2'

const ComponetInCat = () => {
  const items = components;
  return (
    <div>
      <ListGroup variant="flush" className='mx-3 px-3'>
        {items.map((item, index) => ( 
          item.parent_id==="000" &&
          (<ListGroup.Item key={index}>
            <Row>
              <Col md={1}>
                <Image src={item.image} alt={item.name} fluid rounded />
              </Col>
              <Col >
                <Link to={`/components/${item._id}`}>
                  {item.component_name}
                </Link>
              </Col>
            </Row>
          </ListGroup.Item>)
        ))}
      </ListGroup>
    </div>
  )
}

export default ComponetInCat