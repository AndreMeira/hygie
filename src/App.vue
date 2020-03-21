<template>
  <v-app id="inspire">
    <template v-if="ready">
      <Toolbar @drawer="toggleDrawer($event)" />
      <Drawer :drawer="drawerOpen" />
      <v-content>
        <router-view></router-view>
      </v-content>
      <Footer />
    </template>
  </v-app>
</template>

<script>
import Drawer  from '@/components/Drawer.vue'
import Footer  from '@/components/Footer.vue'
import Toolbar from '@/components/Toolbar.vue'
export default {
  components: {
    Drawer,
    Toolbar,
    Footer
  },
  props: {
    source: String,
  },
  created () {
    this.$store.dispatch("load current user").then(() => {
      this.ready = true
    }).catch(() => {
      this.$router.push({ name:"Login" })
      this.ready = true
    })
  },
  data: () => ({
    ready: false,
    drawerOpen: true,
  }),
  methods: {
    toggleDrawer(v) {
      console.log(v)
      this.drawerOpen = v
    }
  }
}
</script>
