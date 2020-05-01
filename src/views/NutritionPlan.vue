<template>
<v-container class="fill-height">
  <v-row align="center" justify="center">
    <v-col col="12" md="10">
      <v-row>
        <v-col cols="12" md="12">
          <h2 class="hygie-font">Programme nutritionnel // recomposition corporelle</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <h3>4/Evalue tes dépenses énergétiques journalières (DEJ)</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12">
          <CalTable title="Dépenses énergétiques journalières"/>
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
          label="Tes calories:"
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

      <v-row v-if="calories > 800">
        <v-col col="12" md="12" class="space-right">
          <v-row>
            <v-col cols="12" md="12">
              <h2>Nutrition-santé personnalisé</h2>
            </v-col>
          </v-row>
          <v-row v-if="calories > 800">
            <v-col col="12" md="12" class="space-right">
              <v-row>
                <v-col>
                  <BaseTable
                    title="Calories et macros recommandés pour un poids stable"
                    :distribution="[15, 35, 50]"
                    :calories="calories * 1.0"
                    :weight="weight"/>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row v-if="calories > 800">

        <v-col col="12" md="6" class="space-right">
          <v-row>
            <v-col>
              <h3>Metabolisme OK</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <BaseTable
                title="Perte de graisse"
                :distribution="[25, 35, 40]"
                :calories="calories * 0.85"
                :weight="weight"
                color="#c4d000"/>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col>
              <BaseTable
                title="Maintien de poids / recomposition corporelle"
                :distribution="[22, 33, 45]"
                :calories="parseFloat(calories)"
                :weight="weight"
                color="#e2f000"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <BaseTable
                title="Prise de masse avec 10% de surplus"
                :distribution="[22, 35, 43]"
                :calories="calories * 1.10"
                :weight="weight"
                color="#e7857e" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <BaseTable
                title="Prise de masse avec 15% de surplus"
                :distribution="[20, 35, 45]"
                :calories="calories * 1.15"
                :weight="weight"
                color="#e7857e" />
            </v-col>
          </v-row>
        </v-col>

        <v-col col="12" md="6" class="space-left">
          <v-row>
            <v-col>
              <h3>Metabolisme Ralenti</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <BaseTable
                title="Relancer le métabolisme durant les 2 premières semaines (1&nbsp;et&nbsp;2)"
                :distribution="[22, 36, 42]"
                :calories="calories * 0.90 * 0.95"
                :weight="weight"
                color="#00a7ac"/>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col>
              <BaseTable
                title="Calories et macros recommandés les 2 semaines suivantes (3&nbsp;et&nbsp;4)"
                :distribution="[22, 36, 42]"
                :calories="calories * 0.90"
                :weight="weight"
                color="#00a7ac"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <BaseTable
                title="Calories et macros recommandés les 2 semaines suivantes (5&nbsp;et&nbsp;6)"
                :distribution="[23, 33, 44]"
                :calories="parseFloat(calories)"
                :weight="weight"
                color="#c4d000"/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row v-if="calories > 800">
        <v-col col="12" md="6" class="space-right">
          <v-row>
            <v-col>
              <h3>Macros recommandés en milieu sportif pour une <span>perte de graisse</span></h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <BaseTable
                :distribution="[30, 35, 35]"
                :calories="calories * 0.85"
                :weight="weight"
                title="Perte de graisse"
                color="#c4d000"/>
            </v-col>
          </v-row>
        </v-col>

        <v-col col="12" md="6" class="space-left">
          <v-row>
            <v-col>
              <h3>Macros recommandés en milieu sportif pour une <span>prise de masse</span><span> sport ++</span></h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <BaseTable
                :distribution="[25, 40, 35]"
                :calories="calories * 1.10"
                :weight="weight"
                title="Prise de masse (musculaire)"
                color="#e7857e"/>
            </v-col>
          </v-row>
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
import BaseTable from "@/components/tables/BaseProportionTable.vue"
import CalTable from "@/components/tables/CaloriesRecommandation.vue"
export default {
  components: {
    BaseTable,
    CalTable
  },

  beforeMount () {
    if (!this.$store.getters.user.body) {
      return this.$router.push({ name:"BodyParamsForm" })
    }
  },
  data() {
     return {
       text:null,
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
