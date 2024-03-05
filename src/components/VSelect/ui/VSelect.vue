<template>
<div class="v-select" :class="{'__focused': isFocused, '__with-error': error}" >
    <div class="input__wrapper">
        <VInput v-model="selectedOption.label" ref="input"
        @focus="focusHandler" @blur="blurHandler"
        :placeholder="placeholder" :disabled="disabled" :error="error" :readonly="true"
        />
        <img class="arrow-icon" src="./arrow-icon.svg" alt="Arrow icon">
    </div>
    <div class="list__container" v-if="isFocused">
        <div class="row" v-for="(option, index) in currencyOptions" 
            :key="option.value" @click="selectOption(option)"
            :class="{'selected': option.value === modelValue, 'highlighted': index === selectedIndex}">
            {{ option.label }}
        </div>
    </div>
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
        modelValue: String,
        placeholder: String,
        disabled: Boolean,
        error: Boolean,
    },
    data() {
        return {
            isFocused: false,
            selectedIndex: -1,
            currencyOptions: [
                {value: "rub", label: "Russian Ruble"},
                {value: "usd", label: "US Dollar"},
                {value: "idr", label: "Indonesian Rupiah"},
                {value: "eur", label: "Euro"},
            ],
        }
    },
    mounted() {
        window.addEventListener('keydown', this.handleKeydown)
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.handleKeydown);
    },
    methods: {
        selectOption(option) {
            this.$emit('update:modelValue', option.value);
            this.isFocused = false;
        },
        focusHandler() {
            this.isFocused = true;
        },
        blurHandler() {
            this.isFocused = false;
        },
        handleKeydown(e) {
            if (e.key === 'ArrowDown' && this.selectedIndex < this.currencyOptions.length - 1) {
                this.selectedIndex++;
            } else if (e.key === 'ArrowUp' && this.selectedIndex > 0) {
                this.selectedIndex--;
            } else if (e.key === 'Enter') {
                this.selectOption(this.currencyOptions[this.selectedIndex]);
                if (this.$refs.input) {
                    this.$refs.input.blur();
                }
            }
        },
    },
    computed: {
        selectedOption() {
            return this.currencyOptions.find(option => option.value === this.modelValue) || {};
        },
    },
};
</script>

<style scoped lang="scss">
.v-select {
    width: 100%;
    
    .input__wrapper {
        position: relative;
        display: flex;
        align-items: center;
        
        .arrow-icon {
            position: absolute;
            top: 26px;
            left: calc(100% - 36px);

            transition: 0.3s;
            pointer-events: none;
        }
    }
    
    .list__container {
        margin-top: 6px;
        display: flex;
        flex-direction: column;

        background: #fff;
        border-radius: 12px;
        box-shadow: 0px 3px 15px rgba(76.50, 76.50, 76.50, 0.25);
        box-sizing: border-box;
        padding: 24px 12px;
        
        .row {
            box-sizing: border-box;
            padding: 9px 12px;
            border-radius: 8px;
            font-size: 18px;
            cursor: pointer;

            &:hover {
                background: #F7F7F7;
            }

            &.highlighted {
                background: #F7F7F7;
            }
        }    
    }
}

.__focused.v-select .arrow-icon {
    transform: rotate(-180deg);
} 

.__with-error.v-select .arrow-icon {
    opacity: 0;
}
</style>    