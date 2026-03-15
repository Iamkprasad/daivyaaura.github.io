export type Product = {
  id: number;
  name: string;
  slug: string;
  category: string;
  regularPrice: number;
  salePrice: number;
  discount: number;
  inStock: boolean;
  sku: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  ingredients: string;
  usage: string;
  size: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  bestseller: boolean;
  tags: string[];
};

export const categories = ["All", "Sprays", "Tilaks", "Oils", "Wellness"];

export function getProductBySlug(products: Product[] | undefined, slug: string): Product | undefined {
  if (!products) return undefined;
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(products: Product[] | undefined, category: string): Product[] {
  if (!products) return [];
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(products: Product[] | undefined): Product[] {
  if (!products) return [];
  return products.filter((p) => p.featured);
}

export function getBestsellers(products: Product[] | undefined): Product[] {
  if (!products) return [];
  return products.filter((p) => p.bestseller);
}
