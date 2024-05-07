<template>
  <ul v-for="link in links">
    <li>
      <a :href="link">{{link}}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "VBreadcrumbs",
  props: {
    links: {
      default: ['']
    }
  }
}
</script>

