<template>
    <div
        class="v-checkbox"
        :class="{
            __checked: modelValue,
            __light: lightTheme,
            __disabled: disabled,
        }"
        @click="$emit('update:modelValue', !modelValue)"
        :aria-disabled="disabled"
    >
        <svg
            v-if="modelValue"
            width="15"
            height="12"
            viewBox="0 0 15 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4.64268 9.30025L1.34268 6.00025L0.242676 7.10025L4.64268 11.5003L14.0712 2.07168L12.9712 0.97168L4.64268 9.30025Z"
                fill="white"
            />
        </svg>
    </div>
</template>

<script>
export default {
    name: "VCheckbox",
    props: {
        disabled: { type: Boolean, default: false },
        modelValue: { type: Boolean },
        lightTheme: { type: Boolean, default: false },
    },
};
</script>

<style scoped lang="scss">
.v-checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 22px;
    width: 22px;
    background: #f5f5f5;
    border-radius: 4.71px;
    cursor: pointer;

    &:hover {
        background: #e5e5e5;
    }

    &:active {
        background: #000;
    }
}

.__checked {
    background: #000;

    &:hover {
        background: #333;
    }
}

.__light {
    background: #f5f5f5;

    svg {
        path {
            fill: #000;
        }
    }

    &:active {
        background: #f5f5f5;
    }

    &.__checked:hover {
        background: #e5e5e5;
    }
}

.__checked.__disabled {
    background: #f5f5f5;
    pointer-events: none;

    svg {
        path {
            fill: #a6a6a6;
        }
    }
}
</style>
