<template>
  <tr class="tabel__row">
    <td class="tabel__data-cell checkbox">
      <label for="filter" class="checkbox-container">
        <input
          class="checkbox"
          type="checkbox"
          name="filter"
          @change="$emit('check-item')"
        />
        <span class="checkmark"></span>
      </label>
    </td>

    <TableDataCell
      v-for="item in getProductsHead"
      :key="item.id"
      :item="item"
      :product="product"
    />

    <td class="tabel__data-cell btn">
      <button class="tabel__delete-btn" @click="$emit('remove-item')">
        <img src="../assets/img/Trash.svg" alt="trash" />
        <span>delete</span>
      </button>
    </td>
  </tr>
</template>

<script>
import TableDataCell from "./TableDataCell";
import { mapGetters } from "vuex";

export default {
  props: ["product"],
  components: {
    TableDataCell,
  },
  computed: {
    ...mapGetters(["getProductsHead"]),
  },
  methods: {},
};
</script>

<style lang="scss">
@import "../assets/scss/_stylebase.scss";

.tabel {
  &__row {
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #fff;

    &:nth-child(even) {
      background-color: $tableRowColor;
    }

    &:hover {
      background-color: $tableRowHoverColor;
    }
  }

  &__data-cell.checkbox {
    width: 80px;
    padding-left: 37px;
  }

  &__data-cell.btn {
    text-align: end;
  }

  &__delete-btn {
    opacity: 0;
    background-color: transparent;
    transition: all 0.3s ease;
    color: $selectHeadText;
  }

  &__row:hover &__delete-btn {
    opacity: 1;
  }
}
</style>
