import React from 'react'
// import { Tree } from 'react-tree-graph';
import { AnimatedTree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'
import { Row, Col } from 'react-bootstrap'



const ComponentTree = ({item, parent}) => {
  // console.log(item, parent);
  const data = {
    "name": item.component_name,
    "parent": parent,
    "children": [
      {
        "name": "CU",
        "parent": "CPU",
        "children": [
          {
            "name": "Son of A",
            "parent": "Level 2: A"
          },
          {
            "name": "Daughter of A",
            "parent": "Level 2: A"
          }
        ]
      },
      {
        "name": "ALU",
        "parent": "CPU"
      }
    ]
  };
  return (
    <div>
    <Row>
      <Col md={8}>
        <h3>Component Tree</h3>
      </Col>
      
    </Row>
  
   <AnimatedTree
    data={data}
    height={400}
    width={400} />;
    </div>
  )
}

export default ComponentTree


