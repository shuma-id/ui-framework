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
    animation-duration: 4s;
    animation-name: placeholder;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    background: #fff;
    background: linear-gradient(to right, #fff 10%, #f2f2f2 30%, #fff 40%);
    border-radius: 4px;
    box-shadow: 0px 0px 30px 0px rgba(165, 165, 165, 0.25);
}

@keyframes placeholder {
    0% {
        background-position: 0px 0;
    }
    100% {
        background-position: 1000px 0;
    }
}
</style>
