<template>
  <v-container fill-height>
    <v-row>
      <v-col col="12">
        <v-row align="center" justify="center" class="margin">
          <span class="data"><v-btn
                  rounded color="primary" dark 
                  @click="$router.push({ name: 'Account'})">Tes données corporelles</v-btn> </span>
        </v-row>
        
        <v-row align="center" justify="center" class="margin">
          <span class="data"><v-btn
                  rounded color="primary" dark 
                  @click="$router.push({ name: 'BodyFatComputing'})">Calcule ta masse grasse</v-btn> </span>
        </v-row>
        <v-row align="center" justify="center" class="margin">
          <span class="data"><v-btn
                  rounded color="primary" dark 
                  @click="$router.push({ name: 'DailyDataForm'})">Saisies tes données quotidiennes</v-btn> </span>
        </v-row>
          <v-row align="center" justify="center" class="margin">
          <span class="data"><v-btn
                  rounded color="primary" dark 
                  @click="$router.push({ name: 'NutritionPlan'})">Ton plan nutritionnel</v-btn> </span>
        </v-row>
      </v-col>
    </v-row>
  
</v-container>
</template>


<script>
import { mapActions } from 'vuex'

export default {
  data() {
     return {
       
     }
  },
  methods: {
    
  }
}

</script>
<style lang="scss" scoped>
.margin {
  margin: 2rem 0;
}
</style>
