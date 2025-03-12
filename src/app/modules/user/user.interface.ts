export type TUser = {
  name: string;
  email: string;
  password?: string;
  role: string;
  image?: string;
  loginProvider?: "google" | "email";
  googleId?: string;
};
