export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserInput {
  name: string;
  email: string;
  password: string;

}

export interface IUserResponse {
  _id: string;
  name: string;
  email: string;
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