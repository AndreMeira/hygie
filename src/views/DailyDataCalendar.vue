<template>
  <v-container class="fill-height">
  <v-row align="center" justify="center">

    <v-form>
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
          @click="submit">Saisir mes données quotidiennes</v-btn>
        </v-row>

    </v-form>
  </v-row>
</v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  beforeMount () {
    if (!this.currentUser.body) {
      return this.$router.push({ name:"BodyParamsForm" })
    }
  },

  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
    }
  },

  methods: {
    ...mapActions({
      createDailyDatas:"create daily datas"
    }),
    submit(evt) {
      console.log(evt, this.date)
      evt.preventDefault()
      this.createDailyDatas({date:this.date}).then(d => {
        this.$router.push({name:"DailyDataForm"})
      })
    }
  },

  computed: {
    ...mapGetters([
      "currentUser"
    ])
  }
}
</script>
<style lang="scss">

form {
  min-width: 30vw;
}
</style>
