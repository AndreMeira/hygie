<template>
  <v-container class="fill-height">
  <v-row align="center" justify="center">

    <v-form v-model="valid" ref="form">
        <h2>CONSTRUIRE SON PROGRAMME NUTRITIONNEL & GÉRER SON POIDS</h2>

        <h3>Calcule ta masse grasse</h3>
        <v-row>
          <v-col cols="12" md="12">
            <v-divider></v-divider>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="neck"
              type="text"
              :rules="[rules.required, rules.range]"
              label="tour de cou en cm"
              required></v-text-field>
          </v-col>
          <v-col cols="12" md="8" justify="end">
            <div class="explanation">
              <span>Prendre la mesure là ou le cou est le plus étroit.</span>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="waist"
              type="text"
              :rules="[rules.required, rules.range]"
              label="tour de taille en cm"
              required></v-text-field>
          </v-col>
          <v-col cols="12" md="8">
            <div class="explanation">
              <span>Prendre la mesure là ou la taille est la plus étroite.</span>
            </div>
          </v-col>
        </v-row>
        <v-row v-if="user.body.gender === 'F'">
          <v-col cols="12" md="4">
            <v-text-field
              v-model="hips"
              type="text"
              :rules="[rules.required, rules.range]"
              label="tour de hanche en cm"
              required></v-text-field>
          </v-col>
          <v-col cols="12" md="8">
            <div class="explanation">
              <span>Prendre la mesure là ou le tour de hanche est le plus large.</span>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="2">
            <v-row>
              <v-btn
              rounded color="#f14156" dark
              @click="submit">Calculer ma masse grasse</v-btn>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-divider></v-divider>
          </v-col>
        </v-row>
    </v-form>
  </v-row>
</v-container>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'
export default {


  beforeMount () {
    if (!this.$store.getters.user.body) {
      return this.$router.push({ name:"BodyParamsFormNextPage", params: { nextPage: 'BodyFatComputing' } })
    }
  },

  data() {
    return {
      valid:true,
      waist:this.$store.getters.userBodyFat.waist,
      neck:this.$store.getters.userBodyFat.neck,
      hips:this.$store.getters.userBodyFat.hips,
      rules: {
        required: value => !!value || 'Requis',
        range: value => parseInt(value) > 0 && parseInt(value) < 220 || "Valeur incorrecte"
       },
    }
  },

  methods: {
    ...mapActions({
      updateBodyFat:"save body fat params"
    }),

    submit(evt) {
      evt.preventDefault()
      this.$refs.form.validate()
      this.errors = {}

      if (!this.valid) {
        return;
      }

      const formData = this.getFormData()
      this.updateBodyFat(formData).then(() => {
        this.$router.push({name:"BodyFatInterpretation"})
      })
    },

    getFormData() {
      return {
        waist:this.waist,
        neck:this.neck,
        hips:this.hips || 0
      }
    },
  },

  computed:{
    ...mapGetters([
      "user",
      "userBodyFat"
    ])
  }
}

</script>
<style lang="scss">

form, .hygie-container {
  min-width: 30vw;
  clear:both;
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
