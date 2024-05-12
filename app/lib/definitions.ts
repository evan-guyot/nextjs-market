export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  color: string;
};

export type CategoriesTable = {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  color: string;
};

export type Product = {
  id: string;
  category_id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
};

export type ProductsTable = {
  id: string;
  category_id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
};
