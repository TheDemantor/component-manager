import Component from '../models/componentModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
// import {notFound, errorHandler} from '../middleware/errorMiddleware.js'

// @desc   Fetch all Components
// @route  GET /api/Components
// @access Public
const getComponents = asyncHandler(async (req, res) => {

  const keyword =  req.query.keyword ? (
    {
      name: {
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
  const { name, image, description, qi, parent_id, status } =
    req.body;

  const component = await Component.findById(req.params.id);
  if (component) {
    component.component_name = name;
    component.image = image;
    component.description = description;
    component.quality_index = qi;
    component.parent_id = parent_id;
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
// @access  Private/Admin
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

// @desc    Create new review
// @route   POST /api/Components/:id/reviews
// @access  Private
const createComponentRecommendation = asyncHandler(async (req, res) => {
  const {
    rating,
    comment,
    user
  } = req.body;

  const component = await Component.findById(req.params.id);

  if (component) {
    const alreadyReviewed = component.review.find(
      // (r) => r.user.toString() === req.user._id.toString()
      (r) => r.user.toString() === user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Component already reviewed');
    }

    const review = {
      // name: req.user.name,
      name: user.name,
      rating: Number(rating),
      comment,
      user: user._id,
      // user: req.user._id,
    };

    component.review.push(review);

    component.numReviews = component.review.length;

    component.rating =
    component.review.reduce((acc, item) => item.rating + acc, 0) /
    component.review.length;

    await component.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Component not found');
  }
});





export {
  getComponents,
  getComponentById,
  createComponent,
  updateComponent,
  deleteComponent,
  createComponentRecommendation,
}
