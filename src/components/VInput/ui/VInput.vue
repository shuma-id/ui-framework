<template>
  <div class="form__container" :class="{'__with-error': error, '__disabled': disabled}">
    <div class="input__wrapper">
      <input 
        type="text" id="VInput" placeholder="" ref="input"
        :class="['input', {'__complete': isComplete, 'focused': isFocused}]" 
        :value="modelValue" :disabled="disabled"
        @input="updateValue" @focus="focus" @blur="blur"
      />
      <label for="VInput" class="placeholder">{{ placeholder }}</label>
      <img class="error-icon" src="./icon-errors.svg" alt="Error icon image">
    </div>
  </div>
</template>

<script>
export default {
  name: 'VInput',
  props: {
    modelValue: { type: String, default: ''},
    placeholder: { type: String, default: ''},
    disabled: { type: Boolean, default: false},
    error: { type: Boolean, default: false},
  },
  data() {
    return {
      isFocused: false,
    };
  },
  methods: {
    updateValue($event) {
      this.$emit('update:modelValue', $event.target.value);
    },
    focus() {
      this.isFocused = true;
    },
    blur() {
      this.isFocused = false;
    },
  },
  computed: {
    isComplete() {
      return this.modelValue.trim().length > 0;
    }
  },
}
</script>

<style scoped lang="scss">
.form__container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.input__wrapper {
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.input {
  width: 100%;
  height: 64px;

  box-sizing: border-box;
  padding: 20px 39px 20px 18px;
  background: #F7F7F7;
  border: 1px solid transparent;
  border-radius: 12px;
  outline: none;
  
  font-size: 16px;
  font-weight: 400;
  color: #000;
  transition: background-color 0.3s, border-color 0.3s;
}

.input:hover {
  background: #F7F7F7;
  color: #000;
}

.input.focused {
  background: transparent;
  border: 1px solid #7000FF;
  padding: 20px 39px 12px 18px;
}

.input:not(.focused) {
  padding: 20px 39px 12px 18px;
}

.input.__complete:not(.focused):hover {
  background: #F2F2F2;
  color: #000;
}

.form__container.__with-error .input {
  background: #FFF0F2;
  color: #808080;

  &:hover {
    background: #FFF0F2;
    color: #808080;
  }

  &.focused {
    border: 1px solid transparent;
  }
}

.error-icon {
  position: relative;
  top: 0;
  left: -33px;
  opacity: 0;
  transition: 0.3s;
}

.form__container.__with-error .error-icon {
  opacity: 1;
}

.placeholder {
  position: absolute;
  top: 0;
  left: 18px;

  font-size: 16px;
  font-weight: 400;
  color: #808080;
  pointer-events: none;

  transform: translate3D(0, 24px, 0);
  transition: 0.3s;
}

.input.focused + .placeholder,
.input:not(:placeholder-shown) + .placeholder {
  transform: translate3D(0, 14px, 0);
  font-size: 12px;
  color: #A6A6A6;
}

.form__container.__with-error .placeholder {
  color: #FF002B;
}

.form__container.__disabled .input__wrapper {
  .input:disabled {
    background: #F7F7F7;
    color: #808080;
  }

  .input:disabled:not(.focused):hover {
    background: #F7F7F7;
  }
}
</style>