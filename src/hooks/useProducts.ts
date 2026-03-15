import { useQuery } from "@tanstack/react-query";
import { Product } from "@/data/products";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/data/products.json");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      return data.products as Product[];
    },
  });
};
