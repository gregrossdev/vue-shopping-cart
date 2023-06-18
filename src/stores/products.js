import { defineStore } from 'pinia';

const fakeStoreUrl = 'http://localhost:3000';

export const useProductStore = defineStore({
  id: 'products',

  state: () => ({
    items: {},
    ids: [],
  }),

  getters: {
    list() {
      return this.ids.map((i) => this.items[i]);
    },

    loaded() {
      return this.ids.length > 0;
    },
  },

  actions: {
    async fetchAll() {
      if (this.loaded) return;

      const res = await fetch(`${fakeStoreUrl}/products`);
      const data = await res.json();
      this.ids = data.map((product) => {
        this.items[product.id] = product;
        return product.id;
      });
    },
  },
});
