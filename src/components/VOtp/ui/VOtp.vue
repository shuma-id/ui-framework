<template>
    <VInput
        id="OTP"
        type="text"
        :model-value="otpCode || mask"
        :disabled="disabled"
        type-input="input"
        :placeholder="text"
    ></VInput>
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
            mask: "— — —   — — —",
            otpCode: "",
            disabled: false,
            focused: true,
        };
    },
    methods: {},
    directives: {
        focus: {
            mounted(el) {
                el.focus();
            },
        },
    },
};
</script>

<style scoped lang="scss"></style>
