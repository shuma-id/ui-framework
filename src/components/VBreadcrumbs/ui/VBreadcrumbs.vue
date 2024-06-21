<template>
    <div class="v-breadcrumbs">
        <div class="__item" v-for="(link, i) in links">
            <VArrow
                :type="link.to ? 'passive' : 'active'"
                direction="right"
                v-if="i !== 0"
            ></VArrow>
            <RouterLink :to="link.to" v-if="link.to" class="__link">
                {{ link.label }}
            </RouterLink>
            <span class="__item-text" v-else>{{ link.label }}</span>
        </div>
    </div>
</template>

<script>
import VArrow from "../../VArrow/ui/VArrow.vue";

export default {
    name: "VBreadсrumbs",
    components: { VArrow },
    props: {
        links: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped lang="scss">
.v-breadcrumbs {
    color: var(--color-main-gray);
    display: flex;
    gap: 4px;

    .__item {
        display: flex;
        gap: 4px;
        align-items: center;
        font-size: 28px;
        font-weight: 600;

        &-text {
            margin-right: 0;
            color: var(--color-main-text);

            &:hover {
                color: var(--color-main-hover);
            }
        }

        .__link {
            text-decoration: none;
            color: var(--color-main-gray);

            &:hover {
                color: var(--color-main-hover);
            }
        }
    }
}
</style>
