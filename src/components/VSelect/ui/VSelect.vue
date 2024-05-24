<template>
    <div class="v-select" :class="{ __focused: isFocused, '__with-error': error }">
        <div class="input__wrapper">
            <VInput
                v-model="filteredQuery"
                ref="input"
                @focus="focusHandler"
                @blur="blurHandler"
                @keydown="handleKeydown"
                :placeholder="placeholder"
                :disabled="disabled"
                :error="error"
                :readonly="isInputReadonly"
                :id="id"
            />
            <img class="arrow-icon" src="./arrow-icon.svg" alt="Arrow icon" />
        </div>
        <div class="options__container" v-if="isFocused" @mousedown.prevent tabindex="0">
            <div
                class="row"
                v-if="filteredOptions.length > 0"
                v-for="(option, index) in filteredOptions"
                :key="option.value"
                @click="selectOption(option)"
                :class="{
                    selected: option.value === modelValue,
                    highlighted: index === selectedIndex,
                }"
                @mouseover="highlightOption(index)"
            >
                {{ option.label }}
            </div>
            <div v-else-if="filteredQuery.trim() !== ''">No results found</div>
        </div>
    </div>
</template>

<script>
import VInput from "../../VInput/ui/VInput.vue";

export default {
    name: "VSelect",
    components: {
        VInput,
    },
    props: {
        modelValue: { type: String, default: "" },
        placeholder: { type: String, default: "" },
        disabled: { type: Boolean, default: false },
        error: { type: Boolean, default: false },
        options: Array,
        filterable: { type: Boolean, default: false },
        id: { type: String, required: true },
    },
    data() {
        return {
            isFocused: false,
            selectedIndex: -1,
            filteredQuery: "",
            inputState: !this.filterable,
            buffer: "",
        };
    },
    methods: {
        selectOption(option) {
            this.$emit("update:modelValue", option.value);
            this.buffer = option.label;
            this.isFocused = false;
            this.selectedIndex = -1;
            this.filteredQuery = option.label;
            this.$refs.input.blur();
        },
        focusHandler() {
            this.isFocused = true;
            this.inputState = false;
        },
        blurHandler() {
            this.isFocused = false;
            this.inputState = true;
            this.clearInput();
            this.selectedIndex = -1;
        },
        handleKeydown(e) {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                if (e.key === "ArrowDown") {
                    this.selectedIndex = (this.selectedIndex + 1) % this.filteredOptions.length;
                } else if (e.key === "ArrowUp") {
                    this.selectedIndex =
                        (this.selectedIndex - 1 + this.filteredOptions.length) %
                        this.filteredOptions.length;
                }
            } else if (e.key === "Enter") {
                if (this.selectedIndex >= 0 && this.selectedIndex < this.filteredOptions.length) {
                    this.selectOption(this.filteredOptions[this.selectedIndex]);
                }
            }
        },
        highlightOption(index) {
            this.selectedIndex = index;
        },
        clearInput() {
            if (this.filteredOptions.length === 0) {
                this.filteredQuery = "";
            }
            this.filteredQuery = this.buffer;
        },
    },
    computed: {
        filteredOptions() {
            if (!this.filterable) {
                return this.options;
            }
            return this.options.filter((option) =>
                option.label.toLowerCase().startsWith(this.filteredQuery.toLowerCase())
            );
        },
        isInputReadonly() {
            return !this.filterable || this.inputState;
        },
    },
    watch: {
        modelValue() {
            if (this.modelValue) {
                const o = this.options.find((o) => o.value == this.modelValue);
                this.filteredQuery = o.label;
            }
        },
    },
};
</script>

<style scoped lang="scss">
.v-select {
    width: 100%;
    position: relative;

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

    .options__container {
        margin-top: 6px;
        display: flex;
        flex-direction: column;
        position: absolute;
        width: 100%;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 3px 15px rgba(76.5, 76.5, 76.5, 0.25);
        box-sizing: border-box;
        padding: 24px 12px;
        z-index: 10;
        max-height: 200px;
        overflow-x: hidden;
        overflow-y: scroll;

        .row {
            box-sizing: border-box;
            padding: 9px 12px;
            border-radius: 8px;
            font-size: 18px;
            cursor: pointer;

            &.highlighted {
                background: #f7f7f7;
            }
        }
    }

    &:deep .icon {
        display: none;
    }
}

.__focused.v-select .arrow-icon {
    transform: rotate(-180deg);
}

.__with-error.v-select .arrow-icon {
    opacity: 0;
}
</style>
