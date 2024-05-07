<template>
  <span :class="arrowClassName"></span>
</template>

<script>
export default {
  name: "VArrow",
  props: {
    type: {
      type: String,
      default: 'active'
    }
  },
  computed: {
    arrowClassName() {
      return `v-arrow v-arrow_${this.type}`
    }
  }
}
</script>

<style scoped lang="scss">
.v-arrow {
  display: inline-block;
  height: 24px;
  width: 24px;

  &_active {
    background-image: url("../../../assets/arrow-black.svg");
  }

  &_passive {
    background-image: url("../../../assets/arrow-grey.svg");
  }

}
</style>