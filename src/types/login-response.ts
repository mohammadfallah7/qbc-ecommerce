export type LoginResponse = {
  data: {
    _id: string;
    username: string;
    email: string;
    isAdmin: boolean;
  };
};
