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
        <v-row justify="end">
          <v-col cols="12" sm="3">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Date de début"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                no-title
                scrollable
                locale="FR-fr"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Jour</th>
                  <th class="text-left">Calories/Jour</th>
                  <th class="text-left">Protéines (en g)</th>
                  <th class="text-left">Glucides (en g)</th>
                  <th class="text-left">Lipides (en g)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="d in ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']" :key="d">
                  <td><b>{{d}}</b></td>
                  <td>23</td>
                  <td>233</td>
                  <td>432</td>
                  <td>432</td>
                </tr>
                <tr class="sum-up">
                  <td><b>Moyenne</b></td>
                  <td>23</td>
                  <td>233</td>
                  <td>432</td>
                  <td>432</td>
                </tr>
                <tr class="sum-up-kil">
                  <td><b>Moyenne / kg</b></td>
                  <td>23</td>
                  <td>233</td>
                  <td>432</td>
                  <td>432</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-row>

        <v-row justify="">
          <v-col cols="6" md="9">
            <v-row justify="">
              <v-btn rounded color="primary" dark
              @click="$router.push({ name: 'DailyDataCalendar'})">Saisir une nouvelle semaine</v-btn> <span />
            </v-row>
          </v-col>
          <v-col cols="6" md="3">
            <v-row justify="end">
              <v-btn rounded color="primary" dark
              @click="$router.push({ name: 'BodyFatComputing'})">Suivant</v-btn>
            </v-row>
          </v-col>
        </v-row>

    </v-form>
  </v-row>
</v-container>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
  }),

  beforeMount () {
    if (!this.currentUser.body) {
      return this.$router.push({ name:"BodyParamsForm" })
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
.v-data-table {
  width: 100%;
}
.sum-up {
  background-color: #c0e8c0;
}
</style>
