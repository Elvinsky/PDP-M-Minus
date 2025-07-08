<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold text-center text-gray-900 mb-8">
        PDP Homework - Senior+ Level
      </h1>
      <div class="bg-white shadow rounded-lg p-6">
        <p class="text-gray-600">
          Welcome to the PDP homework project. This application is configured
          with:
        </p>
        <ul class="mt-4 space-y-2">
          <li class="flex items-center text-green-600">
            <span class="mr-2">✓</span> Nuxt 3
          </li>
          <li class="flex items-center text-green-600">
            <span class="mr-2">✓</span> Tailwind CSS
          </li>
          <li class="flex items-center text-green-600">
            <span class="mr-2">✓</span> TanStack Query
          </li>
          <li class="flex items-center text-green-600">
            <span class="mr-2">✓</span> Strapi Integration
          </li>
        </ul>

        <div class="mt-8 space-y-4">
          <h2 class="text-xl font-semibold text-gray-900">Quick Links</h2>
          <div class="space-y-2">
            <NuxtLink
              to="/strapi-demo"
              class="block px-4 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition"
            >
              View Strapi Integration Demo →
            </NuxtLink>
            <a
              href="http://localhost:1337/admin"
              target="_blank"
              class="block px-4 py-3 bg-gray-800 text-white text-center rounded-lg hover:bg-gray-900 transition"
            >
              Open Strapi Admin Panel →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Index page setup
</script>
