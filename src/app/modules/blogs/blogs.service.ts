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

export const blogsServices = {
  createBlogsInDB,
};
