<template>
  <thead class="table__head">
    <tr class="table__row">
      <th class="table__head-title checkbox"></th>

      <th
        class="table__head-title"
        :class="{ active: head.isSorting }"
        v-for="head in getProductsHead"
        :key="head.id"
        v-show="head.isShow"
        @click="sort(head.title, head.isSorting)"
      >
        <p>{{ head.title | fisrtLetterUpperCase(head.title) }}</p>

        <img
          v-show="head.isSorting && !direction"
          src="../assets/img/arrow-down.svg"
          alt="down"
        />
        <img
          v-show="head.isSorting && direction"
          src="../assets/img/arrow-up.svg"
          alt="up"
        />
      </th>

      <th class="table__head-title delete-btn"></th>
    </tr>
  </thead>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      currentSortDir: "asc",
      currentSort: "product",
    };
  },
  computed: {
    ...mapGetters(["getProductsHead"]),
    direction() {
      return this.currentSortDir === "asc";
    },
  },
  filters: {
    fisrtLetterUpperCase(value) {
      let head = value[0].toUpperCase() + value.substr(1);
      if (head === "Fat" || head === "Protein" || head === "Carbs") {
        return `${head} (g)`;
      } else if (head === "Iron") {
        return `${head} (%)`;
      } else if (head === "Product") {
        return `${head} (100g serving)`;
      }
      return head;
    },
  },
  methods: {
    ...mapMutations(["sortProducts"]),
    sort(title, isActive) {
      if (!isActive) {
        return;
      }
      if (title === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = title;
      const sortParams = {
        direction: this.currentSortDir,
        title: this.currentSort,
      };

      this.sortProducts(sortParams);
      console.log("sorted");
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_stylebase.scss";

.table {
  &__head {
    border-bottom: 1px solid $horizontalLineColor;
  }

  &__row {
  }

  &__head-title {
    cursor: pointer;
    padding: 16px 0;
    background-color: #fff;

    p,
    img {
      display: inline-table;
    }
  }

  &__head-title.active {
    color: $secondaryColor;
  }
}
</style>
