import { SortOrder } from 'mongoose';
import { UserModel } from '../User/user.model';
import { BlogsModel } from './blogs.model';

const createBlogsInDB = async ({
  title,
  content,
  userId,
}: {
  title: string;
  content: string;
  userId: string;
}) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }
  // Create new blog
  const newBlog = new BlogsModel({
    title,
    content,
    author: userId,
  });

  await newBlog.save();
  await newBlog.populate('author', 'name email');

  return newBlog;
};
interface FindBlogsQueryParams {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filter?: string;
}
const findAllBlogsInDB = async ({
  search,
  sortBy,
  sortOrder,
  filter,
}: FindBlogsQueryParams) => {
  // search filer are added
  const searchQuery = search
    ? {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ],
      }
    : {};

  // Build the filter query for author
  const filterQuery = filter ? { author: filter } : {};

  const query = {
    ...searchQuery,
    ...filterQuery,
  };
  // sorting option
  const sortOptions: { [key: string]: SortOrder } = {};

  if (sortBy) {
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
  } else {
    sortOptions['createdAt'] = -1;
  }

  // Fetch the blogs with the filters, search, and sorting applied
  const result = await BlogsModel.find(query)
    .populate('author', 'name email')
    .sort(sortOptions);

  return result;
};
export const blogsServices = {
  createBlogsInDB,
  findAllBlogsInDB,
};
