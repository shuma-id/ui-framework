<template>
  <button
    :class="['button', buttonType, buttonState]"
    :disabled="isDisabled"
    @mouseover="hover"
    @mousedown="press"  
    @mouseup="release"
    @mouseleave="release"
    >{{ label }}
</button>
</template>

<script>
export default {
  name: "VButton",
  props: {
    label: { type: String, required: true },
    type: { type: String, default: 'primary' },
    state: { type: String, default: 'main' }
  },
  computed: {
    buttonType() {
      return `button--${this.type}`;
    },
    buttonState() {
      return `button--${this.state}`;
    },
    isDisabled() {
      return this.state === 'disabled';
    }
  },
  methods: {
    hover() {
      if (!this.isDisabled) {
        this.$emit('update:state', 'hover');
      }
    },
    press() {
      if (!this.isDisabled) {
        this.$emit('update:state', 'pressed');
      }
    },
    release() {
      if (!this.isDisabled) {
        this.$emit('update:state', 'main');
      }
    }
  }
};
</script>

<style scoped lang="scss">
.button {
  display: inline-block;
  min-height: 64px;

  border: none;
  padding: 6px 24px;
  border-radius: 12px;

  font-size: 18px;
  font-weight: 400;
  text-align: center;
  cursor: pointer;

  &--primary {
    background: #7000FF;  
    color: #fff;
    
    &:hover { background: #6500E5; }
    &:active { background: #5A00CC; }
    &:disabled, &.disabled { background: #F7F7F7; color: #C4C4C4; }
  }

  &--secondary {
    background: #F7F7F7;  
    color: #000;
    
    &:hover { background: #EBE9E8; }
    &:active { background: #E6E5E4; }
    &:disabled, &.disabled { background: #F7F7F7; color: #CACACA; }
  }

  &--danger {
    background: #FF3355;  
    color: #fff;
    
    &:hover { background: #FF1A40; }
    &:active { background: #FF002B; }
    &:disabled, &.disabled { background: #F7F7F7; color: #CACACA; }
  } 

  &--borderless {
    background: inherit;  
    color: #000;
    
    &:hover { background: none; color: #000; text-decoration: underline; }
    &:active { background: none; color: #545454; text-decoration: underline; }
    &:disabled, &.disabled { background: none; color: #CACACA; }
  }
}
</style>
