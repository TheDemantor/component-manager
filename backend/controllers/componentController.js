import Component from '../models/componentModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
// import {notFound, errorHandler} from '../middleware/errorMiddleware.js'

// @desc   Fetch all Components
// @route  GET /api/Components
// @access Public
const getComponents = asyncHandler(async (req, res) => {

  const keyword =  req.query.keyword ? (
    {
      component_name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
  ) 
  : {};

  const components = await Component.find({ ...keyword })

  res.json(components);
})

// @desc   Fetch single Components
// @access Public
const getComponentById = asyncHandler(async (req, res) => {
  const component = await Component.findById(req.params.id);
  if (component)
    return res.json(component);

  res.status(404);
  throw new Error('Component not found');
});

// @desc    Create a Component
// @route   POST /api/Components
// @access  Public
const createComponent = asyncHandler(async (req, res) => {
  // console.log("Reached cont")
  const component = new Component({
    // user: req.user._id,
    // user: "64b933d4d01c578b11d3524a",
    component_name: 'Sample name',
    image: "https://i.ytimg.com/",
    quality_index: '100',
    status:'Future research project',
  });

  const createdComponent = await component.save();
  res.status(201).json(createdComponent);
});

// @desc    Update a Component
// @route   PUT /api/components/:id
// @access  Public
const updateComponent = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { name, image, description, qi, parent, status } =
    req.body;

  const component = await Component.findById(req.params.id);
  if (component) {
    component.component_name = name;
    component.image = image;
    component.description = description;
    component.quality_index = qi;
    component.parent_id = parent;
    component.status = status;

    // console.log(component)
    try {
      const updatedComponent = await component.save();
      res.json(updatedComponent);
      // Code to handle the successful execution of the Component.save() method
    } catch (error) {
      // Code to handle the error
      console.error('An error occurred:', error);
    }
  } else {
    res.status(404);
    throw new Error('Component not found');
  }
});

// @desc    Delete a Component
// @route   DELETE /api/Components/:id
// @access  Public
const deleteComponent = asyncHandler(async (req, res) => {
  const component = await Component.findById(req.params.id);

  if (component) {
    await Component.deleteOne({ _id: component._id });
    res.json({ message: 'Component removed' });
  } else {
    res.status(404);
    throw new Error('Component not found');
  }
});

// @desc    Create new recommendation
// @route   POST /api/Components/:id/recommendation
// @access  public
const createRecommendation = asyncHandler(async (req, res) => {
  const {
    name,
    mail,
    recommendation
  } = req.body;

  const component = await Component.findById(req.params.id);

  if (component) {
    const researched = component.status === "research";

    if (!researched) {
      res.status(400);
      throw new Error('Currently component is not being reserched');
    }

    const recommendation_msg = {
      researcher_name: name,
      researcher_mail: mail,
      recommendation: recommendation,
    };

    component.recommendation.push(recommendation_msg);

    await component.save();
    res.status(201).json({ message: 'Recommendation added'});
  } else {
    res.status(404);
    throw new Error('Component not found');
  }
});

// @desc    Create new review
// @route   POST /api/Components/:id/reviews
// @access  Private
const createChild = asyncHandler(async (req, res) => {
  const {id,weight} = req.body;
  const par=req.params.id;
  const component = await Component.findById(par);
  const child = await Component.findById(id);
  const exist = await component.component_child.find(
    (c) => c.child_id.toString() === id.toString()
    );
    if(exist){
      res.status(400);
      throw new Error('Already a child to this parent.');   
    }
    if (component ) {
      if(child){
        
        child.parent_id=par;
      // console.log(child.parent_id , par);
      const new_child = {
        child_id: id,
        child_weight_in_parent_quality_index: weight,
      };

      component.component_child.push(new_child);

      await component.save();
      await child.save();
      res.status(201).json({ message: 'Child added to parent successfully.'});

    } else{
      res.status(404);
      throw new Error('Child component not found.');
    }
    
  } else {
    res.status(404);
    throw new Error('Component not found');
  }
});

// @desc    Update a Child
// @route   PUT /api/child/:id
// @access  Public
const updateChild = asyncHandler(async (req, res) => {
  const {id, weight} = req.body;

  const component = await Component.findById(req.params.id);
  const child = await component.component_child.findIndex((obj => obj.child_id == id));
  // console.log(child);

  if(child!=-1){
    component.component_child[child].child_weight_in_parent_quality_index=weight;
    await component.save();
    res.json({ message: 'Component weight updated' });
  }
  else {
    res.status(404);
    throw new Error('Child not found');
  }
});

// @desc    Delete a Component
// @route   DELETE /api/Components/:id
// @access  Public
const deleteChild = asyncHandler(async (req, res) => {
  const {id} = req.body;

  const component = await Component.findById(req.params.id);
  const child = await Component.findById(id);
  const exist = await component.component_child.find(
    (c) => c.child_id.toString() === id.toString()
  );
  if(exist){
    child.parent_id="";
    await child.save();
    
    component.component_child = component.component_child.filter(item => (item.child_id != id ));
    // console.log(id, component.component_child.filter(item => (item.child_id != id )))
    await component.save();
    res.json({ message: 'Child component removed from parent.' });
  }
  else {
    res.status(404);
    throw new Error('Child not found');
  }
});





export {
  getComponents,
  getComponentById,
  createComponent,
  updateComponent,
  deleteComponent,
  createRecommendation,
  createChild,
  updateChild,
  deleteChild
}
