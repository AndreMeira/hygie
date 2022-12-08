<template>
  <v-container fluid>
    <v-row>
      <div class="divider" />
    </v-row>
    
    <v-row justify="center" v-if="$store.getters.user">
      <v-col cols="12" md="3" sm="12">
          <v-card max-width="500" class="mx-auto">
            <v-img
              max-width="500"
              :src="require('@/assets/body-params.jpg')"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title>Tes données corporelles</v-card-title>
            </v-img>

            <v-card-actions>
              <v-btn text color="#f14156" @click="$router.push({ name: 'Account'})">
                Saisir tes données corporelles
              </v-btn>
              <v-spacer></v-spacer>
              

            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="3" sm="12" v-if="this.currentUser.body">

          <v-card max-width="500" class="mx-auto">
            <v-img
              max-width="500"
              :src="require('@/assets/daily-data.jpg')"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title>Apports quotidiens</v-card-title>
            </v-img>

            <v-card-actions>
              <v-btn text color="#f14156" @click="$router.push({ name: 'DailyDataForm'})">
                Saisie tes apports quotidiens
              </v-btn>
              <v-spacer></v-spacer>
             
            </v-card-actions>
          </v-card>
      </v-col>

      <v-col cols="12" md="3" sm="12" v-if="this.currentUser.body">

          <v-card max-width="500" class="mx-auto">
            <v-img
              max-width="500"
              :src="require('@/assets/nutrition-plan.jpg')"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title>Tes plans nutritionnels</v-card-title>
            </v-img>

            <v-card-actions>
              <v-btn text color="#f14156" @click="$router.push({ name: 'NutritionPlan'})">
                Tes plans nutritionnels
              </v-btn>
              <v-spacer></v-spacer>
             
            </v-card-actions>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',

  computed: {
    ...mapGetters([
      "currentUser"
    ])
  }
  
}
</script>
<style lang="scss">
.panel {
  padding: 1rem;
}

.divider {
  padding-bottom: 5rem;
}
</style>
