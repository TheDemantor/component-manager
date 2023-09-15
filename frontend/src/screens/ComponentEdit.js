import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loading';
import { toast } from 'react-toastify';
import {
  useGetComponentsDetailsQuery,
  useUpdateComponentMutation,
  useUploadComponentImageMutation,
} from '../slices/componentApiSlice';


const ComponentEdit = () => {
  const { id: componentId } = useParams();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [qi, setQi] = useState();
  const [status, setStatus] = useState('');

  const {
    data: component,
    isLoading,
    refetch,
    error,
  } = useGetComponentsDetailsQuery(componentId);
  // console.log(Component)

  const [updateComponent, { isLoading: loadingUpdate }] =
    useUpdateComponentMutation();

  const [uploadComponentImage, { isLoading: loadingUpload }] =
    useUploadComponentImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (component) {
      setName(component.component_name);
      setImage(component.image);
      setDescription(component.description);
      setQi(component.quality_index);
      setStatus(component.status);
    }
  }, [component]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateComponent({
        componentId,
        name,
        image,
        description,
        qi,
        status,
      });
      toast.success('Component updated');
      refetch();
      navigate(`/`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadComponentImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to='/' className='btn btn-light my-3 gb-btn'>
        Go Back
      </Link>
      <Container className='t-left'>
        <Row>
          <Col xs={12} md={6}>

            <div className='componentSpace'>
              <h1>Edit component</h1>
              {loadingUpdate && <Loader />}
              {isLoading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error.data.message}</Message>
              ) : (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='name'
                      placeholder='Enter name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>


                  <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter image url'
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                    <Form.Control
                      label='Choose File'
                      onChange={uploadFileHandler}
                      type='file'
                    ></Form.Control>
                    {loadingUpload && <Loader />}
                  </Form.Group>

                  <Form.Group controlId='qi'>
                    <Form.Label>Quality Index</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Enter intial quality index'
                      value={qi}
                      onChange={(e) => setQi(e.target.value)}
                    ></Form.Control>
                  </Form.Group>


                  <Form.Group controlId='status'>
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as='select' // Use a select element
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value='available'>Available at manufacturing unit</option>
                      <option value='future'>Future project</option>
                      <option value='research'>Ongoing research on product</option>
                    </Form.Control>

                  </Form.Group>

                  <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter description of component'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    type='submit'
                    variant='primary'
                    style={{ marginTop: '1rem' }}
                  >
                    Update
                  </Button>
                </Form>
              )}
            </div>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default ComponentEdit