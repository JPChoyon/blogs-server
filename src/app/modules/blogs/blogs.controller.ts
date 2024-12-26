import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { blogsServices } from './blogs.service';

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
const findAllBlogs = catchAsync(async (req, res) => {
  const { search, sortBy, sortOrder, filter } = req.query;
  // Ensure sortOrder is either 'asc', 'desc', or undefined (if not provided)
  const validSortOrder: 'asc' | 'desc' | undefined =
    sortOrder === 'asc' || sortOrder === 'desc'
      ? (sortOrder as 'asc' | 'desc')
      : undefined;
  // search filter sort all are added
  const result = await blogsServices.findAllBlogsInDB({
    search: search as string,
    sortBy: sortBy as string,
    sortOrder: validSortOrder,
    filter: filter as string,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: result,
  });
});
export const blogsController = {
  createBlogs,
  findAllBlogs,
};
