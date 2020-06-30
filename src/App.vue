<template>
  <v-app id="inspire">
    <template v-if="ready">
      <Toolbar @drawer="toggleDrawer($event)" />
      <Drawer :drawer="drawerOpen" @change="setDrawer"/>
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
  data: () => ({
    ready: false,
    drawerOpen: null,
    checked:null,
  }),
  created () {
    this.$store.dispatch("load current user").then(() => {
      this.ready = true
    }).catch(() => {
      this.$router.push({ name:"Login" })
      this.ready = true
    })
  },
  methods: {
    toggleDrawer(v) {
      this.drawerOpen = !this.drawerOpen
      console.log(">>>>>>>>>>< toggleDrawer", this.drawerOpen)
    },
    setDrawer(e) {
      console.log(">>>>>>>>>>< setDrawer", e),
      this.drawerOpen = e
    }
  }
}
</script>
