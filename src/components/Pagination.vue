<template>
  <div class="pagination">
    <button class="pagination__prev-btn" @click="prevPage" :disabled="hasFirst">
      <img src="../assets/img/Left.svg" alt="prev" />
    </button>

    <div class="pagination__pages-info">
      <span class="pagination__start-item">{{
        getCurrentItemsInPage.start
      }}</span
      >-<span class="pagination__end-item">{{
        getCurrentItemsInPage.end
      }}</span>
      <span> of </span>
      <span class="pagination__last-item">{{ getLastItem }}</span>
    </div>

    <button class="pagination__next-btn" @click="nextPage" :disabled="hasLast">
      <img src="../assets/img/Right.svg" alt="next" />
    </button>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    ...mapGetters(["getCurrentItemsInPage", "getLastItem"]),
    hasFirst() {
      return this.currentPage === 1;
    },
    hasLast() {
      return this.getCurrentItemsInPage.end === this.getLastItem;
    },
  },
  methods: {
    ...mapMutations(["changePage"]),
    nextPage() {
      this.currentPage += 1;
      this.changePage(this.currentPage);
    },
    prevPage() {
      this.currentPage -= 1;
      this.changePage(this.currentPage);
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_stylebase.scss";

.pagination {
  display: flex;
  align-items: center;

  &__prev-btn,
  &__next-btn {
    @include size(32px);
    background-color: transparent;
    border: 1px solid $borderColor;
    box-sizing: border-box;
    border-radius: 2px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__pages-info {
    margin: 0 8px;
    color: $sortingTagsText;
  }

  &__start-item,
  &__end-item,
  &__last-item {
    font-weight: 600;
  }
}
</style>
