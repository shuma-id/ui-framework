<template>
    <label
        class="checkbox"
        :class="{
            __light: selectedLightTheme,
        }"
    >
        <input
            type="checkbox"
            :id="id"
            :value="modelValue"
            :disabled="disabled"
            @input="updateValue"
            :checked="modelValue"
        />
        <span class="__label">
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
        </span>
    </label>
</template>

<script>
export default {
    name: "VCheckbox",
    props: {
        id: { type: String, required: true },
        disabled: { type: Boolean, default: false },
        modelValue: { type: Boolean },
        selectedLightTheme: { type: Boolean, default: false },
    },
    data() {
        return {
            checked: false,
        };
    },
    methods: {
        updateValue($event) {
            this.$emit("update:modelValue", $event.target.checked);
        },
    },
};
</script>

<style scoped lang="scss">
.checkbox {
    display: flex;

    .__label {
        height: 22px;
        width: 22px;
        background: #f5f5f5;
        border-radius: 4.71px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &:hover {
            background: #e5e5e5;
        }

        &:active {
            background: #000;
        }
    }

    input[type="checkbox"] {
        visibility: hidden;
        display: none;
        opacity: 0;

        &:disabled + .__label {
            background: #f5f5f5;

            svg {
                path {
                    fill: #a6a6a6;
                }
            }
        }

        &:checked:disabled + .__label {
            background: #f5f5f5;

            svg {
                path {
                    fill: #a6a6a6;
                }
            }
        }

        &:checked + .__label {
            background: #000;
        }
    }
}

.__light {
    input[type="checkbox"]:checked + .__label {
        background: #f5f5f5;

        svg {
            path {
                fill: #000;
            }
        }
    }
}
</style>
