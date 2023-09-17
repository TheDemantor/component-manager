import React, { useState } from 'react'
import { AnimatedTree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'
import { Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';



const ComponentTree = ({item, children}) => {
  // console.log(item, parent);
  const data = {
    "name": item.component_name,
    "children": [],
  };
  const navigate=useNavigate();
  // const [totalWt, setTotalWt] = useState(Math.max());
  // children.map(ch=>{
  //   setTotalWt(totalWt+ch.weight);
  // });
  children.map((ch, ind)=>{
    data.children.push({
      "name":`${ch.component_name} (${(((ch.weight) / (children.reduce((accumulator, child) => accumulator + child.weight, 0))) * 100).toFixed(2)}%)`,
      "keyProp": ind,
      "gProps": {
        onClick: ()=> {navigate(`/${ch.child_id}`)}
      },

    })

  })
  return (
    <div>
    <Row>
      <Col className='t-left'>
        <h3>Dynamic Component Tree</h3>
        <p>Click on the component to move to child component's details page.</p>
      </Col>
      
    </Row>
  
   <AnimatedTree
    data={data}
    height={400}
    svgProps={{
      className: 'compTree'
    }}
    width={500} />
    </div>
  )
}

export default ComponentTree


