<template>
    <button :class="['button', typeClass]" :disabled="disabled">{{ label }}</button>
</template>

<script>
export default {
    name: "VButton",
    props: {
        label: { type: String, required: true },
        type: { type: String, default: "primary" },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        typeClass() {
            return `button--${this.type}`;
        },
    },
};
</script>

<style scoped lang="scss">
.button {
    display: inline-block;
    min-height: 46px;

    border: none;
    padding: 6px 24px;
    border-radius: 12px;

    font-size: 18px;
    font-weight: 400;
    text-align: center;
    cursor: pointer;

    &--primary {
        background: var(--color-main);
        color: #fff;

        &:hover {
            background: var(--color-main-hover);
        }
        &:active {
            background: var(--color-main-hover);
        }
        &:disabled,
        &.disabled {
            background: #f7f7f7;
            color: #c4c4c4;
        }
    }

    &--secondary {
        background: #f7f7f7;
        color: #000;

        &:hover {
            background: #ebe9e8;
        }
        &:active {
            background: #e6e5e4;
        }
        &:disabled,
        &.disabled {
            background: #f7f7f7;
            color: #cacaca;
        }
    }

    &--danger {
        background: #ff3355;
        color: #fff;

        &:hover {
            background: #ff1a40;
        }
        &:active {
            background: #ff002b;
        }
        &:disabled,
        &.disabled {
            background: #f7f7f7;
            color: #cacaca;
        }
    }

    &--borderless {
        background: inherit;
        color: #000;

        &:hover {
            background: none;
            color: #000;
            text-decoration: underline;
        }
        &:active {
            background: none;
            color: #545454;
            text-decoration: underline;
        }
        &:disabled,
        &.disabled {
            background: none;
            color: #cacaca;
        }
    }
}
</style>
