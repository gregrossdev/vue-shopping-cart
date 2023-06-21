<script setup>
import { useCartStore } from '@/stores/cart.js';
import { toCurrency } from '@/shared/utils.js'
import { defineProps } from 'vue';

const cartStore = useCartStore()
defineProps({
  product: Object
})
</script>


<template>
    <div class="card bordered ">
        <figure class="px-8 pt-10">
            <img
                :src="product.image"
                alt="Card Image"
                class="object-contain w-full h-64"
            />
        </figure> 
        <div class="card-body">
            <h2 class="card-title">
                <RouterLink class="link link-hover" :to="`/product/${product.id}`">{{ product.title }}</RouterLink>
            </h2>
            <p>{{ toCurrency(product.price) }}</p>
            <div class="justify-end card-actions">
                <button class="btn btn-primary" @click="cartStore.add(product.id)">Add to Cart</button>
            </div>
        </div>
    </div>   
</template>

