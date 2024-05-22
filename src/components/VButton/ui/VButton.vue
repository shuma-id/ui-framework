<template>
    <button :class="['button', typeClass]" :disabled="disabled">
        <slot v-if="!progress"></slot>
        <LoadingSpinner v-if="progress" />
    </button>
</template>

<script>
import LoadingSpinner from "../../LoadingSpinner.vue";

export default {
    name: "VButton",
    components: { LoadingSpinner },
    props: {
        type: { type: String, default: "primary" },
        progress: { type: Boolean, default: false },
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
    position: relative;
    width: 100%;
    display: inline-block;
    min-height: 64px;

    border: none;
    padding: 6px 24px;
    border-radius: 12px;

    font-size: 18px;
    font-weight: 400;
    text-align: center;
    cursor: pointer;

    &--primary {
        background: var(--color-button-main, #000);
        color: var(--color-button-text, #fff);

        &:hover {
            background: var(--color-button-hover, #333);
        }

        &:active {
            background: var(--color-button-hover, #333);
        }

        &:disabled,
        &.disabled {
            background: var(--color-button-disabled, #f7f7f7);
            color: var(--color-button-text-disabled, #c4c4c4);
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
