export type IUser = {
    name: string;
    email: string;
    password?: string;
    role: "user" | "admin";
    image?: string;
    loginProvider?: "google" | "email";
    googleId?: string;
  };
  