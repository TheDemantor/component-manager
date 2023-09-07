import express from 'express';
const router = express.Router();

//FROM CONTROLLER
import { getComponents, getComponentById, createComponent, updateComponent, deleteComponent, createComponentRecommendation } from '../controllers/componentController.js'

router.route('/').get(getComponents).post(createComponent);

router.route('/:id').get(getComponentById).put(updateComponent).delete(deleteComponent);

router.route('/:id/recommendation').post( createComponentRecommendation);

;

export default router;