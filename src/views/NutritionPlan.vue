<template>
<v-container class="fill-height nutrition-plan">
  <div class="text-center">
  <v-dialog 
      v-model="loading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Chargement en cours
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
  <v-row align="center" justify="center">
    <v-col col="12" md="10">
      <v-row>
        <v-col cols="12" md="12">
          <h2 class="hygie-font">Ton programme nutritionnel personnalisé</h2>
        </v-col>
      </v-row>
      
      

      <v-row v-if="datas">
        <v-col cols="12" md="12">
          <h3>Résumé de tes calories journalières</h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12">
        <v-simple-table v-if="datas">
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
          </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <h3>Evalue tes dépenses énergétiques journalières (DEJ)</h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12">
          <CalTable title="Dépenses énergétiques journalières" @ready="dataReady"/>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-col cols="12" sm="3">
          <v-text-field
          label="Entre tes calories ici"
          placeholder="2000"
          v-model="caloriesButton"
          ><template v-slot:append-outer>
          <v-slide-x-reverse-transition
            mode="out-in"
          >
            <v-icon
              :key="`icon-${isEditing}`"
              :color="isEditing ? 'success' : 'info'"
              @click="save"
              v-text="isEditing ? 'mdi-check-outline' : 'mdi-cached'"
            ></v-icon>
          </v-slide-x-reverse-transition>
        </template>
        </v-text-field></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row v-if="true">
        <v-col col="12" md="12">
          <v-row>
            <v-col cols="12" md="12">
              <h2>Nutrition-santé personnalisé</h2>
            </v-col>
          </v-row>
          <v-row v-if="calories > 800">
            <v-col cols="12" md="12" >
                  <BaseTable
                    title="Calories et macros recommandés pour un poids stable"
                    :distribution="[15, 35, 50]"
                    :calories="calories * 1.0"
                    :weight="weight"/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row v-if="calories > 800">
        <v-col cols="12" md="12">
          <h2 class="hygie-font">Choisis ton plan nutritionnel</h2>
        </v-col>
      </v-row>

      <v-row v-if="calories > 800">

        <v-col cols="12" md="12">
              <h3>Metabolisme OK</h3>
              <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>Perte de graisse</v-expansion-panel-header>
              
                <v-expansion-panel-content>
                  <BaseTable
                    title="Perte de graisse"
                    :distribution="[25, 35, 40]"
                    :calories="calories * 0.85"
                    :weight="weight"
                    color="#c4d000"/>
                  </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Maintien de poids / recomposition corporelle</v-expansion-panel-header>
                <v-expansion-panel-content>
                <BaseTable
                  title="Maintien de poids / recomposition corporelle"
                  :distribution="[22, 33, 45]"
                  :calories="parseFloat(calories)"
                  :weight="weight"
                  color="#e2f000"/>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Prise de masse avec 10% de surplus</v-expansion-panel-header>
                <v-expansion-panel-content>
                <BaseTable
                  title="Prise de masse avec 10% de surplus"
                  :distribution="[22, 35, 43]"
                  :calories="calories * 1.10"
                  :weight="weight"
                  color="#e7857e" />
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Prise de masse avec 15% de surplus</v-expansion-panel-header>
                <v-expansion-panel-content>
                <BaseTable
                  title="Prise de masse avec 15% de surplus"
                  :distribution="[20, 35, 45]"
                  :calories="calories * 1.15"
                  :weight="weight"
                  color="#e7857e" />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
        </v-col>
        <v-row>
        <v-col cols="12" md="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>

        <v-col cols="12" md="12">
              <h3>Metabolisme Ralenti</h3>
              <v-expansion-panels>
                <v-expansion-panel>
                <v-expansion-panel-header>Relancer le métabolisme durant les 2 premières semaines (1&nbsp;et&nbsp;2)</v-expansion-panel-header>
                <v-expansion-panel-content>
              <BaseTable
                title="Relancer le métabolisme durant les 2 premières semaines (1&nbsp;et&nbsp;2)"
                :distribution="[22, 36, 42]"
                :calories="calories * 0.90 * 0.95"
                :weight="weight"
                color="#00a7ac"/>
              </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Calories et macros recommandés les 2 semaines suivantes (3&nbsp;et&nbsp;4)</v-expansion-panel-header>
                <v-expansion-panel-content>
              <BaseTable
                title="Calories et macros recommandés les 2 semaines suivantes (3&nbsp;et&nbsp;4)"
                :distribution="[22, 36, 42]"
                :calories="calories * 0.90"
                :weight="weight"
                color="#00a7ac"/>
                 </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Calories et macros recommandés les 2 semaines suivantes (5&nbsp;et&nbsp;6)</v-expansion-panel-header>
                <v-expansion-panel-content>
              <BaseTable
                title="Calories et macros recommandés les 2 semaines suivantes (5&nbsp;et&nbsp;6)"
                :distribution="[23, 33, 44]"
                :calories="parseFloat(calories)"
                :weight="weight"
                color="#c4d000"/>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
          <v-row>
        <v-col cols="12" md="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>

        <v-col cols="12" md="12" v-if="false">
              <h3>Macros recommandés en milieu sportif pour une <span>perte de graisse</span></h3>
              <v-expansion-panels>
                <v-expansion-panel>
                <v-expansion-panel-header>Perte de graisse</v-expansion-panel-header>
                <v-expansion-panel-content>
              <BaseTable
                :distribution="[30, 35, 35]"
                :calories="calories * 0.85"
                :weight="weight"
                title="Perte de graisse"
                color="#c4d000"/>
              </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
        </v-col>
        <v-row>
          <v-col cols="12" md="12">
            <v-divider></v-divider>
          </v-col>
        </v-row>

        <v-col cols="12" md="12" v-if="false">
              <h3>Macros recommandés en milieu sportif pour une <span>prise de masse</span><span> sport ++</span></h3>
              <v-expansion-panels>
                <v-expansion-panel>
                <v-expansion-panel-header>Prise de masse (musculaire)</v-expansion-panel-header>
                <v-expansion-panel-content>
              <BaseTable
                :distribution="[25, 40, 35]"
                :calories="calories * 1.10"
                :weight="weight"
                title="Prise de masse (musculaire)"
                color="#e7857e"/>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-snackbar
    v-model="snackbar"
    :bottom="false"
    color="green"
    :multi-line="false"
    :timeout="1500"
    :top="true"
  >
  {{ text }}
    <v-btn
      dark
      text
      @click="snackbar = false">
      fermer
    </v-btn>
  </v-snackbar>
