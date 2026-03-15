import { useQuery } from "@tanstack/react-query";

export type HeroData = {
  title: string;
  subtitle: string;
  highlight: string;
  description: string;
  heroBanner: string;
};

export const useHero = () => {
  return useQuery({
    queryKey: ["hero"],
    queryFn: async () => {
      const baseUrl = import.meta.env.BASE_URL;
      const res = await fetch(`${baseUrl}data/hero.json`);
      if (!res.ok) throw new Error("Failed to fetch hero data");
      return (await res.json()) as HeroData;
    },
  });
};
