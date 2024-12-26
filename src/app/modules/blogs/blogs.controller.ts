import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { blogsServices } from './blogs.service';
// import { JwtPayload } from 'jsonwebtoken';

const createBlogs = catchAsync(async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user?.userId as string;

  const Blog = await blogsServices.createBlogsInDB({ title, content, userId });
 const author = Blog.author
   ? {
       _id: Blog.author._id,
       name: Blog.author.name, 
       email: Blog.author.email, 
     }
   : null;
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: {
      _id: Blog._id,
      title: Blog.title,
      content: Blog.content,
      author: author,
    },
  });
});
export const blogsController = {
  createBlogs,
};
