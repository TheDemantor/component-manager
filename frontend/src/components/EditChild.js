import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';



const EditChild = ({item}) => {
  // The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <Link
    to="/${item.}/edit"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </Link>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Search Child"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);

  return (
    <Dropdown variant='warning' className='btn-sm mx-2'>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" >
      <FaEdit />Edit child
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        {
          item.component_child.map((ch, ind)=> (
            <Dropdown.Item eventKey={ind}>{ch.child_id.$oid}</Dropdown.Item>
          ))
        }
        {/* <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
        <Dropdown.Item eventKey="3">Orange</Dropdown.Item>
        <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>)
}

export default EditChild