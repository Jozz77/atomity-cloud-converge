import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/lib/api";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const useApiData = () => {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await api.get<Post[]>("/posts?_limit=5");
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

function queryOk(response: Response): boolean {
  return response.ok;
}
