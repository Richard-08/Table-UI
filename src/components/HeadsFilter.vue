<template>
  <ul class="dropdown">
    <li class="dropdown__title" @click="showFilters">
      <span
        >{{ getCountSelectedFilters }}
        {{ getCountSelectedFilters > 1 ? "columns" : "column" }} selected</span
      >
      <img src="../assets/img/Down.svg" alt="down" />
    </li>

    <ul class="dropdown__filter" :class="{ show: isShow }">
      <li class="dropdown__filter-item">
        <label for="filter" class="checkbox-container">
          Select All
          <input
            class="checkbox"
            type="checkbox"
            name="filter"
            checked="true"
            @change="toggleAllFilters"
          />
          <span class="checkmark"></span>
        </label>
      </li>

      <li
        class="dropdown__filter-item"
        v-for="head in getFilters"
        :key="head.id"
      >
        <label for="filter" class="checkbox-container">
          {{ head.title | capitalize(head.title) }}
          <input
            class="checkbox"
            type="checkbox"
            name="filter"
            :checked="head.isShow"
            v-model="head.isShow"
          />
          <span class="checkmark"></span>
        </label>
      </li>
    </ul>
  </ul>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      filters: [],
      isShow: false,
    };
  },
  computed: {
    ...mapGetters(["getProductsHead", "getFilters"]),
    getCountSelectedFilters() {
      return this.getProductsHead.filter((value) => value.isShow).length;
    },
  },
  methods: {
    ...mapMutations(["changeAllFilters"]),
    toggleAllFilters() {
      this.changeAllFilters();
    },
    showFilters() {
      this.isShow = !this.isShow;
    },
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
};
</script>

<style lang="scss">
@import "../assets/scss/_stylebase.scss";

.dropdown {
  position: relative;

  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    border: 1px solid $borderColor;
    border-radius: 2px;
    padding: 4px 13px 4px 20px;
    color: $dropdownFontColor;
    user-select: none;
  }

  &__filter {
    position: absolute;
    left: 0;
    top: 140%;
    @include size(207px, 243px);
    overflow-y: auto;
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    z-index: 10;
    padding: 15px 17px;
    transform: translateY(-55%) scaleY(0);
    transition: all 0.3s ease;
  }

  &__filter.show {
    transform: translateY(0) scaleY(1);
  }

  &__filter-item {
    margin-bottom: 22px;

    &:last-child {
      margin-bottom: 0;
    }
    
    &:first-child {
      font-weight: 600;
    }
  }
}

/* --------------Checkboxes style------------ */

.checkbox-container {
  /* display: block; */
  position: relative;
  padding-left: 27px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.checkbox-container .checkbox {
  position: absolute;
  left: 0;
  opacity: 0;
  cursor: pointer;
  height: 100%;
  width: 100%;
  z-index: 10;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 14px;
  width: 14px;
  background-color: transparent;
  border: 1px solid #b9bdcf;
  box-sizing: border-box;
  border-radius: 2px;
}

.checkbox-container:hover .checkbox ~ .checkmark {
  background-color: #ccc;
}

.checkbox-container .checkbox:checked ~ .checkmark {
  background-color: $secondaryColor;
  border: 1px solid $secondaryColor;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container .checkbox:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 15%;
  top: 50%;
  width: 5px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg) translate(-50%, -50%);
}
</style>
