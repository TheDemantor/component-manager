import mongoose from "mongoose";

const childSchema = new mongoose.Schema(
  {
    child_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Component',
    },
    child_weight_in_parent_quality_index: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const recommendationSchema = new mongoose.Schema(
  {
    researcher_name: {
      type: String,
    },
    researcher_mail: {
      type: String,
      required: true,
    },
    recommendation: {
      type: String,
      required: true,    
    },
    status:{
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const componentSchema = new mongoose.Schema(
  {
    //this will store that which user has created this object, so we are having this id from our User collection, every item will have a attrubute named _id, and that is this
    component_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    component_name: {
      type: String,
      required: true,
    },
    component_child: {
      type: [childSchema],
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    quality_index: {
      type: Number,
      required: true,
    },
    parent_id: {
      type: String,
      default: ""
    },
    status: {
      type: String,
    },
    recommendation: {
      type: [recommendationSchema],
    },
    
  },
  {
    timestamps: true,
    //this will auto matically adds the createdAt field for every object
  }
);

//making a mongoose model
const Component = mongoose.model("Component", componentSchema);

export default Component;