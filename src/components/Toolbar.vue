<template>
  <v-app-bar app color="green" dark :drawer="drawer">
    <v-app-bar-nav-icon @click.stop="toggleDrawer()" />
    <v-toolbar-title>Acamédie Hygie</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
  }),
  methods: {
    toggleDrawer() {
      // alert('here')
      this.drawer = !this.drawer
      this.$emit('drawer', this.drawer)
    }
  }
}

</script>
