<template>
    <div class="v-select">
      <VInput :modelValue="modelValue" :placeholder="placeholder" :disabled="disabled" :error="error" @update:modelValue="updateModelValue" />
    </div>
  </template>
  
  <script>
  import VInput from '../../VInput/ui/VInput.vue';
  
  export default {
    name: 'VSelect',
    components: {
      VInput,
    },
    props: {
      modelValue: { type: String, default: '' },
      placeholder: { type: String, default: '' },
      disabled: { type: Boolean, default: false },
      error: { type: Boolean, default: false },
    },
    methods: {
      updateModelValue(value) {
        this.$emit('update:modelValue', value);
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  