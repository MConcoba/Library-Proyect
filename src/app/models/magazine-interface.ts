export interface MagazineInterface {
  _id: string;
  author: string;
  title: string;
  edicion: string;
  description: string;
  frequencyActs: string;
  specimens: number;
  topics: [string];
  keywords: [string];
  copies: number;
  available: number;
}
