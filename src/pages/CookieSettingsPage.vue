<template>
<div>
  This is the cookie settings page
</div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("ACTION_SET_READY_FOR_NEXT_PAGE", true);
  }
}
</script>

<style scoped>

</style>