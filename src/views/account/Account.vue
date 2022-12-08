<template>
  <v-container>

    <v-card
      class="overflow-hidden">
      <v-toolbar flat>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

          <v-spacer></v-spacer>
        </v-toolbar>

      <v-row :class="{open:drawer}">
        <v-col>
          <component :is="currentView" :user="currentUser" v-on:saved="notice"/>
        </v-col>
      </v-row>
      <v-navigation-drawer
        v-model="drawer"
        :color="color"
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        :right="right"
        :src="bg"
        absolute
      >
        <v-list
          dense
          nav
          class="py-0">
          <v-list-item two-line :class="miniVariant && 'px-0'">
            <v-list-item-avatar>
              <v-avatar BodyParams size="2rem">
                <v-icon size="1.8rem" dark>mdi-account-circle</v-icon>
              </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Ton compte</v-list-item-title>
              <v-list-item-subtitle>{{currentUser.firstname}} {{currentUser.lastname}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item link @click="currentView = 'BodyParams'">
            <v-list-item-icon>
              <v-icon>mdi-scale</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Poids et taille</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link @click="currentView = 'FatComputing'">
            <v-list-item-icon>
              <v-icon>mdi-human-handsdown</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Masse grasse</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      :bottom="false"
      color="green"
      :multi-line="false"
      :timeout="1500"
      :top="true"
    >
    {{ text }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        fermer
      </v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Account      from '@/components/forms/Account'
import BodyParams   from '@/components/forms/BodyParams'
import FatComputing from '@/components/forms/FatComputing'

export default {
  components: {
    Account,
    BodyParams,
    FatComputing,
  },

  data() {
     return {
       text:false,
       isOpen:true,
       snackbar:false,
       drawer:true,
       currentView:"BodyParams"
     }
  },

  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },

  methods: {
    ...mapActions({
      register:"register user"
    }),

    notice(evt) {
      this.snackbar = true
      this.text = evt.text
    },

    registerUser(formData) {
      this.register(formData).then(data => {
          this.signIn(formData)
        }).catch((data) => {
          console.log(data)
          this.errors = data.errors
        })
    },

    signIn(formData) {
      this.$store.dispatch("authenticate user", {
        password: formData.password,
        username: formData.email
      }).then(() => {
        this.$router.push('/')
      })
    },

    submit(evt) {
      evt.preventDefault();
      this.$refs.form.validate();
      this.errors = {}

      if (!this.valid) {
        return;
      }

      const formData = this.getFormData()
      this.registerUser(formData)
    }
  }
}

</script>
<style lang="scss">
.full-width {
  margin-top:3rem;
  width: 80%;
}
.open {
  margin-left: 256px;
}
form {
  padding: 2rem;
}
</style>
