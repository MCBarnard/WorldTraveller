<template>
  <div class="card">
    <div class="card__hover-block"></div>
    I'm a card
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.card {
  background: $bgGrey;
  cursor: pointer;
  padding: 20px;
  width: 100%;
  border-radius: 15px;
  position: relative;
  box-shadow: 0 0 200px 5px #f7f7f7;
  display: flex;
  justify-content: space-between;
  margin: 5px auto;
  overflow-x: hidden;
  transition: all 0.2s;

  &__hover-block {
    height: 100%;
    width: 6px;
    background: #f857a6;
    background: linear-gradient($lightBlue, $linkblue, $lightBlue);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    border-radius: 15px 0 0 15px;
  }
}
</style>