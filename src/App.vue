<template>
  <v-app id="inspire">
    <template v-if="ready">
      <Header />
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
import Header from '@/components/Header.vue'
export default {
  components: {
    Drawer,
    Header,
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
    },
    setDrawer(e) {
      this.drawerOpen = e
    }
  }
}
</script>
