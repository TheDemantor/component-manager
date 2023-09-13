import React from 'react'
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
// import components from '../components2'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useGetComponentsQuery, useDeleteComponentMutation } from "../slices/componentApiSlice";
import Loading from "./Loading";
import Message from "./Message";
import { toast } from 'react-toastify';



const ComponetInCat = () => {
  const { keyword = '' } = useParams();
  const { data: items, refetch, isLoading, error } = useGetComponentsQuery({ keyword });
  // console.log(items);
  // const items = components;
  const [deleteComponent, { isLoading: loadingDelete }] =    useDeleteComponentMutation();
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        const res = await deleteComponent(id);
        toast.success(res.message)
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div>
        {loadingDelete && <Loading />}
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger"> {error?.data?.massage || error.error} {console.log(error)}</Message>

      ) : (
        <ListGroup variant="flush" className='mx-3 px-3 d-flex justify-content-between'>

          {items.map((item, index) => (
            item.parent_id === "" &&
            (<ListGroup.Item key={index}>
              <Row>
                <Col md={1}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col >
                  <Link to={`/${item._id}`}>
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
                  onClick={() => deleteHandler(item._id)}
                  >
                    <FaTrash />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>)
          ))
          }
        </ListGroup>
      )};
    </div>
  )
}

export default ComponetInCat