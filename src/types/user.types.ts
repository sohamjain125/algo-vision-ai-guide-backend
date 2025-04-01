export interface IUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserInput {
  email: string;
  password: string;
  name: string;
}

export interface IUserResponse {
  _id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: IUserResponse;
} 