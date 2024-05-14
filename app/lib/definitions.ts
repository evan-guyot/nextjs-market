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
  delivery_cost: number;
  image_url: string;
  description: string;
};

export type ProductsTable = {
  id: string;
  category_id: string;
  name: string;
  price: number;
  delivery_cost: number;
  image_url: string;
  description: string;
};

export type Cart = {
  id: string;
  user_id: string;
  purchase_date?: string;
  delivery_date?: string;
  delivery_cost?: number;
  products_cost?: number;
  items: CartItemsTable[];
};

export type CartsTable = {
  id: string;
  user_id: string;
  purchase_date?: string;
  delivery_date?: string;
  delivery_cost?: number;
  products_cost?: number;
};

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};

export type CartItemsTable = {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
};
