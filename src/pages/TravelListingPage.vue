<template>
  <div>
    Travel Listing Page
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("ACTION_SET_READY_FOR_NEXT_PAGE", true);
  }
}
</script>