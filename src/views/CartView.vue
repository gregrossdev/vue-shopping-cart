<script setup>
import { ref, computed, onMounted, inject } from 'vue';
import CartCard from '../components/Shopping/CartCard.vue';
import CartCardSkeleton from '../components/Shopping/CartCardSkeleton.vue';
import { toCurrency } from '../shared/utils';
import { useCartStore } from '@/stores/cart';
import { useProductStore } from '@/stores/products';
const swal = inject('$swal')

const cartStore = useCartStore();
const productStore = useProductStore();

const formattedCart = computed(() => cartStore.formattedCart);

// paypal
const paypal = ref(null);
let  paidFor = ref(false);
let loaded = ref(false);

onMounted(() => {
  const script = document.createElement('script')
  script.src =
    'https://www.paypal.com/sdk/js?client-id=AWgwiyX_FGfMbtGAv-sQs3UYtxrUsLAzSIuTpRQ9uzQAYJKpQA9uUl_E4bCyTclRH38Txl-gVBxJZuC4'
  script.addEventListener('load', setLoaded)
  document.body.appendChild(script)
})

function setLoaded() {
  loaded = true
  window.paypal
    .Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: "spiritual getaway",
              amount: {
                currency_code: 'USD',
                value: cartStore.total
              }
            }
          ]
        })
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture()
        paidFor = true
        swal({
          icon: 'success',
          title: 'We successfully received your payment!'
        })
        console.log(order)
      },
      onError: (err) => {
        console.log(err)
      }
    })
    .render(paypal.value)
}


</script>


<template>
  <div class="p-4 max-w-4xl mx-auto">
    <div v-if="!productStore.loaded" class="space-y-4">
      <CartCardSkeleton v-for="n in 15" :key="n" />
    </div>
    <div v-else-if="!formattedCart.length">
      <h1 class="text-xl">Cart is empty.</h1>
    </div>
    <section v-else-if="!paidFor">
      <div class="space-y-4">
        <CartCard
          v-for="(cartProduct, index) in formattedCart"
          :key="index"
          :cartProduct="cartProduct"
        />
        <div class="text-right text-2xl md:text-4xl">
          Total: {{ toCurrency(cartStore.total) }}
        </div>
      </div>
    </section>

    <section v-if="paidFor">
      <div>

      </div>
    </section>

    <div class="card md:card-side bordered mt-4" ref="paypal">
    </div>
  </div>
</template>


