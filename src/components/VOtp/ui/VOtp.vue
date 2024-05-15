<template>
    <div class="otp">
        <div class="otp--mask" v-if="isMaskSown">
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
            @focus="isFocused()"
            @blur="isBlurred()"
        ></VInput>
        <p class="otp__prompt">
            <a class="otp__link" href="#">Request again in 30 seconds</a> or
            <a class="otp__link" href="#">contact support.</a>
        </p>
    </div>
</template>

<script>
import VInput from "../../VInput/ui/VInput.vue";
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
            isMaskSown: true,
        };
    },
    watch: {
        otpCode() {
            this.mask = new Array(6).fill("—");
            const arr = Array.from(this.otpCode);
            console.log(arr);
            for (let i = 0; i < arr.length; i++) {
                this.mask[i] = "";
            }
        },
    },
    methods: {
        isFocused() {
            this.isMaskSown = true;
        },
        isBlurred() {
            if (this.otpCode.length === 0) {
                this.isMaskSown = false;
            }
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
