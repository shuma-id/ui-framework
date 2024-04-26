<template>
    <div>{{ name }}</div>
</template>

<script>
export default {
    name: "ComponentDemo",
    props: {
        name: { type: String, default: "" },
    },
};
</script>

<style scoped lang="scss"></style>
