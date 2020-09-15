export type Roles = 'admin' | 'estudiante' | 'catedratico';

export interface User {
  userName: string;
  password: string;
  getToken: string;
}

export interface UserInterface {
  _id: string;
  role: string;
  carnet: string;
  dpi: string;
  name: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  amount_book_borrowed: number;
  amount_magazine_borrowed: number;
  books_borrowed: [string];
  magazines_borrowed: [string];
}

export interface UserResponse {
  message: string;
  token: string;
  _id: string;
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
  books_borrowed: [string];
  magazines_borrowed: [string];
}

export interface UserRegister {
  _id: string;
  role: string;
  carnet: string;
  dpi: string;
  name: string;
  lastName: string;
  password: string;
}
