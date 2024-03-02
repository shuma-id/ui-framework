<template>
  <div class="form__container" :class="{'__with-error': error, '__disabled': disabled}">
    <div class="input__wrapper">
      <input 
        type="text" id="VInput" placeholder=""
        :class="['input', { 'error': error, '__complete': isComplete }]" 
        :value="modelValue" @input="updateValue" :disabled="disabled"
      />
      <label for="VInput" class="placeholder" :class="{ 'error': error }">{{ placeholder }}</label>
      <img class="error-icon" src="./icon-errors.svg" :class="{ 'error': error }" alt="Error icon image">
    </div>
  </div>
</template>

<script>
export default {
  name: 'VInput',
  props: {
    modelValue: { type: String, default: ''},
    placeholder: {type: String, default: ''},
    disabled: {type: Boolean, default: false},
    error: {type: Boolean, default: false},
  },
  methods: {
    updateValue($event) {
      this.$emit('update:modelValue', $event.target.value);
    }
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

  &.__with-error {
    .input__wrapper {
      .error {
        color: #FF002B;
        transition: 0.3s;
      }

      .input.error {
        background: #FFF0F2;
        color: #808080;
        border: 1px solid transparent;

        &:hover {
          background: #FFF0F2;  
          color: #808080;
        }

        &.__complete:not(:focus):hover {
          background: #FFF0F2;
          color: #808080;  
        }
      }

      .input + .placeholder.error,
      .input:focus + .placeholder.error {
        color: #FF002B;
        transition: 0.3s;
      }
    }
  }

  &.__disabled {
    .input__wrapper {
      .input:disabled {
        background: #F7F7F7;
        color: #808080;
      }

      .input:disabled:not(:focus):hover {
        background: #F7F7F7;
        color: #808080;
      }
    }
  }
  
  .input__wrapper {
    position: relative;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    
    .input {
      width: 100%;
      height: 64px;

      box-sizing: border-box; 
      padding: 20px 18px;

      background: #F7F7F7;
      border: 1px solid transparent;
      border-radius: 12px;
      outline: none;

      font-size: 16px;
      font-weight: 400;
      color: #000;
      transition: background-color 0.3s, border-color 0.3s;

      &:hover {
        background: #F7F7F7;
        color: #000;
      }
    
      &:focus {
        background: transparent;
        border: 1px solid #7000FF;
      }

      &.__complete:not(:focus):hover {
        background: #F2F2F2;
        color: #000;  
      }
    }

    .error-icon {
      position: relative;
      top: 0;
      left: -33px;
      
      opacity: 0;
      transition: 0.3s;

      &.error {
        opacity: 1;
      }
    }

    .placeholder {
      position: absolute;
      top: 0;
      left: 18px;

      font-size: 16px;
      font-weight: 400;
      color: #808080;

      transform: translateY(22px);
      transition: 0.3s;
    }

    .input:focus + .placeholder,
    .input:not(:placeholder-shown) + .placeholder {
      transform: translate3D(0, 8px, 0);
      font-size: 12px;
      color: #A6A6A6;
      transition: 0.3s;
    }
  }
}
</style>