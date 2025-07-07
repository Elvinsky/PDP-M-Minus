import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";

// Example API functions
const fetchTodos = async () => {
  // This would normally fetch from your API
  // For now, returning mock data
  return [
    { id: 1, title: "Setup Nuxt 3", completed: true },
    { id: 2, title: "Install Tailwind CSS", completed: true },
    { id: 3, title: "Setup TanStack Query", completed: true },
    { id: 4, title: "Connect to Strapi", completed: false },
  ];
};

const createTodo = async (todo: { title: string }) => {
  // This would normally post to your API
  return { id: Date.now(), ...todo, completed: false };
};

// Composable using Vue Query
export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      // Invalidate and refetch todos after creating a new one
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
