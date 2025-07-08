<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold text-center text-gray-900 mb-8">
        Strapi Integration Demo
      </h1>

      <!-- Instructions Card -->
      <div class="bg-white shadow rounded-lg p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4">How to Test Strapi</h2>
        <ol class="space-y-3 text-gray-700">
          <li class="flex">
            <span class="font-bold mr-2">1.</span>
            <div>
              <strong>Access Strapi Admin:</strong> Go to
              <a
                href="http://localhost:1337/admin"
                target="_blank"
                class="text-blue-600 hover:underline"
              >
                http://localhost:1337/admin
              </a>
            </div>
          </li>
          <li class="flex">
            <span class="font-bold mr-2">2.</span>
            <div>
              <strong>Create Content Type:</strong> In Strapi admin, go to
              Content-Type Builder and create:
              <ul class="mt-2 ml-4 list-disc">
                <li>
                  Blog Post (title: Text, content: Rich Text, published:
                  Boolean)
                </li>
                <li>Product (name: Text, price: Number, description: Text)</li>
              </ul>
            </div>
          </li>
          <li class="flex">
            <span class="font-bold mr-2">3.</span>
            <div>
              <strong>Set Permissions:</strong> Go to Settings → Roles → Public
              → Select find and findOne for your content types
            </div>
          </li>
          <li class="flex">
            <span class="font-bold mr-2">4.</span>
            <div>
              <strong>Add Content:</strong> Go to Content Manager and create
              some sample entries
            </div>
          </li>
          <li class="flex">
            <span class="font-bold mr-2">5.</span>
            <div>
              <strong>See Results:</strong> The data will appear below once
              you've completed the steps above
            </div>
          </li>
        </ol>
      </div>

      <!-- API Status -->
      <div class="bg-white shadow rounded-lg p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4">Strapi Connection Status</h2>
        <div class="flex items-center">
          <div
            :class="[
              'w-4 h-4 rounded-full mr-3',
              isConnected ? 'bg-green-500' : 'bg-red-500',
            ]"
          ></div>
          <span :class="isConnected ? 'text-green-700' : 'text-red-700'">
            {{
              isConnected
                ? "Connected to Strapi"
                : "Not connected - Make sure Strapi is running on port 1337"
            }}
          </span>
        </div>
        <button
          @click="testConnection"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Test Connection
        </button>
      </div>

      <!-- Live Data Examples -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Blog Posts Section -->
        <div class="bg-white shadow rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Blog Posts from Strapi</h2>

          <div v-if="blogPostsLoading" class="text-gray-500">
            Loading blog posts...
          </div>
          <div v-else-if="blogPostsError" class="text-red-600">
            Error loading blog posts: {{ blogPostsError.message }}
          </div>
          <div v-else-if="blogPosts?.data?.length > 0">
            <div
              v-for="post in blogPosts.data"
              :key="post.id"
              class="border-b py-3 last:border-0"
            >
              <h3 class="font-semibold">{{ post.attributes.title }}</h3>
              <p class="text-gray-600 text-sm mt-1">
                {{ post.attributes.content }}
              </p>
              <span class="text-xs text-gray-500">ID: {{ post.id }}</span>
            </div>
          </div>
          <div v-else class="text-gray-500">
            No blog posts found. Create some in Strapi admin panel.
          </div>
        </div>

        <!-- Products Section -->
        <div class="bg-white shadow rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Products from Strapi</h2>

          <div v-if="productsLoading" class="text-gray-500">
            Loading products...
          </div>
          <div v-else-if="productsError" class="text-red-600">
            Error loading products: {{ productsError.message }}
          </div>
          <div v-else-if="products?.data?.length > 0">
            <div
              v-for="product in products.data"
              :key="product.id"
              class="border-b py-3 last:border-0"
            >
              <h3 class="font-semibold">{{ product.attributes.name }}</h3>
              <p class="text-gray-600 text-sm">
                {{ product.attributes.description }}
              </p>
              <p class="text-green-600 font-bold">
                ${{ product.attributes.price }}
              </p>
              <span class="text-xs text-gray-500">ID: {{ product.id }}</span>
            </div>
          </div>
          <div v-else class="text-gray-500">
            No products found. Create some in Strapi admin panel.
          </div>
        </div>
      </div>

      <!-- Create Content Link -->
      <div class="bg-white shadow rounded-lg p-6 mt-8 text-center">
        <h2 class="text-xl font-semibold mb-4">Want to Create Content?</h2>
        <p class="text-gray-600 mb-4">
          You can create content directly from the frontend (requires
          authenticated API access)
        </p>
        <NuxtLink
          to="/create-content"
          class="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Go to Content Creation Page →
        </NuxtLink>
      </div>

      <!-- Manual API Test -->
      <div class="bg-white shadow rounded-lg p-6 mt-8">
        <h2 class="text-xl font-semibold mb-4">Manual API Test</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Content Type (e.g., blog-posts, products)
            </label>
            <input
              v-model="testContentType"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter content type"
            />
          </div>
          <button
            @click="testApi"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Test API Endpoint
          </button>

          <div v-if="testResult" class="mt-4 p-4 bg-gray-100 rounded">
            <h3 class="font-semibold mb-2">API Response:</h3>
            <pre class="text-xs overflow-auto">{{
              JSON.stringify(testResult, null, 2)
            }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useQuery } from "@tanstack/vue-query";

// Connection status
const isConnected = ref(false);

// Test content type
const testContentType = ref("");
const testResult = ref<any>(null);

// Initialize Strapi client
const { find } = useStrapi();

// Test connection to Strapi
const testConnection = async () => {
  try {
    // Try to fetch from Strapi
    await find("blog-posts");
    isConnected.value = true;
  } catch (error) {
    isConnected.value = false;
    console.error("Connection failed:", error);
  }
};

// Test API endpoint
const testApi = async () => {
  if (!testContentType.value) {
    alert("Please enter a content type");
    return;
  }

  try {
    const result = await find(testContentType.value);
    testResult.value = result;
  } catch (error) {
    testResult.value = { error: error.message };
  }
};

// Fetch blog posts using TanStack Query
const {
  data: blogPosts,
  isLoading: blogPostsLoading,
  error: blogPostsError,
} = useQuery({
  queryKey: ["blog-posts"],
  queryFn: () => find("blog-posts"),
  retry: 1,
});

// Fetch products using TanStack Query
const {
  data: products,
  isLoading: productsLoading,
  error: productsError,
} = useQuery({
  queryKey: ["products"],
  queryFn: () => find("products"),
  retry: 1,
});

// Test connection on mount
onMounted(() => {
  testConnection();
});
</script>
