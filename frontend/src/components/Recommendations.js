// Recommendations.js

import React, { useState } from 'react';
import { Form, Button, Row, Col, Container, ListGroup } from 'react-bootstrap';
import { useCreateRecommendationMutation } from "../slices/componentApiSlice";
import { toast } from 'react-toastify';
import { MdOutlinePending } from 'react-icons/md';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import Message from "../components/Message";
import Loading from "../components/Loading";

const Recommendations = (item) => {
  const itemId = item._id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const [createRecommendation, { isLoading: loadingRecommendations }] = useCreateRecommendationMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createRecommendation({
        itemId,
        name,
        email,
        recommendation
      }).unwrap();
      toast.success('Recommendation submitted successfully');
      // Reset the form fields after successful submission
      setName('');
      setEmail('');
      setRecommendation('');
    } catch (err) {
      console.log(err.error)
      toast.error(err?.data?.message || err.error);
    }
  };
  
  return (
    <>
        <h2>Write a Recommendation</h2>
      {loadingRecommendations && <Loading />}
        <Form onSubmit={submitHandler} className='p-4 t-left'>
          <Form.Group controlId='name' className='my-3'>
            <Form.Label>Your full name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your good name.'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email' className='my-3'>
            <Form.Label>Email Id</Form.Label>
            <Form.Control
              type='email'
              placeholder="Enter your researcher's email address."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password' className='my-3'>
            <Form.Label>Recommendation</Form.Label>
            <Form.Control
              as='textarea'
              row='2'
              placeholder='Provide your recommendation please.'
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            disabled={loadingRecommendations}
            type='submit'
            variant='primary'
          >
            Submit
          </Button>
        </Form>
      {/* Render the list of recommendations here */}
      <Row className='m-3 t-left'>
        <h2>Recommendation</h2>
        <Container>
          <ListGroup  >

            {
              item.recommendation.map((recom, index) => (
                (<ListGroup.Item key={index} className='p-1'>
                  <Row>
                    <Col md={10}>
                      {recom.researcher_name}<br />
                      {recom.researcher_mail}
                    </Col>
                    <Col md={2}>
                      {recom.status === true ? <BsFillBookmarkCheckFill style={{ color: 'green' }} /> : <MdOutlinePending style={{ color: 'red' }} />}
                    </Col>
                  </Row>
                  <Row className='px-3'>
                    {recom.recommendation}
                  </Row>
                </ListGroup.Item>)
              ))
            }
          </ListGroup>
        </Container>
      </Row>
    </>
  );
};

export default Recommendations;
