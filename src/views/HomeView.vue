<script setup>
import { computed } from 'vue';
import ProductCard from '@/components/Products/ProductCard.vue';
import ProductCardSkeleton from '@/components/Products/ProductCardSkeleton.vue';
import { useProductStore } from '@/stores/products';

const productStore = useProductStore();

const products = computed(() => productStore.list);
</script>


<template>
  <div class="p-4 max-w-7xl mx-auto">
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <ProductCardSkeleton
        v-show="!productStore.loaded"
        v-for="n in 15"
        :key="n"
      />
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

