<template>
  <td class="table__data-cell" v-show="item.isShow">
    {{ product[item.title] }}
  </td>
</template>

<script>
export default {
  props: ["product", "item"],
};
</script>

<style lang="scss">
.table {
  &__data-cell {
    padding: 12px 0;
  }
}
</style>
