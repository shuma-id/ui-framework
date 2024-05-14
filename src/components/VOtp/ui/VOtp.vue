<template>
    <div class="otp">
        <div class="otp--mask">
            <div class="__item" v-for="item in mask">{{ item }}</div>
        </div>
        <VInput
            id="OTP"
            type="text"
            :model-value="otpCode"
            :disabled="disabled"
            :placeholder="text"
            @update:modelValue="otpCode = $event"
            :make-focused="makeFocused"
            :max-length="maxLength"
            :error="otpError"
            :error-text="otpErrorText"
        ></VInput>
        <p class="otp__prompt">
            <a class="otp__link" href="#">Request again in 30 seconds</a> or
            <a class="otp__link" href="#">contact support.</a>
        </p>
    </div>
</template>

<script>
import VInput from "../../VInput/ui/VInput.vue";
import { PATTERNS } from "../../../utils/constants.js";
export default {
    name: "VOtp",
    components: { VInput },
    props: {},
    data() {
        return {
            text: "Enter short code from Email",
            mask: new Array(6).fill("—"),
            otpCode: "",
            disabled: false,
            focused: true,
            makeFocused: true,
            maxLength: 6,
            modelValue: "",
            otpError: false,
            otpErrorText: "",
        };
    },
    watch: {
        otpCode() {
            this.otpError = false;
            this.otpErrorText = "";
            this.mask = new Array(6).fill("—");
            const arr = Array.from(this.otpCode);
            for (let i = 0; i < arr.length; i++) {
                this.mask[i] = "";
            }

            if (this.otpCode.length === this.maxLength) {
                if (this.isCodeValid) {
                    this.otpError = false;
                    this.otpErrorText = "";
                } else {
                    this.otpError = true;
                    this.otpErrorText = "Short code can only contain numbers";
                }
            }
        },
    },
    computed: {
        isCodeValid() {
            return PATTERNS.CODE.test(this.otpCode);
        },
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
        top: 29px;
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
