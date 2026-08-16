export type Role = "USER" | "ADMIN";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  interests: string[];
  phoneNo?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  interests?: string[];
  phone?: string;
  avatar?: string;
}
