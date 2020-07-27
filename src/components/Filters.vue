<template>
  <div class="filters">
    <HeadsOrderFilter />

    <div>
      <button class="filters__delete-btn btn" @click="deleteItems">
        Delete ({{ getCheckedItem }})
      </button>
    </div>

    <PerPageFilter />

    <Pagination />

    <HeadsFilter />
  </div>
</template>

<script>
import HeadsFilter from "./HeadsFilter";
import Pagination from "./Pagination";
import HeadsOrderFilter from "./HeadsOrderFilter";
import PerPageFilter from "./PerPageFilter";

import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    HeadsFilter,
    Pagination,
    HeadsOrderFilter,
    PerPageFilter,
  },
  computed: {
    ...mapGetters(["getCheckedItem"]),
  },
  methods: {
    ...mapMutations(["showConfirmModal"]),
    deleteItems() {
      this.showConfirmModal();
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_stylebase.scss";

.filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-top: 2px solid #ededed;

  &__delete-btn {
    background-color: $secondaryColor;
    color: $secondaryFontColor;
  }
}
</style>
