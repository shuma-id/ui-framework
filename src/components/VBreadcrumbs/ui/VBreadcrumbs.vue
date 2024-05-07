<template>
  <ul v-for="link in links">
    <li>
      <a :href="link">{{link}}</a>
    </li>
    <li>{{lastLnk}}</li>
  </ul>
</template>

<script>
export default {
  name: "VBreadcrumbs",
  props: {
    links: {
      default: ['']
    }
  },
  data() {
    return {
      lastLink: ''
    }
  }
}
</script>

