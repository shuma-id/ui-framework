<template>
<div class="v-select" :class="{'__focused': isFocused, '__with-error': error}">
    <div class="input__wrapper">
        <VInput v-model="selectedOption.label" ref="input" @focus="focusHandler" @blur="blurHandler"
            :placeholder="placeholder" :disabled="disabled" :error="error" :readonly="true"
        />
        <img class="arrow-icon" src="./arrow-icon.svg" alt="Arrow icon">
    </div>
    <div class="list__container" v-if="isFocused" @mousedown.prevent="mousedownHandler" @keydown="handleKeydown" tabindex="0">
        <div class="row" v-for="(option, index) in options" 
            :key="option.value" @click="selectOption(option)"
            :class="{'selected': option.value === modelValue, 'highlighted': index === selectedIndex}" 
            @mouseover="highlightOption(index)">
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
        modelValue: {type: String, default: ''},
        placeholder: {type: String, default: ''},
        disabled: {type: Boolean, default: false},
        error: {type: Boolean, default: false},
        options: Array,
    },
    data() {
        return {
            isFocused: false,
            selectedIndex: -1,
        };
    },
    methods: {
        selectOption(option) {
            this.$emit('update:modelValue', option.value);
            this.isFocused = false;
            this.selectedIndex = -1;
            this.$refs.input.blur();
        },
        focusHandler() {
            this.isFocused = true;
            document.addEventListener('keydown', this.handleKeydown);
        },
        blurHandler() {
            this.isFocused = false;
            document.removeEventListener('keydown', this.handleKeydown);
        },
        mousedownHandler() {
            if (!this.isFocused) {
                this.focusHandler();
            }
        },
        handleKeydown(e) {
            if (this.isFocused) {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (e.key === 'ArrowDown') {
                        this.selectedIndex = (this.selectedIndex + 1) % this.options.length;
                    } else if (e.key === 'ArrowUp') {
                        this.selectedIndex = (this.selectedIndex - 1 + this.options.length) % this.options.length;
                    }
                } else if (e.key === 'Enter') {
                    if (this.selectedIndex >= 0 && this.selectedIndex < this.options.length) {
                        this.selectOption(this.options[this.selectedIndex]);
                    }
                }
            }
        },
        highlightOption(index) {
            this.selectedIndex = index;
        },
    },
    computed: {
        selectedOption() {
            return this.options.find(option => option.value === this.modelValue) || {};
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