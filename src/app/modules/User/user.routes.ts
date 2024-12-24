import express from 'express';
import { userController } from './user.controller';
import validator from '../../middlewares/validator';
import { userValidationSchema } from './user.validation';

const router = express.Router();

router.post('/register',validator(userValidationSchema), userController.createUser);

export const UserRoutes = router;
