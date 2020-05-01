<template>
  <v-container class="fill-height">
  <v-row align="center" justify="center" v-if="datas && datas.days">

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
              v-model="open"
              :close-on-content-click="false"
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
                  <th class="text-left">Poids ce jour</th>
                  <th class="text-left">Calories/Jour</th>
                  <th class="text-left">Protéines (en g)</th>
                  <th class="text-left">Glucides (en g)</th>
                  <th class="text-left">Lipides (en g)</th>
                  <th class="text-left"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="d in datas.days">
                  <td><b>Jour {{d.day_number}}</b></td>
                  <td>{{d.weight || "-"}}</td>
                  <td>{{d.calories || "-"}}</td>
                  <td>{{d.proteins || "-"}}</td>
                  <td>{{d.carbs || "-"}}</td>
                  <td>{{d.fat || "-"}}</td>
                  <td>
                    <v-btn class="my-edit" depressed small color="primary"
                    @click="openDialog(d.day_number)">
                      <v-icon>mdi-circle-edit-outline</v-icon>
                    </v-btn>
                  </td>
                </tr>
                <tr class="sum-up">
                  <td><b>Moyenne</b></td>
                  <td>{{datas.average.weight || "-"}}</td>
                  <td>{{datas.average.calories || "-"}}</td>
                  <td>{{datas.average.proteins || "-"}}</td>
                  <td>{{datas.average.carbs || "-"}}</td>
                  <td>{{datas.average.fat || "-"}}</td>
                  <td></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-row>

        <v-row justify="">
          <v-col cols="6" md="9">
            <v-row justify="">
              <v-btn rounded color="#1285b7" dark
              @click="$router.push({ name: 'DailyDataCalendar'})">Saisir une nouvelle semaine</v-btn> <span />
            </v-row>
          </v-col>
          <v-col cols="6" md="3">
            <v-row justify="end">
              <v-btn rounded color="#1285b7" dark
              @click="$router.push({ name: 'CustomPlan'})">Suivant</v-btn>
            </v-row>
          </v-col>
        </v-row>

    </v-form>
    <v-dialog
      v-model="dialog"
      max-width="500">
      <v-card>
        <v-card-title class="headline">Entre les donnes du jour {{currentDayData.day_number}}</v-card-title>

        <v-form v-model="valid" ref="form">
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="weight"
                type="text"
                :rules="[rules.required, rules.range]"
                label="Ton poids ce jour là"
                filled
                required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="calories"
                type="text"
                :rules="[rules.required, rules.range]"
                label="tes calories totales"
                filled
                required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="carbs"
                type="text"
                :rules="[rules.required, rules.range]"
                label="tes glucides"
                filled
                required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="proteins"
                type="text"
                :rules="[rules.required, rules.range]"
                label="tes proteines"
                filled
                required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="fat"
                type="text"
                :rules="[rules.required, rules.range]"
                label="tes lipides"
                filled
                required></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
              <v-btn rounded color="primary" dark
              @click="saveDayData">Enregistrer</v-btn>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</v-container>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    dialog:false,
    open:false,
    date:null,
    datas: null,
    currentDay:null,
    weight:null,
    calories:null,
    carbs:null,
    proteins:null,
    fat:null,
    rules: {
       required: value => !!value || 'Requis',
       range: value => parseInt(value) > 0 && parseInt(value) < 8000 || "Valeur incorrecte"
     },
  }),

  beforeMount () {
    if (!this.currentUser.body) {
      return this.$router.push({ name:"BodyParamsForm" })
    }

    this.loadDailyDatas().then((data) => {
      this.datas = data
      this.date = data.start
    }).catch(e => {
      return this.$router.push({ name:"DailyDataCalendar" })
    })
  },

  methods: {
    ...mapActions({
      loadDailyDatas:"load daily datas",
      updateDailyDatas:"update daily datas"
    }),
    openDialog(day) {
      this.currentDay = day
      this.setCurrentDatasToDialog()
      this.dialog = true
    },
    getDay(dayNumber) {
      return this.datas
        ? this.datas.days.find(e => e.day_number == dayNumber)
        : {}

    },
    setCurrentDatasToDialog() {
      const day = this.currentDayData
      this.calories = day.calories
      this.carbs = day.carbs
      this.proteins = day.proteins
      this.fat = day.fat
      this.weight = day.weight
    },
    saveDayData() {
      const datas = {
        id:this.datas.id,
        day:this.currentDay,
        calories:this.calories,
        proteins:this.proteins,
        fat:this.fat,
        carbs:this.carbs,
        weight:this.weight
      }
      this.updateDailyDatas(datas).then(data => {
        this.datas = data
        this.dialog = false
      })
    }
  },

  computed: {
    ...mapGetters([
      "currentUser",
      "dailyDatas"
    ]),

    currentDayData() {
      return this.getDay(this.currentDay) || {}
    }
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
  background-color: transparentize(#c4d000, 0.5);
  font-weight: bold;
}

.my-edit {
  visibility: hidden;
}

tr:hover .my-edit {
  visibility: visible;
}
</style>
