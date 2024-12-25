import { ObjectId } from 'mongodb';

export type TBlogPost = {
  title: string;
  content: string;
  author: ObjectId;
  isPublished?: boolean;
};
