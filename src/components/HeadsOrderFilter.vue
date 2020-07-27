<template>
  <div class="heads-filter">
    <h5>Sorting by:</h5>
    <ul class="heads-filter__items">
      <li
        class="heads-filter__item"
        v-for="head in getFilters"
        :key="head.id"
        :class="{ active: head.isSorting }"
        @click="sortByHead(head.id)"
      >
        {{ head.title | capitalize(head.title) }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["getFilters"]),
  },
  filters: {
    capitalize(value) {
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
    ...mapMutations(["sortingHeadsBy"]),
    sortByHead(id) {
      this.sortingHeadsBy(id);
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_stylebase.scss";

.heads-filter {
  display: flex;
  align-items: center;
  color: $sortingTagsText;

  h5 {
    font-weight: 600;
    margin-right: 8px;
  }

  &__items {
    display: flex;
    align-items: center;
  }

  &__item {
    padding: 3px 5px 5px 8px;
    border-radius: 2px;
    cursor: pointer;
  }

  &__item.active {
    background-color: $secondaryColor;
    color: #ffffff;
  }
}
</style>
