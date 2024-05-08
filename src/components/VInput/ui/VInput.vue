<template>
    <div
        class="v-input"
        :class="{
            '__with-error': error,
            __disabled: disabled,
            __complete: isComplete || isCompleteArea,
            __focused: isFocused,
        }"
    >
        <input
            :type="type"
            :id="id"
            ref="input"
            :value="modelValue"
            :disabled="disabled"
            :readonly="readonly"
            @input="updateValue"
            @focus="isFocused = true"
            @blur="isFocused = false"
            class="__field"
            v-if="typeInput === 'input'"
        />
        <textarea
            :id="id"
            :value="modelValueArea"
            @focus="isFocused = true"
            @blur="isFocused = false"
            class="__field __field-area"
            v-if="typeInput === 'textarea'"
        />
        <label for="VInput" class="placeholder">{{ placeholder }}</label>
        <img class="icon error-icon" src="./icon-errors.svg" alt="Error icon image" />
        <img class="icon done-icon" src="./icon-done.svg" alt="Done icon image" />
    </div>
</template>

<script>
export default {
    name: "VInput",
    props: {
        id: { type: String, required: true },
        type: { type: String, default: "text" },
        modelValue: { type: String, default: "" },
        modelValueArea: { type: String, default: "" },
        placeholder: { type: String, default: "" },
        disabled: { type: Boolean, default: false },
        error: { type: Boolean, default: false },
        readonly: { type: Boolean, default: false },
        typeInput: { type: String, required: true },
    },
    data() {
        return {
            isFocused: false,
        };
    },
    methods: {
        updateValue($event) {
            this.$emit("update:modelValue", $event.target.value);
            this.$emit("change", this.modelValue);
        },
    },
    computed: {
        isComplete() {
            return this.modelValue.trim().length > 0;
        },
        isCompleteArea() {
            return this.modelValueArea.trim().length > 0;
        },
    },
};
</script>

<style scoped lang="scss">
.v-input {
    width: 100%;
    position: relative;
    display: flex;
    gap: 6px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background: var(--color-input-bg);
    border-radius: 12px;

    .__field {
        width: 100%;
        min-height: 64px;
        margin-right: -36px;
        padding: 8px 18px;
        background: var(--color-input-bg);
        border: 1px solid transparent;
        border-radius: 12px;
        outline: none;
        font-size: 16px;
        font-weight: 400;
        color: #000;
        transition:
            background-color 0.3s,
            border-color 0.3s;
    }

    .__field-area {
        height: 84px;
        padding: 12px 18px 18px;
        background: var(--color-textarea-bg);
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

    &:hover {
        .placeholder {
            color: var(--color-main-text);
        }
    }

    .icon {
        position: relative;
        top: 0;
        left: 0;
        opacity: 0;
        transition: 0.3s;
        pointer-events: none;
    }
}

.v-input.__focused {
    .__field {
        background: transparent !important;
        border: 1px solid var(--main-color);
        padding-top: 28px;
    }

    .__field-area {
        padding-top: 44px;
    }

    .placeholder {
        transform: translate3D(0, 14px, 0);
        font-size: 12px;
        color: var(--color-main-gray);
    }
}

.v-input.__complete,
.v-input:has(.__field:autofill),
.v-input:has(.__field:-webkit-autofill) {
    .__field:not(.__focused) {
        padding: 20px 49px 12px 18px;

        &:hover {
            background: #f2f2f2;
        }
    }

    .done-icon {
        opacity: 1;
    }

    .placeholder {
        transform: translate3D(0, 14px, 0);
        font-size: 12px;
        color: #a6a6a6;
    }
}

.__with-error.v-input {
    .__field {
        background: #fff0f2 !important;
        color: #808080;
        border: 1px solid transparent;
    }

    .error-icon {
        opacity: 1;
    }

    .placeholder {
        color: #ff002b;
    }
}

.__disabled.v-input {
    .__field {
        color: #808080;
    }

    .placeholder {
        color: #a6a6a6;
    }
}
</style>
