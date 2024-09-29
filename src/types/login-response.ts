export type AuthResponse = {
  data: {
    _id: string;
    username: string;
    email: string;
    isAdmin: boolean;
  };
};
