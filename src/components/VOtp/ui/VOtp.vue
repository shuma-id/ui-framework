<template>
    <div class="otp">
        <div class="otp--mask">{{ displayCode }}</div>
        <VInput
            id="OTP"
            type="text"
            :model-value="otpCode"
            :disabled="disabled"
            :placeholder="text"
            @update:modelValue="otpCode = $event"
            :make-focused="makeFocused"
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
            text: "Enter short code from sms",
            mask: [],
            otpCode: "",
            disabled: false,
            focused: true,
            makeFocused: true,
            maxLength: 6,
        };
    },
    mounted() {
        this.mask = new Array(6).fill("—");
    },
    watch: {
        otpCode() {
            if (this.otpCode.length <= 6) {
                this.mask = new Array(6).fill("—");
                const arr = Array.from(this.otpCode.trim());
                for (let i = 0; i < arr.length; i++) {
                    this.mask[i] = arr[i];
                }
            }
            if (this.otpCode.length === 6) {
                console.log("отправка кода на сервер");
            }
        },
    },
    computed: {
        displayCode() {
            return this.mask.slice(-6).join(" ");
        },
    },
};
</script>

<style scoped lang="scss">
.otp {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;

    &--mask {
        font-family: "SF Mono", monospace;
        font-size: 16px;
        line-height: 1.5;
        position: absolute;
        top: 31px;
        left: 18px;
        z-index: 10;
        height: 24px;
        width: 130px;
        background: var(--color-input-bg);
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
}
</style>
