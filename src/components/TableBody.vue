<template>
  <tbody class="table__body">
    <TableRow
      v-for="product in getProductsPerPage"
      :key="product.id"
      :product="product"
      @remove-item="removeItem(product.id)"
      @check-item="checkItem(product.id)"
    />
  </tbody>
</template>

<script>
import TableRow from "./TableRow";
import { mapMutations } from "vuex";

export default {
  components: {
    TableRow,
  },
  computed: {
    getProductsPerPage() {
      return this.$store.getters.allProducts;
    },
  },
  methods: {
    ...mapMutations([
      "showConfirmModal",
      "updateRemoveItem",
      "updateRemoveItems",
    ]),
    removeItem(id) {
      this.showConfirmModal();
      this.updateRemoveItem(id);
    },
    checkItem(id) {
      this.updateRemoveItems(id);
    },
  },
};
</script>

<style lang="scss">
.table {
  &__body {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
  }
}
</style>
