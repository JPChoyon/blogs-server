import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { blogsController } from './blogs.controller';
const router = express.Router();

router.post('/', auth(USER_ROLE.user), blogsController.createBlogs);
router.get('/', blogsController.findAllBlogs);

export const BlogsRoutes = router;
