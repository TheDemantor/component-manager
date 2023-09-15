import express from 'express';
const router = express.Router();

//FROM CONTROLLER
import { 
  getComponents, 
  getComponentById, 
  createComponent, 
  updateComponent, 
  deleteComponent, 
  createRecommendation,
  createChild,
  updateChild,
  deleteChild
 } from '../controllers/componentController.js'

router.route('/').get(getComponents).post(createComponent);

router.route('/:id').get(getComponentById).put(updateComponent).delete(deleteComponent);

router.route('/:id/recommendation').post( createRecommendation);

router.route('/:id/child').post(createChild).put(updateChild).delete(deleteChild);


;

export default router;