import Component from '../models/componentModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
// import {notFound, errorHandler} from '../middleware/errorMiddleware.js'

// @desc   Fetch all Components
// @route  GET /api/Components
// @access Public
const getComponents = asyncHandler(async (req, res) => {

  const keyword = req.query.keyword ? (
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
    status: 'future',
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
    email,
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
      researcher_mail: email,
      recommendation: recommendation,
    };

    component.recommendation.push(recommendation_msg);

    await component.save();
    res.status(201).json({ message: 'Recommendation added' });
  } else {
    res.status(404);
    throw new Error('Component not found');
  }
});

// @desc    Create new child
// @route   POST /api/Components/:id/child
// @access  Public
const createChild = asyncHandler(async (req, res) => {
  const { id, weight } = req.body;
  // console.log(req.body);
  const par = req.params.id;
  const component = await Component.findById(par);
  // console.log(par);
  const child = await Component.findById(id);
  // console.log(id);
  const exist = await component.component_child.find(
    (c) => c.child_id.toString() === id.toString()
  );
  if (exist) {
    res.status(400).json({message: 'Already a child to this parent.'});
  }
  else if (component) {
    if (child) {

      child.parent_id = par;
      // console.log(child.parent_id , par);
      const new_child = {
        child_id: id,
        child_weight_in_parent_quality_index: weight,
      };

      component.component_child.push(new_child);

      await component.save();
      await child.save();
      res.status(201).json({ message: 'Child added to parent successfully.' });

    } else {
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
  const { id, weight } = req.body;

  const component = await Component.findById(req.params.id);
  const child = component.component_child.findIndex((obj => obj.child_id == id));

  if (child != -1) {
    component.component_child[child].child_weight_in_parent_quality_index = weight;
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
  const { id } = req.body;
  // console.log(id, req.params.id)
  const component = await Component.findById(req.params.id);
  const child = await Component.findById(id);
  const exist = await component.component_child.find(
    (c) => c.child_id.toString() === id.toString()
  );
  if (exist) {
    child.parent_id = "";
    await child.save();

    component.component_child = component.component_child.filter(item => (item.child_id != id));
    // console.log(id, component.component_child.filter(item => (item.child_id != id )))
    await component.save();
    res.json({ message: 'Child component removed from parent.' });
  }
  else {
    res.status(404);
    throw new Error('Child not found');
  }
});

// @desc       Find all the child with their ids
// @route      GET /api/:id/child
// @access     Public 
const findChildren= asyncHandler(async (req, res) => {
  const component = await Component.findById(req.params.id);
  const childArray=component.component_child;
  const componentArray = await Component.find()
  
  // Create an empty result array to store the merged data
  const resultArray = [];
  
  // Create a map of component_ids to easily find components by component_id
  const componentMap = new Map();
  componentArray.forEach(component => {
    componentMap.set(component._id.toString(), component);
  });
  
  // console.log(component)
  // console.log(component.component_child)
  // Iterate through the childArray
  childArray.forEach(child => {
    const { child_id, child_weight_in_parent_quality_index } = child;
    
    // Check if the child_id exists in the componentMap
    if (componentMap.has(child_id.toString())) {
      const component = componentMap.get(child_id.toString());
      const { component_name, _id, quality_index } = component;

      // Create a new object with the required information and push it to the resultArray
      resultArray.push({
        component_name,
        child_id:_id,
        weight:child_weight_in_parent_quality_index,
        quality_index
      });
    }
  });
  // console.log(resultArray)
  res.json(resultArray);
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
  deleteChild,
  findChildren
}
