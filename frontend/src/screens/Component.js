import Components from '../components2'
import { useState } from 'react';
import { Col, Row, ListGroup, Card, Button, Form, Image, Container, Dropdown } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MdOutlinePending } from 'react-icons/md';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';

import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

import ComponentTree from '../components/ComponentTree'
import EditChild from '../components/EditChild'
// import { useDispatch, useSelector } from 'react-redux';
// import Rating from '../components/rating'
// import axios from 'axios';
// import { useGetProductsDetailsQuery, useCreateReviewMutation } from "../slices/productApiSlice";
// import { addToCart } from '../slices/cartSlice';
// import Message from "../components/Message";
// import Loading from "../components/Loading";
import { toast } from 'react-toastify';


const Component = () => {
  // const item = products.find((p) => p._id === itemId);

  const { id: itemId } = useParams();
  const item = Components.find(i => i._id.$oid === itemId);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const parent = item.parent_id === "000" ? null : Components.find(i => i._id.$oid === item.parent_id);
  // const [rating, setRating] = useState(0);
  // const [comment, setComment] = useState('');

  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  //USING CONTEXT API
  // const [item, setItem] =useState({});

  // useEffect(()=>{
  //   const fetchItem = async ()=>{
  //       const { data } = await axios.get(`/api/products/${itemId}`);
  //       setItem(data);
  //   };
  //   fetchItem();
  // },[itemId]);

  //USING REDUX 

  // const { data: item, refetch, isLoading, error } = useGetProductsDetailsQuery(itemId);

  // const [createReview, { isLoading: loadingProductReview }] =
  //   useCreateReviewMutation();

  const checkoutHandler = () => {
    // navigate('/login?redirect=/shipping')
  }

  const submitHandler = async (e) => {
    // e.preventDefault();

    // try {
    //   await createReview({
    //     itemId,
    //     rating,
    //     comment,
    //     user: userInfo
    //   }).unwrap();
    //   refetch();
    //   toast.success('Review created successfully');
    // } catch (err) {
    //   console.log(err.error)
    //   toast.error(err?.data?.message || err.error);
    // }
  };

  return (
    <div >
      <Link to='/' ><Button variant="outline-dark" className='btn gb-btn btn-light mx-1 my-3' >
        Go back</Button>
      </Link>

      {/* {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger"> {error.data?.massage || error.status} </Message>
      ) : ( */}
      <>

        <Row className='productSpace'>
          <Col md={4} id='productPresentation'>

            <Image src={item.image} alt={item.name} fluid rounded />

          </Col>
          <Col md={8} id='productDetails'>
            {/* <Row > */}

            <ListGroup variant='flush' className='t-left'>
              <ListGroup.Item >
                <h2>{item.component_name}</h2>
                Parent : {parent === null ? "NULL" : parent.component_name}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Quality Index : {item.quality_index}</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                Current Status : {item.status === "research" ? "Component under research." : item.status === "future" ? "This component is under future plan." : "Component is ready"}
              </ListGroup.Item>
              <ListGroup.Item>
                Description : {item.description}
              </ListGroup.Item>
            </ListGroup>
            <Container>
              <Row className='d-flex justify-content-start'>

                <Col >
                  <Button variant="success" className='btn-sm'><FaPlus /> Create New child</Button>
                </Col>

                <Col >

                  <Dropdown >
                    <Dropdown.Toggle variant='warning' className='btn-sm mx-2' id="dropdown-basic">
                      <FaEdit /> Edit child
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {item.component_child.map((ch, ind) => (
                        <Dropdown.Item eventKey={ind} className='d-flex justify-content-start'>
                          {ch.child_id.$oid}
                        </Dropdown.Item>
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
                      {item.component_child.map((ch, ind) => (
                        <Dropdown.Item eventKey={ind} className='d-flex justify-content-start'>
                          {ch.child_id.$oid}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

              </Row>
            </Container>
          </Col>
          {/* </Row> */}
        </Row>
        <Row>
          <Col md={4} className='text-left px-4'>
            {item.status === "research" && (<Row>
              <h2>Write a Recommendation</h2>

              {/* {loadingProductReview && <Loading />} */}

              {/* {userInfo ? ( */}
              <Form onSubmit={submitHandler} className='p-4 t-left' >
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
                  // disabled={loadingProductReview}
                  type='submit'
                  variant='primary'
                >
                  Submit
                </Button>
              </Form>
            </Row>)};
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
          </Col>
          <Col md={8}>
            <ComponentTree item={item} parent={parent} />
          </Col>
        </Row>
      </>

    </div>
  )
}
export default Component