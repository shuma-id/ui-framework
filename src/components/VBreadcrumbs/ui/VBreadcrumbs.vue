<template>
  <ul class="v-bread-crumbs">
    <li class="v-bread-crumbs__item" v-for="(link, i) in passiveLinks">
      <v-arrow type="passive" v-if="i !== 0"></v-arrow>
      <router-link class="v-bread-crumbs__item-link" :to="createLink(link)">
        {{link}}
      </router-link>
    </li>
    <li class="v-bread-crumbs__item">
      <v-arrow type="active"></v-arrow>
      <p class="v-bread-crumbs__item-last">{{lastActiveLink}}</p>
    </li>
  </ul>
</template>

<script>
import VArrow from "../../VArrow/ui/VArrow.vue";

export default {
  name: "VBreadCrumbs",
  components: {VArrow},
  props: {
    links: {
      type: Array,
      default() {
        return ['Titles1', 'Titles2', 'Titles3', 'Titles4']
      }
    }
  },
  methods: {
    createLink(link) {
      return `/${link}`
    },
  },
  computed: {
    passiveLinks() {
      return this.links.slice(0, -1);
    },
    lastActiveLink() {
      return this.links.at(-1);
    }
  }
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
    }
  }
}
</style>