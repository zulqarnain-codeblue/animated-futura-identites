// types/product.ts

export interface ProductItem {
  id: number;
  title: string;
  image: string;
}

export interface ProductContent {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  mainImageUrl: string;
  smallImageUrl?: string;
  layout: "left" | "right";
  tag: string;
  products?: ProductItem[]; // <-- NEW
}
