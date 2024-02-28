<template>
  <div class="button">{{ label }}</div>
</template>

<script>
export default {
  name: "VButton",
  props: {
    label: { type: String, required: true },
  },
};
</script>

<style scoped lang="scss">
.button {
  background: #999;
  padding: 10px 20px;
  text-align: center;
  cursor: pointer;
}
.button:hover {
  background: #555;
}
</style>
