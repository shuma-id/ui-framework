<template>
  <div class="v-input" :class="{'__with-error': error, '__disabled': disabled, '__complete': isComplete, '__focused': isFocused}">
      <input 
        type="text" id="VInput" 
        :value="modelValue" :disabled="disabled"
        @input="updateValue" @focus="focus" @blur="blur"
      />
      <label for="VInput" class="placeholder">{{ placeholder }}</label>
      <img class="error-icon" src="./icon-errors.svg" alt="Error icon image">
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
.v-input {
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  input {
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

  .error-icon {
    position: relative;
    top: 0;
    left: -33px;
    opacity: 0;
    transition: 0.3s;
  }
}

.v-input:hover {
  input {
    color: #000;
    background: #F7F7F7;
  }
}

.__focused.v-input {
  input {
    background: transparent !important;
    border: 1px solid #7000FF;
    padding: 20px 39px 12px 18px;
  }

  .placeholder {
    transform: translate3D(0, 14px, 0);
    font-size: 12px;
    color: #A6A6A6;
  }
}

.__complete.v-input {
  input:not(.__focused) {  
    padding: 20px 39px 12px 18px;

    &:hover {
      background: #F2F2F2;
    }
  }

  .placeholder {
    transform: translate3D(0, 14px, 0);
    font-size: 12px;
    color: #A6A6A6;
  }
}

.__with-error.v-input {
  input {
    background: #FFF0F2 !important;
    color: #808080;
    border: 1px solid transparent;
  }

  .error-icon {
    opacity: 1;
  }

  .placeholder {
    color: #FF002B;
  }
}

.__disabled.v-input {
  input {
    color: #808080;
  }

  .placeholder {
    color: #A6A6A6;
  }
}
</style>