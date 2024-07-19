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
    animation-duration: 0.5s;
    animation-name: placeholder;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 30px 0px rgba(165, 165, 165, 0.25);
}

@keyframes placeholder {
    0% {
        background: #fff;
    }
    50% {
        background: rgba(242, 242, 242, 0.3);
    }
    100% {
        background: #fff;
    }
}
</style>
