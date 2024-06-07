<template>
    <div
        class="v-input"
        :class="{
            '__with-error': error,
            __disabled: disabled,
            __complete: isComplete,
            __focused: isFocused,
        }"
    >
        <span class="__prefix" v-if="prefix && (isFocused || isComplete)">
            {{ prefix }}
        </span>
        <input
            :type="type"
            :id="id"
            ref="input"
            :value="modelValue"
            :disabled="disabled"
            :readonly="readonly"
            @input="updateValue"
            @focus="focus"
            @blur="blur"
            @mousedown="mousedown"
            class="__field"
            :maxlength="maxLength"
            v-if="!textarea"
        />
        <textarea
            :id="id"
            :value="modelValue"
            :disabled="disabled"
            :readonly="readonly"
            @input="updateValue"
            @focus="focus"
            @blur="blur"
            @mousedown="mousedown"
            class="__field __field-area"
            v-if="textarea"
            ref="ta"
            :style="{ height: height + 'px' }"
        />
        <img class="icon done-icon" src="./icon-done.svg" alt="Done icon image" />
        <img class="icon error-icon" src="./icon-errors.svg" alt="Error icon image" />
        <label for="VInput" class="placeholder">{{ placeholder }}</label>
        <p class="error-text" v-if="error">{{ errorText }}</p>
    </div>
</template>

<script>
export default {
    name: "VInput",
    props: {
        id: { type: String, required: true },
        type: { type: String, default: "text" },
        modelValue: { type: String, default: "" },
        placeholder: { type: String, default: "" },
        disabled: { type: Boolean, default: false },
        error: { type: Boolean, default: false },
        readonly: { type: Boolean, default: false },
        textarea: { type: Boolean, default: false },
        errorText: { type: String, default: "" },
        maxLength: { type: Number },
        prefix: { type: String, default: "" },
    },
    data() {
        return {
            isFocused: false,
            height: 108,
        };
    },
    methods: {
        updateValue($event) {
            this.$emit("update:modelValue", $event.target.value);
            this.$emit("change", this.modelValue);
        },
        focus() {
            this.isFocused = true;
            this.$emit("focus");
        },
        blur() {
            this.isFocused = false;
            this.$emit("blur");
        },
        mousedown() {
            this.focus();
        },
        getHeight() {
            this.height = this.$refs.ta.scrollHeight;
        },
    },
    mounted() {
        this.isFocused = this.initialFocusState;
    },
    computed: {
        isComplete() {
            return this.modelValue?.length > 0;
        },
        initialFocusState() {
            return this.prefix;
        },
    },
    watch: {
        modelValue() {
            this.getHeight();
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
    align-items: center;
    background: var(--color-input-bg);
    border-radius: 12px;

    .__field {
        width: 100%;
        height: 64px;
        margin-right: -36px;
        padding: 8px 18px 12px;
        background: var(--color-input-bg);
        border: none;
        border-radius: 12px;
        outline: none;
        font-size: 16px;
        line-height: 1.5;
        font-weight: 400;
        color: var(--color-main);
    }

    .__field-area {
        height: auto;
        padding: 12px 18px 18px;
        background: var(--color-textarea-bg);

        & + .done-icon {
            top: 12px;
        }
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

    .__prefix {
        color: #a6a6a6;
        padding: 28px 0 12px 18px;
        font-size: 16px;
        line-height: 1.5;
        border-radius: 12px;
    }

    .icon {
        position: absolute;
        right: 18px;
        opacity: 0;
        transition: all 0.3s;
        pointer-events: none;
    }
}

.v-input.__focused {
    .__field {
        background: transparent !important;
        padding-top: 28px;
    }

    .__prefix + .__field {
        padding-left: 0;
        margin-right: 0;
    }

    .__field-area {
        padding-top: 36px;
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
    &:hover {
        background-color: #f2f2f2;
    }
    .__field:not(.__focused) {
        padding: 28px 42px 12px 18px;

        &:hover {
            background: #f2f2f2;
        }
    }

    .__prefix + .__field:not(.__focused) {
        padding-left: 0;
        margin-right: 0;
    }

    .__field-area:not(.__focused) {
        padding: 36px 42px 18px 18px;
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
    background-color: var(--color-error-bg);

    .__field {
        background: var(--color-error-bg) !important;
        color: #808080;

        &:hover {
            color: var(--color-main);
        }
    }

    &.__complete,
    .v-input:has(.__field:autofill),
    .v-input:has(.__field:-webkit-autofill) {
        &:hover {
            background-color: var(--color-error-bg);
        }
    }

    & .__field:not(.__focused) {
        padding-top: 20px;
    }

    .error-icon {
        opacity: 1;
    }

    .done-icon {
        opacity: 0;
    }

    .placeholder {
        color: var(--color-error);
        top: -9px;
    }

    .error-text {
        font-size: 12px;
        line-height: 16px;
        position: absolute;
        bottom: 3px;
        left: 24px;
        color: var(--color-error);
    }

    .__prefix {
        padding-top: 20px;
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
