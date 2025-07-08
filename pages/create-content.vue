<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">
        Create Content in Strapi
      </h1>

      <!-- Create Blog Post Form -->
      <div class="bg-white shadow rounded-lg p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">Create New Blog Post</h2>
        <form @submit.prevent="createBlogPost" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              v-model="blogForm.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog title"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              v-model="blogForm.content"
              required
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog content"
            ></textarea>
          </div>
          <div class="flex items-center">
            <input
              v-model="blogForm.published"
              type="checkbox"
              id="published"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="published" class="ml-2 text-sm text-gray-700">
              Publish immediately
            </label>
          </div>
          <button
            type="submit"
            :disabled="isCreatingBlog"
            class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {{ isCreatingBlog ? "Creating..." : "Create Blog Post" }}
          </button>
        </form>

        <div
          v-if="blogSuccess"
          class="mt-4 p-4 bg-green-100 text-green-700 rounded"
        >
          Blog post created successfully!
        </div>
        <div v-if="blogError" class="mt-4 p-4 bg-red-100 text-red-700 rounded">
          Error: {{ blogError }}
        </div>
      </div>

      <!-- Create Product Form -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Create New Product</h2>
        <form @submit.prevent="createProduct" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              v-model="productForm.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              v-model.number="productForm.price"
              type="number"
              step="0.01"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              v-model="productForm.description"
              required
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
            ></textarea>
          </div>
          <button
            type="submit"
            :disabled="isCreatingProduct"
            class="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
          >
            {{ isCreatingProduct ? "Creating..." : "Create Product" }}
          </button>
        </form>

        <div
          v-if="productSuccess"
          class="mt-4 p-4 bg-green-100 text-green-700 rounded"
        >
          Product created successfully!
        </div>
        <div
          v-if="productError"
          class="mt-4 p-4 bg-red-100 text-red-700 rounded"
        >
          Error: {{ productError }}
        </div>
      </div>

      <!-- Back to Demo -->
      <div class="mt-8 text-center">
        <NuxtLink to="/strapi-demo" class="text-blue-600 hover:underline">
          ← Back to Strapi Demo
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Initialize Strapi client
const { create } = useStrapi();

// Blog post form
const blogForm = ref({
  title: "",
  content: "",
  published: false,
});

const isCreatingBlog = ref(false);
const blogSuccess = ref(false);
const blogError = ref("");

// Product form
const productForm = ref({
  name: "",
  price: 0,
  description: "",
});

const isCreatingProduct = ref(false);
const productSuccess = ref(false);
const productError = ref("");

// Create blog post
const createBlogPost = async () => {
  isCreatingBlog.value = true;
  blogSuccess.value = false;
  blogError.value = "";

  try {
    await create("blog-posts", { data: blogForm.value });
    blogSuccess.value = true;
    // Reset form
    blogForm.value = {
      title: "",
      content: "",
      published: false,
    };

    // Navigate to demo page after 2 seconds
    setTimeout(() => {
      navigateTo("/strapi-demo");
    }, 2000);
  } catch (error) {
    blogError.value =
      error instanceof Error ? error.message : "Failed to create blog post";
    console.error("Error creating blog post:", error);
  } finally {
    isCreatingBlog.value = false;
  }
};

// Create product
const createProduct = async () => {
  isCreatingProduct.value = true;
  productSuccess.value = false;
  productError.value = "";

  try {
    await create("products", { data: productForm.value });
    productSuccess.value = true;
    // Reset form
    productForm.value = {
      name: "",
      price: 0,
      description: "",
    };

    // Navigate to demo page after 2 seconds
    setTimeout(() => {
      navigateTo("/strapi-demo");
    }, 2000);
  } catch (error) {
    productError.value =
      error instanceof Error ? error.message : "Failed to create product";
    console.error("Error creating product:", error);
  } finally {
    isCreatingProduct.value = false;
  }
};
</script>
