<template>
<v-container class="fill-height">
  <v-row align="center" justify="center">
    <v-col col="12" md="10">
      <v-row>
        <v-col cols="12" md="12">
          <h2>Nutrition-santé personnalisé</h2>
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
            v-model="caloriesButton">
            <template v-slot:append-outer>
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
          </v-text-field>
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
export default {
  components: {
    BaseTable,
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
  methods:{
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
