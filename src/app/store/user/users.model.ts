export interface User {
  id?: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
