export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface ICurrentUser {
  id: string;
  isAdmin: boolean;
  iat: string;
  exp: string;
}
