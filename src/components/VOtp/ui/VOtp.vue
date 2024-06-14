<template>
    <div class="otp">
        <div class="otp--mask" v-if="isMaskShown">
            <div class="__item" v-for="item in mask">{{ item }}</div>
        </div>
        <VInput
            :id="id"
            type="text"
            :disabled="disabled"
            :placeholder="placeholder"
            v-model="otpCode"
            :max-length="maxLength"
            :error="otpError"
            :error-text="otpErrorText"
            @focus="isFocused()"
            @blur="isBlurred()"
            ref="input"
        ></VInput>
        <p class="otp__prompt" v-if="showInfoBlock">
            <a class="otp__link" href="javascript: void(0)" @click.prevent="requestAgain"
                >Request again in 30 seconds</a
            >
            or
            <a class="otp__link" :href="supportUrl">contact support.</a>
        </p>
    </div>
</template>

<script>
import VInput from "../../VInput/ui/VInput.vue";
export default {
    name: "VOtp",
    components: { VInput },
    props: {
        id: { type: String, required: true },
        otpError: { type: Boolean, default: false },
        otpErrorText: { type: String, default: "" },
        disabled: { type: Boolean, default: false },
        placeholder: { type: String, required: true },
        requestAgain: { type: Function },
        supportUrl: { type: String, default: "javascript: void(0)" },
        showInfoBlock: { type: Boolean, default: false },
    },
    data() {
        return {
            mask: new Array(6).fill("—"),
            otpCode: "",
            maxLength: 6,
            modelValue: "",
            isMaskShown: true,
        };
    },
    watch: {
        otpCode() {
            this.mask = new Array(6).fill("—");
            const arr = Array.from(this.otpCode);
            for (let i = 0; i < arr.length; i++) {
                this.mask[i] = "";
            }
            this.$emit("update:otpCode", this.otpCode);
        },
    },
    methods: {
        isFocused() {
            this.isMaskShown = true;
        },
        isBlurred() {
            if (this.otpCode.length === 0) {
                this.isMaskShown = false;
            }
        },
        focusInput() {
            this.$refs.input.focus();
        },
    },
    mounted() {
        this.focusInput();
    },
};
</script>

<style scoped lang="scss">
.otp {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;

    &--mask {
        font-family: "SF Mono", monospace;
        position: absolute;
        top: 30px;
        left: 18px;
        z-index: 1;
        height: 2px;
        display: flex;

        .__item {
            width: 18px;
            pointer-events: none;
        }
    }

    &__prompt {
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        color: #a6a6a6;
    }

    &__link {
        color: #a6a6a6;
        transition: color 0.3s;

        &:hover {
            color: #666666;
        }

        &:focus {
            color: #999999;
        }
    }

    &:deep .__field {
        font-family: "SF Mono", monospace;
        letter-spacing: 8px;
    }
}
</style>
