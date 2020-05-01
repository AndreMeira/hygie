<template>
  <v-app-bar  app color="#68B5B5" dark :drawer="drawer">
    <v-app-bar-nav-icon @click.stop="toggleDrawer()" />
    <v-toolbar-title class="hygie-font">
      <v-avatar>
      <img
        src="https://nutritionenergetique.com/wp-content/uploads/2019/08/LISA-SALIS-01.png"
        alt="Hygie Academie">
    </v-avatar>
      Acamédie Hygie
    </v-toolbar-title>
    <!-- <v-spacer></v-spacer>

    <v-btn icon label="se déconnecter">
      <v-icon>mdi-logout</v-icon>
    </v-btn> -->
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
<style lang="scss">
.hygie-font {
  font-family: "Fira Sans";
  text-transform: uppercase;
}
</style>
