<template>
  <div class="form__container">
    <div class="input__wrapper">
      <input 
        type="text" id="VInput" placeholder=""
        :class="['input', { 'error': error, '__complete': isComplete }]" 
        :value="modelValue" @input="updateValue" :disabled="disabled"
      />
      <label for="VInput" class="placeholder" :class="{ 'error': error }">{{ placeholder }}</label>
      <img class="error-icon" src="./icon-errors.svg" :class="{ 'error': error }" alt="Error icon image">
    </div>
    <span v-if="messageError" class="error-message" :class="{ 'messageError': messageError }">Error message</span>
  </div>
</template>

<script>
export default {
  name: 'VInput',
  props: {
    placeholder: {type: String, default: ''},
    disabled: {type: Boolean, default: false},
    error: {type: Boolean, default: false},
    modelValue: { type: String, default: ''},
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
      padding: 20px 39px 20px 18px;

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

      &:disabled {
        background: #F7F7F7;
        color: #808080;
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

    .error-icon {
      position: relative;
      top: 0;
      left: -33px;
      width: 15px;
      height: 15px;
      opacity: 0;
      transition: 0.3s;
    }

    .error-icon.error {
      opacity: 1;
    }

    .error {
      color: #FF002B;
      transition: 0.3s;
    }

    .input.error{
      background: #FFF0F2;
      color: #808080;
    }

    .input:focus + .placeholder,
    .input:not(:placeholder-shown) + .placeholder {
      transform: translateY(8px);
      font-size: 12px;
      color: #A6A6A6;
      transition: 0.3s;
    }

    .input + .placeholder.error,
    .input:focus + .placeholder.error {
      color: #FF002B;
      transition: 0.3s;
    }
  }

  .error-message {
    margin-top: 6px;
    margin-left: 18px;
    font-size: 12px;
    font-weight: 400;
    color: #FF002B;
    transition: 0.3s;
  }
}
</style>