<template>
  <div class="confirm" v-show="getConfirmModalState">
    <h3 class="confirm__title">
      Are you sure you want to <span>delete item?</span>
    </h3>
    <div class="confirm__btns">
      <button class="confirm__cancel-btn btn" @click="cancel">Cancel</button>
      <button class="confirm__confirm-btn btn" @click="confirm">Confirm</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["getConfirmModalState"]),
  },
  methods: {
    ...mapActions(["removeProduct"]),
    ...mapMutations(["showConfirmModal"]),
    confirm() {
      this.removeProduct();
    },
    cancel() {
      this.showConfirmModal();
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_stylebase.scss";

.confirm {
  position: absolute;
  padding: 16px;
  top: 50%;
  right: 0;
  transform: translate(-50%);
  z-index: 99;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  text-align: center;
  &__title {
    margin-bottom: 8px;

    span {
      font-weight: 600;
    }
  }

  .btn {
    border-radius: 4px;
  }

  &__cancel-btn {
    margin-right: 16px;
    border: 1px solid #c6cbd4;
    background-color: transparent;
  }

  &__confirm-btn {
    background-color: $secondaryColor;
    color: #fff;
  }
}
</style>
