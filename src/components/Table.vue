<template>
  <table class="table">
    <TableHead />
    <TableBody />
    <Confirm />
  </table>
</template>

<script>
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Confirm from "./Confirm";

export default {
  components: {
    TableHead,
    TableBody,
    Confirm,
  },
};
</script>

<style lang="scss">
.table {
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
  border-spacing: 0;
}
</style>
