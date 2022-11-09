<template>
  <div :style="'--itemColor: ' + color + ';'" class="smart-block">
    <div class="smart-block__inner">
      <p>{{ name }}</p>
    </div>

    <div class="smart-block__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    color: String
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.smart-block {
  width: 100%;
  background: $white;
  padding: 4px;
  border-radius: 15px;
  box-shadow: 0 0 200px 5px $white;

  &__inner {
    background: var(--itemColor);
    padding: 8px;
    border-radius: 5px;
    box-shadow: 0 0 200px 5px #f7f7f7;
    color: $white;
  }

  &__content {
    font-size: 14px;
    color: $sub-text-color;
    margin-top: 10px;
    padding: 10px 9px;

    p {
      margin: 10px 0 0 0;
    }
  }
}
</style>