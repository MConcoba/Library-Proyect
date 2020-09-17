export interface BookInterface {
  _id: string;
  author: string;
  title: string;
  edicion: string;
  keywords: [string];
  description: string;
  topics: [string];
  copies: number;
  available: number;
  countLend: number;
}
