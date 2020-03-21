<template>
  <v-container class="fill-height">
  <v-row align="center" justify="center">

    <v-form v-model="valid">
        <h2>CONSTRUIRE SON PROGRAMME NUTRITIONNEL & GÉRER SON POIDS</h2>
        <h3>2/Analyse ton métabolisme</h3>

        <v-row>
          <v-col cols="12" md="12">
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row justify="center">
          <p>
            J'ai commencé a noter mes données le:
          </p>
        </v-row>
        <v-row justify="center">
          <v-date-picker
            v-model="date"
            :first-day-of-week="1"
            locale="FR-fr"
            class="mt-4"
          ></v-date-picker>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">

          </v-col>
        </v-row>
        <v-row justify="center">
            <v-btn rounded color="primary" dark
            @click="$router.push({ name: 'DailyDataForm'})">Saisir mes données quotidienne</v-btn>
        </v-row>

    </v-form>
  </v-row>
</v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  beforeRouteEnter (to, from, next) {
    if (!this.currentUser.body) {
      return next({ name:"BodyParamsForm" })
    }
  },

  computed: {
    ...mapGetters([
      "currentUser"
    ])
  }
}
</script>

<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
  })
}
</script>
<style lang="scss">

form {
  min-width: 30vw;
}
</style>
