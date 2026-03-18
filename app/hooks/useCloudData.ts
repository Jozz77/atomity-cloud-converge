import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/lib/api";

export interface Post {
  id: number;
  title: string;
  price: number;
  category: string;
}

interface DummyJsonResponse {
  products: Post[];
}

export const useCloudData = () => {
  return useQuery<Post[]>({
    queryKey: ["cloud-data"],
    queryFn: async () => {
      // Requirement: Fetch 12 items to divide into 4 groups of 3
      const { data } = await api.get<DummyJsonResponse>("/products?limit=12");
      return data.products;
    },
    staleTime: 5 * 60 * 1000, // Caching strategy
  });
};
