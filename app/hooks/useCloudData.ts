import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
}

interface DummyJsonResponse {
  products: Product[];
}

export const useCloudData = () => {
  return useQuery<Product[]>({
    queryKey: ["cloud-data"],
    queryFn: async () => {
      // Fetch 12 products with actual pricing from DummyJSON
      const { data } = await axios.get<DummyJsonResponse>("https://dummyjson.com/products?limit=12");
      return data.products;
    },
    staleTime: 5 * 60 * 1000, // Caching strategy
  });
};
