<template>
  <div id="app">
    <div class="container">
      <h1>Table UI</h1>

      <Filters />

      <Table />

      <div class="error-message" v-show="getServerErrors">
        <h2>Server Error! Try again...</h2>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "./components/Table";
import Filters from "./components/Filters";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Table,
    Filters,
  },
  async mounted() {
    this.$store.dispatch("fetchProducts");
  },
  computed: {
    ...mapGetters(["getServerErrors"]),
  },
};
</script>

<style lang="scss">
@import "./assets/scss/_stylebase.scss";

#app {
  font-family: $mainFont;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $mainFontColor;
  font-size: $mainFontSize;
  padding-top: 32px;
  padding-bottom: 100px;
  min-height: 100vh;
  background-color: $bgColor;
}

.container {
  max-width: 100%;
  width: 1140px;
  margin: 0 auto;
}

h1 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 16px;
}

img {
  max-width: 100%;
}

button {
  cursor: pointer;
}

.btn {
  padding: 5px 15px;
  border-radius: 2px;
}

.error-message {
  position: absolute;
  top: 10px;
  right: 50%;
  background-color: #fff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
  padding: 20px;
  border-radius: 4px;
  color: tomato;
  animation: appear 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @keyframes appear {
    0% {
      transform: translateY(-100%);
    }

    100% {
      transform: translateY(0);
    }
  }
}
</style>
