const rootRoutes = "/api/v1";
const rootAuthRoute = `${rootRoutes}/auth`;
const rootUserRoute = `${rootRoutes}/user`;
const rootNotesRoute = `${rootRoutes}/notes`;
const rootPostsRoute = `${rootRoutes}/posts`;
const rootAdminRoute = `${rootRoutes}/admin`;

export const authRoutes = {
  register: `${rootAuthRoute}/register`,
  login: `${rootAuthRoute}/login`,
  getMyProfile: `${rootAuthRoute}/me`,
  forgotPassword: `${rootAuthRoute}/forgot-password`,
  resetPassword: `${rootAuthRoute}/reset-password`,
  verifyOtp: `${rootAuthRoute}/verify-otp`,
  sendOtp: `${rootAuthRoute}/send-otp`,
  logout: `${rootAuthRoute}/logout`,
};

export const usersRoutes = {
  updateUser: `${rootUserRoute}/update-user`,
};

export const notesRoutes = {
  create: rootNotesRoute,
  getAll: rootNotesRoute,
  getById: (id: string) => `${rootNotesRoute}/${id}`,
  update: (id: string) => `${rootNotesRoute}/${id}`,
  delete: (id: string) => `${rootNotesRoute}/${id}`,
};

export const postsRoutes = {
  create: rootPostsRoute,
  getByUser: (userId: string) => `${rootPostsRoute}/user/${userId}`,
};

export const adminRoutes = {
  users: `${rootAdminRoute}/users`,
  userById: (id: string) => `${rootAdminRoute}/users/${id}`,
  groupedByInterests: `${rootAdminRoute}/users/grouped-by-interests`,
  notes: `${rootAdminRoute}/notes`,
};
