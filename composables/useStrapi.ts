import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";

// Type definitions for Strapi data
interface StrapiAttributes {
  [key: string]: unknown;
}

// Strapi API helper composable
export const useStrapiApi = () => {
  const { find, findOne, create, update, delete: remove } = useStrapi();

  return {
    // Fetch all items from a collection
    fetchCollection: async (contentType: string) => {
      try {
        const response = await find(contentType);
        return response;
      } catch (error) {
        console.error(`Error fetching ${contentType}:`, error);
        throw error;
      }
    },

    // Fetch single item
    fetchSingle: async (contentType: string, id: string | number) => {
      try {
        const response = await findOne(contentType, id);
        return response;
      } catch (error) {
        console.error(`Error fetching ${contentType} with id ${id}:`, error);
        throw error;
      }
    },

    // Create new item
    createItem: async (contentType: string, data: StrapiAttributes) => {
      try {
        const response = await create(contentType, data);
        return response;
      } catch (error) {
        console.error(`Error creating ${contentType}:`, error);
        throw error;
      }
    },

    // Update item
    updateItem: async (
      contentType: string,
      id: string | number,
      data: StrapiAttributes
    ) => {
      try {
        const response = await update(contentType, id, data);
        return response;
      } catch (error) {
        console.error(`Error updating ${contentType}:`, error);
        throw error;
      }
    },

    // Delete item
    deleteItem: async (contentType: string, id: string | number) => {
      try {
        const response = await remove(contentType, id);
        return response;
      } catch (error) {
        console.error(`Error deleting ${contentType}:`, error);
        throw error;
      }
    },
  };
};

// Example: Blog Posts composable
export const useBlogPosts = () => {
  const api = useStrapiApi();

  return useQuery({
    queryKey: ["blog-posts"],
    queryFn: () => api.fetchCollection("blog-posts"),
  });
};

export const useBlogPost = (id: string | number) => {
  const api = useStrapiApi();

  return useQuery({
    queryKey: ["blog-post", id],
    queryFn: () => api.fetchSingle("blog-posts", id),
    enabled: !!id,
  });
};

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  const api = useStrapiApi();

  return useMutation({
    mutationFn: (data: StrapiAttributes) =>
      api.createItem("blog-posts", { data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
    },
  });
};

// Example: Products composable
export const useProducts = () => {
  const api = useStrapiApi();

  return useQuery({
    queryKey: ["products"],
    queryFn: () => api.fetchCollection("products"),
  });
};

export const useProduct = (id: string | number) => {
  const api = useStrapiApi();

  return useQuery({
    queryKey: ["product", id],
    queryFn: () => api.fetchSingle("products", id),
    enabled: !!id,
  });
};
