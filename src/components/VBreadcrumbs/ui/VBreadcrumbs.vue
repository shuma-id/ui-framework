<template>
  <div class="v-bread-crumbs">
    <span class="v-bread-crumbs__item" v-for="(link, i) in links">
      <VArrow type="passive" direction="right" v-if="link.to && i !== 0"></VArrow>
      <VArrow type="active" direction="right" v-if="!link.to && i !== 0"></VArrow>
      <RouterLink class="v-bread-crumbs__item-link" :to="link.to" v-if="link.to">
        {{link.label}}
      </RouterLink>
      <span class="v-bread-crumbs__item-last" v-else>{{link.label}}</span>
    </span>
  </div>
</template>

<script>
import VArrow from "../../VArrow/ui/VArrow.vue";

export default {
  name: 'VBreadCrumbs',
  components: {VArrow},
  props: {
    links: {
      type: Array,
      required: true,
    }
  },
}
</script>

<style scoped lang="scss">
.v-bread-crumbs {
  color: var(--color-main-grey);
  list-style: none;
  display: flex;
  gap: 4px;

  &__item {
    display: flex;
    gap: 4px;
    align-items: center;

    &:hover {
      color: var(--color-main-hover);
    }

    &:last-of-type {
      margin-right: 0;
    }

    &-link, .v-bread-crumbs__item-last {
      font-size: 28px;
      line-height: 1.5;
      font-weight: 600;
    }

    .v-bread-crumbs__item-last {
      color: var(--color-main-text);

      &:hover {
        color: var(--color-main-hover);
      }
    }
  }
}
</style>