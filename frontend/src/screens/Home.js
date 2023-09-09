import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Listgroup from '../components/Listgroup'
const Home = () => {
  return (
    <div className='p-5'>
      <Row>
        <Col md={3}><h3>Categories</h3></Col>
        {/* <Col md={3}></Col> */}
      </Row>
      <Row>
        <Listgroup/>
      </Row>
      



      
    </div>
  )
}

export default Home