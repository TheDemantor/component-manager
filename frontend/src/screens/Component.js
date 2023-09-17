import { useState } from 'react';
import { Col, Row, ListGroup, Card, Button, Form, Image, Container, Dropdown } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

import { MdOutlinePending } from 'react-icons/md';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';

import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

import ComponentTree from '../components/ComponentTree'
import {
  useGetComponentsQuery,
  useGetComponentsDetailsQuery,
  useCreateRecommendationMutation,
  useDeleteChildMutation,
  useUpdateChildMutation,
  useConnectChildMutation,
  useFindChildrenQuery
} from "../slices/componentApiSlice";
import Message from "../components/Message";
import Loading from "../components/Loading";
import BackBtn from "../components/BackBtn";
import { toast } from 'react-toastify';
import Recommendations from '../components/Recommendations';

function calcQI(children) {
  if (children.length === 0) {
    return 0;
  }

  let weightedSum = 0;
  let totalWeight = 0;

  for (const child of children) {
    const { weight, quality_index } = child;
    weightedSum += weight * quality_index;
    totalWeight += weight;
  }

  if (totalWeight === 0) {
    return 0; // Avoid division by zero.
  }

  const weightedMean = weightedSum / totalWeight;
  return weightedMean;
}


const Component = () => {

  const { id: itemId } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const { data: allItems, isLoading: itemsLoading, error: itemsError } = useGetComponentsQuery({});
  const { data: item, refetch, isLoading, error } = useGetComponentsDetailsQuery(itemId);
  const { data: children, isLoading: childrenLoading, refetch: childrenRefetch, error: childrenError } = useFindChildrenQuery(itemId);
  const [createRecommendation, { isLoading: loadingRecommendations }] = useCreateRecommendationMutation();
  // console.log(children)
  const [deleteChild] = useDeleteChildMutation();
  const [updateChild] = useUpdateChildMutation();
  const [connectChild, { isLoading: loadingConnectChild }] = useConnectChildMutation();


  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createRecommendation({
        itemId,
        name, email, recommendation
      }).unwrap();
      refetch();
      toast.success('Recommendation submitted successfully');
    } catch (err) {
      console.log(err.error)
      toast.error(err?.data?.message || err.error);
    }
  };

  const connectChildHandler = async (child_id) => {
    let wt = prompt("Please enter the weight of child in quality index");
    if (wt >= 0 && wt <= 100) {

      try {
        const res = await connectChild({
          id: child_id,
          itemId: itemId,
          weight: wt
        });
        // console.log(res);
        toast.success(res.data.message);
        refetch();
        childrenRefetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
    else {
      toast.error("Weight must be in range [0, 100]");
    }
  }

  const editHandler = async (id, weight) => {
    let wt = prompt("Please enter new weight", `${weight}`);
    if (wt >= 0 && wt <= 100) {

      try {
        const res = await updateChild({
          itemId: itemId,
          id: id,
          weight: wt
        });
        // console.log(res);\
        toast.success(res.data.message);
        refetch();
        childrenRefetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  }
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure ?')) {
      try {
        const data = { id: id, itemId: itemId };
        const res = await deleteChild(data);
        toast.success(res.data.message)
        refetch();
        childrenRefetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div >
      <Link to='/' ><Button variant="outline-dark" className='btn gb-btn btn-light mx-1 my-3' >
        Go back</Button>
      </Link>
      <BackBtn />

      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger"> {error.data?.massage || error.status} </Message>
      ) : (
        <>

          <Row className='productSpace'>
            <Col md={4} id='productPresentation'>

              <Image src={item.image} alt={item.component_name} fluid rounded />

            </Col>
            <Col md={8} id='productDetails'>
              {/* <Row > */}

              <ListGroup variant='flush' className='t-left'>
                <ListGroup.Item >
                  <h2>{item.component_name}</h2>
                  {/* {findParent()} */}
                  {/* Parent : {parent} */}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Quality Index :    &nbsp;
                    {
                      !childrenLoading && (children.length === 0 ? item.quality_index : calcQI(children).toFixed(2))
                    }
                  </strong>
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
            </Col>
          </Row>
          <Row>
            <Col md={5} className='text-left px-4'>
              {item.status === "research" && (<Row>
                <h2>Write a Recommendation</h2>

                {loadingRecommendations && <Loading />}

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
                    disabled={loadingRecommendations}
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
              {/* {!isLoading && (<Recommendations item={item}/>)} */}
            </Col>
            <Col md={7}>
              {!childrenLoading && <ComponentTree item={item}
                children={children}
              />}
            </Col>
          </Row>
        </>
      )
      }
    </div >
  )
}
export default Component