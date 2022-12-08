<template>
  <v-container class="fill-height">

    <v-row align="center" justify="center">
      <v-col cols="12" md="8">
      <v-row>
        <h2>CONSTRUIRE SON PROGRAMME NUTRITIONNEL & GÉRER SON POIDS</h2>
      </v-row>
      <v-row>
        <v-col cols="12" md="9">
          <span class="data">Tour de cou:    {{userBodyFat.neck}}, </span>
          <span class="data">tour de taille: {{userBodyFat.waist}}</span>
          <span class="data" v-if="userBody.gender === 'F'">, tour de hanche: {{userBodyFat.hips}}</span>.
        </v-col>
        <v-col cols="12" md="3" class="text-right">
            <span class="data"><v-btn
            rounded color="#f14156" dark small
            @click="$router.push({ name: 'BodyFatComputing'})">Editer</v-btn> <span /> </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <h3>Interprétation du taux de masse grasse obtenue</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <span>Ta proportion de masse grasse est de: {{userBodyFat.fat_proportion.toFixed(2)}}%</span><br />
          <span>Ta proportion de masse maigre (muscle) est de: {{userBodyFat.lean.toFixed(2)}} Kilos</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <FatTable :gender="userBody.gender" :age="userBody.age"/>
      <v-row>
        <v-col cols="12" md="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-col cols="12" md="3" class="text-right">
            <span class="data"><v-btn
            rounded color="#f14156" dark small
            @click="$router.push({ name: 'Home'})">Enregistrer</v-btn> <span /> </span>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</v-container>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'
import FatTable from '@/components/tables/FatInterpretationTable'
export default {
  components: {
    FatTable
  },

  beforeMount () {
    if (!this.user.fat) {
      return this.$router.push({ name:"BodyFatComputing" })
    }
  },

  data() {
     return {
       rememberMe:true,
       showEye:false,
       rules: {
          required: value => !!value || 'Requis',
          low: v => v.length >= 2 || 'Minimum 2 characteres',
          min: v => v.length >= 8 || 'Minimum 8 characteres'
        },
     }
  },

  computed: {
    ...mapGetters([
      "user",
      "userBody",
      "userBodyFat",
    ])
  }
}

</script>
<style lang="scss">
.text-right {
  text-align: right;
}
.data {
  font-size: .8rem;
}

.hygie-container form {
  width: 100%;
}
.explanation {
  height: 100%;
  display: flex;
  align-items: center;
  font-size: .8rem;
}
</style>