</v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseTable from "@/components/tables/BaseProportionTable.vue"
import CalTable from "@/components/tables/CaloriesRecommandation.vue"
export default {
  components: {
    BaseTable,
    CalTable
  },

  beforeMount () {
    if (!this.$store.getters.user.body) {
      return this.$router.push({ name:"BodyParamsFormNextPage", params: { nextPage: 'NutritionPlan' } })
    }

    this.loadDailyDatas().then((data) => {
      this.datas = data
    }).catch(e => {})
  },
  data() {
     return {
       datas:null,
       text:null,
       loading:true,
       snackbar:false,
       isEditing:false,
       caloriesButton:window.localStorage.getItem('calories'),
       calories:window.localStorage.getItem('calories'),
       weight:this.$store.getters.user.body.weight,
       rules: {
          required: value => !!value || 'Requis',
          low: v => v.length >= 2 || 'Minimum 2 characteres',
          min: v => v.length >= 8 || 'Minimum 8 characteres'
        },
     }
  },
  methods: {
    ...mapActions({
      loadDailyDatas:"load daily datas"
    }),
    dataReady() {
      this.loading = false
    },
    save(e) {
      this.isEditing = !this.isEditing
      this.calories = this.caloriesButton
      window.localStorage.setItem('calories', this.calories)
      this.text = "données enregistrées"
      this.snackbar = true
      setTimeout(() => {
        this.isEditing = false
      }, 1500)
    }
  }
}

</script>
<style lang="scss">
.nutrition-plan h3 {
  margin-bottom: 1rem;
}

form, .hygie-container {
  min-width: 30vw;
  clear:both;
}

.hygie-font {
  font-family: "Fira Sans";
  text-transform: uppercase;
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
.space-left {
  --padding-left:4rem;
}

.space-right {
  --padding-right:4rem;
}
</style>
