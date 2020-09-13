export type Roles = 'admin' | 'estudiante' | 'catedratico';

export interface User {
  userName: string;
  password: string;
  getToken: string;
}

export interface UserRegister {
  name: string;
  lastName: string;
  carnet: string;
  dpi: string;
  role: string;
}

export interface UserResponse {
  message: string;
  token: string;
  id: string;
  role: Roles;

  carnet: string;
  dpi: string;
  name: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  amount_book_borrowed: number;
  amount_magazine_borrowed: number;
}

export interface UserInterface {
  id?: string;
  name: string;
  lastName: string;
  carnet: string;
  dpi: string;
  role: string;
}
