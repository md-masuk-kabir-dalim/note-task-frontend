export interface Note {
  _id: string;
  title: string;
  content: string;
  userId: string | { _id: string; name: string; email: string; role: string };
  createdAt: string;
  updatedAt: string;
}
