<template>
    <div class="demo-slot">
        {{ name }}
    </div>
</template>

<script>
export default {
    name: "ComponentDemo",
    props: {
        name: String,
    },
};
</script>

<style scoped lang="scss">
.demo-slot {
    background: red;
}
</style>
