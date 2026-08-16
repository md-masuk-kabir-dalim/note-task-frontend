export interface Post {
  _id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserWithPosts {
  _id: string;
  name: string;
  email: string;
  role: string;
  interests: string[];
  posts: Post[];
}
