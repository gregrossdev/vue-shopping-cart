<script setup>
import { computed } from "vue";

import { usePersistCart } from "@/composables/usePersistCart.js";
import { useCartStore } from "@/stores/cart.js";
import { useProductStore } from "@/stores/products.js";
import Nav from "@/layouts/components/Nav.vue";
const productStore = useProductStore();
const cartStore = useCartStore();

productStore.fetchAll();
usePersistCart();

const count = computed(() => cartStore.count);
</script>


<template>
  <div class="drawer">
    <input id="drawer-input" type="checkbox" class="drawer-toggle" />
    <div class="bg-base-100 text-base-content min-h-screen drawer-content">
      <Nav />
      <slot name="router"/>
    </div>
    <div class="drawer-side">
      <label for="drawer-input" class="drawer-overlay"></label>
      <ul class="p-4 overflow-y-auto menu w-80 bg-base-100 text-base-content">
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/cart">
            Cart
            <div class="badge ml-2 badge-outline" v-text="count"></div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>