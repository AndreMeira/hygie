<template>
  <v-navigation-drawer v-model="drawer" app dark>
    <v-list dense>

      <v-list-item link
      @click="$router.push({ name: 'Account'})">
        <v-list-item-action>
          <v-icon>mdi-account-box</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Mon espace</v-list-item-title>
        </v-list-item-content>
      </v-list-item>


      <v-list-item link
      @click="$router.push({ name: 'DailyDataForm'})">
        <v-list-item-action>
          <v-icon>mdi-calendar-month</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Suivi quotidien</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link
      @click="$router.push({ name: 'BodyFatInterpretation'})">
        <v-list-item-action>
          <v-icon>mdi-calculator</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Calcul masse grasse</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link
      @click="$router.push({ name: 'NutritionPlan'})">
        <v-list-item-action>
          <v-icon>mdi-nutrition</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Plan nutritionnel</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-finance</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Evolution</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <v-list-item v-if="this.$store.getters.user.body" link @click="logout">
        <v-list-item-action>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Se deconnecter</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-account-question</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Aide</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer:Boolean
  },
  model: {
    prop: 'checked',
    event: 'change'
  },

  methods: {
    logout() {
      this.$store.dispatch("logout user").then(() => {
        this.$router.push({ name: 'Home'})
        console.log("in logout success")
      }).catch(e => {
        this.$router.push({ name: 'Home'})
        console.log("in logout failed")
      })
    }
  }
}

</script>
