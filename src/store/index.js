import Vue from 'vue'
import Vuex from 'vuex'
import { getProducts, deleteProducts } from './request';

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    async fetchProducts(ctx) {
      const products = await getProducts().catch(error => {
        ctx.commit('catchServerError');
        console.log(error);
      });
      ctx.commit('updateProducts', products);

      const headsArr = Object.keys(products[0]).slice(1);
      const heads = [];
      const filters = [];
      headsArr.forEach((value, index) => {
        let obj = {
          id: index,
          title: value,
          isShow: true,
          isSorting: false,
        }
        heads.push(obj);
        filters.push(obj);
      });
      ctx.commit('getProductsHead', heads);
      ctx.commit('updateFilters', filters);
    },
    async removeProduct(ctx) {
      const response = await deleteProducts().catch(error => {
        ctx.commit('catchServerError');
        console.log(error);
      });

      if (response) {
        ctx.commit('deleteItem');
      }
    },
  },
  state: {
    products: [],
    heads: [],
    filters: [],
    currentPage: 1,
    prevPage: 0,
    pageSize: 10,
    isRemoveItem: null,
    confirm: false,
    isRemoveItems: [],
    serverError: false,
  },
  mutations: {
    updateProducts(state, products) {
      state.products = products;
    },
    getProductsHead(state, heads) {
      state.heads = heads;
    },
    updateFilters(state, filters) {
      state.filters = filters;
    },
    changePage(state, page) {
      state.currentPage = page;
      state.prevPage = page * state.pageSize - state.pageSize;
    },
    sortingHeadsBy(state, id) {
      state.heads.map(value => value.id === id ? value.isSorting = !value.isSorting : value.isSorting = false);
      state.heads = [...state.heads.filter(value => value.isSorting), ...state.heads.filter(value => !value.isSorting)]
    },
    changeAllFilters(state) {
      state.heads.map(value => value.isShow = !value.isShow);
    },
    sortProducts(state, sortParams) {
      state.products.sort((a, b) => {
        let modifier = 1;
        if (sortParams.direction === 'desc') {
          modifier = -1;
        }
        if (a[sortParams.title] < b[sortParams.title]) {
          return -1 * modifier;
        }
        if (a[sortParams.title] > b[sortParams.title]) {
          return 1 * modifier;
        }
        return 0;
      })
    },
    changePerPageSize(state, value) {
      state.pageSize = value;
    },
    showConfirmModal(state) {
      state.confirm = !state.confirm;
    },
    updateRemoveItem(state, id) {
      state.isRemoveItem = id;
    },
    updateRemoveItems(state, id) {
      if (state.isRemoveItems.includes(id)) {
        state.isRemoveItems = state.isRemoveItems.filter(value => value !== id);
      } else {
        state.isRemoveItems.push(id);
      }

    },
    deleteItem(state) {
      if (state.isRemoveItem) {
        state.products = state.products.filter(value => value.id !== state.isRemoveItem);
        console.log('removed');

        state.isRemoveItem = null;
        state.confirm = false;
      } else {
        const items = state.isRemoveItems;
        console.log(items);
        state.products = state.products.filter(value => !items.includes(value.id));
        console.log('items-removed')

        state.confirm = false;
        state.isRemoveItems = [];
      }
    },
    catchServerError(state) {
      state.serverError = true;
      setTimeout(() => {
        state.serverError = false;
      }, 4000);
    }
  },
  getters: {
    allProducts(state) {
      return state.products.slice(state.prevPage, state.currentPage * state.pageSize);
    },
    getProductsHead(state) {
      return state.heads;
    },
    getCurrentItemsInPage(state) {
      const obj = {
        start: state.prevPage + 1,
        end: state.currentPage * state.pageSize
      }
      return obj;
    },
    getLastItem(state) {
      return state.products.length;
    },
    getFilters(state) {
      return state.filters;
    },
    getPageSize(state) {
      return state.pageSize;
    },
    getConfirmModalState(state) {
      return state.confirm;
    },
    getCheckedItem(state) {
      return state.isRemoveItems.length;
    },
    getServerErrors(state) {
      return state.serverError;
    }
  },
})
