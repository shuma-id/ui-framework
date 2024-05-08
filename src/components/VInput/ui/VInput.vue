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
        />
        <label for="VInput" class="placeholder">{{ placeholder }}</label>
        <img class="error-icon" src="./icon-errors.svg" alt="Error icon image" />
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
    },
    computed: {
        isComplete() {
            return this.modelValue.trim().length > 0;
        },
    },
};
</script>

<style scoped lang="scss">
.v-input {
    width: 100%;
    position: relative;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    input {
        width: 100%;
        height: 64px;
        margin-right: -36px;

        box-sizing: border-box;
        padding: 20px 49px 20px 18px;
        background: #f7f7f7;
        border: 1px solid transparent;
        border-radius: 12px;
        outline: none;

        font-size: 16px;
        font-weight: 400;
        color: #000;
        transition: background-color 0.3s,
        border-color 0.3s;
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
        left: 0;
        opacity: 0;
        transition: 0.3s;
        pointer-events: none;
    }
}

.v-input:hover {
    input {
        color: #000;
        background: #f7f7f7;
    }
}

.__focused.v-input {
    input {
        background: transparent !important;
        border: 1px solid var(--main-color);
        padding: 20px 49px 12px 18px;
    }

    .placeholder {
        transform: translate3D(0, 14px, 0);
        font-size: 12px;
        color: #a6a6a6;
    }
}

.v-input.__complete,
.v-input:has(input:autofill),
.v-input:has(input:-webkit-autofill) {
    input:not(.__focused) {
        padding: 20px 49px 12px 18px;

        &:hover {
            background: #f2f2f2;
        }
    }

    .placeholder {
        transform: translate3D(0, 14px, 0);
        font-size: 12px;
        color: #a6a6a6;
    }
}

.__with-error.v-input {
    input {
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
    input {
        color: #808080;
    }

    .placeholder {
        color: #a6a6a6;
    }
}
</style>
