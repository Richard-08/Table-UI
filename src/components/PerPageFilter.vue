<template>
  <ul class="dropdown page-filter">
    <li class="dropdown__title" @click="showFilter">
      <span>{{ getPageSize }} per page</span>
      <img src="../assets/img/Down.svg" alt="down" />
    </li>

    <ul class="dropdown__filter" :class="{ show: isShow }">
      <li
        class="dropdown__filter-item"
        v-for="(filter, index) in filters"
        :key="index"
        @click="changeFilter(filter)"
      >
        {{ filter }}
      </li>
    </ul>
  </ul>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      filters: [10, 15, 20],
      isShow: false,
    };
  },
  computed: {
    ...mapGetters(["getPageSize"]),
  },
  methods: {
    ...mapMutations(["changePerPageSize"]),
    showFilter() {
      this.isShow = !this.isShow;
    },
    changeFilter(filter) {
      this.changePerPageSize(filter);
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_stylebase.scss";

.dropdown.page-filter {
  .dropdown__filter {
    width: 100%;
    height: auto;
    text-align: center;
    padding: 10px 0;
  }

  .dropdown__filter-item {
    cursor: pointer;
    padding: 10px 0;
    transition: all 0.3s ease;
    margin-bottom: 0;

    &:hover {
      background-color: $tableRowColor;
    }

    &:first-child {
      font-weight: normal;
    }
  }
}
</style>
