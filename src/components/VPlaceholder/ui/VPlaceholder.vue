<template>
    <div class="placeholder"></div>
</template>

<script>
export default {
    name: "VPlaceholder",
    props: {},
};
</script>

<style scoped>
.placeholder {
    cursor: pointer;
    width: auto;
    min-height: 32px;
    animation-duration: 1s;
    animation-name: placeholder;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    background: #fff;
    border-radius: 6px;
    box-shadow: none!important;
}

@keyframes placeholder {
    0% {
        background: #fafafa;
    }
    50% {
        background: #f5f5f5;
    }
    100% {
        background: #fafafa;
    }
}
</style>
