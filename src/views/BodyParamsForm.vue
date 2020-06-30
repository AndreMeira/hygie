<template>
  <v-container class="fill-height">
  <v-row align="center" justify="center">

    <v-form v-model="valid" ref="form">
        <h2>CONSTRUIRE SON PROGRAMME NUTRITIONNEL & GÉRER SON POIDS</h2>

        <h3>Entre tes données</h3>
        <v-row>
          <v-col cols="12" md="12">
            <v-divider></v-divider>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="weight"
              type="text"
              :rules="[rules.required, rules.weight]"
              label="ton poids actuel en kg"
              filled
              required></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="height"
              type="text"
              :rules="[rules.height, rules.required]"
              label="ta taille en cm"
              filled
              required></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="year"
              type="text"
              :rules="[rules.required, rules.year]"
              label="ton année de naissance (ex: 1983)"
              filled
              required></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="gender"
              :items="[{ text: 'Femme', value: 'F' }, { text: 'Homme', value: 'M' }]"
              item-text="text"
              item-value="value"
              filled
              label="Sexe"
              required
            ></v-select>
          </v-col>
        </v-row>

        <v-row v-if="!nextPage" justify="center">
            <v-btn rounded color="primary" dark
            @click="submit">Enregistrer</v-btn>
        </v-row>
        <v-row v-else justify="center">
            <v-btn rounded color="primary" dark
            @click="submit">Suivant</v-btn>
        </v-row>


    </v-form>
  </v-row>
</v-container>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  beforeMount () {
    this.nextPage = this.$route.params.nextPage
    console.log(">>>>><", this.nextPage)
  },

  data() {

     return {
       valid:true,
       year:this.$store.getters.userBody.year_of_birth,
       height:this.$store.getters.userBody.height,
       weight:this.$store.getters.userBody.weight,
       gender:this.$store.getters.userBody.gender,
       rules: {
          required: value => !!value || 'Requis',
          height: value => parseInt(value) > 120 && parseInt(value) < 210 || "Cette taille semble incorrecte",
          weight: value => parseInt(value) > 30 && parseInt(value) < 210 || "Ce poids semble incorrect",
          year: value => parseInt(value) > 1900 && parseInt(value) < 2010 || "Valeur incorrecte"
        },
     }
  },

  methods: {
    ...mapActions({
      saveBodyParams:"save body params"
    }),
    submit(evt) {
      evt.preventDefault();
      this.$refs.form.validate();
      this.errors = {}

      if (!this.valid) {
        return;
      }

      const formData = this.getFormData()
      this.saveBodyParams(formData).then(() => {
        this.$router.push({ name:this.nextPage})
      })
    },

    getFormData() {
      return {
        year_of_birth:this.year,
        height:this.height,
        weight:this.weight,
        gender:this.gender
      }
    },

  },

  computed: {
    ...mapGetters([
      "userBody"
    ])
  }
}

</script>
<style lang="scss">

form {
  min-width: 30vw;
}
</style>
