<template>
<v-container class="fill-height">
  <v-row align="center" justify="center">
    <v-col col="12" md="10">
      <v-row>
        <h2>Programme nutritionnel // recomposition corporelle</h2>
      </v-row>
      <v-row>
        <h3>4/Evalue tes dépenses énergétiques journalières (DEJ)</h3>
      </v-row>

      <v-row>
        <v-col cols="12" md="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col col="12" md="6" class="space-right">
          <v-row>
            <v-col>
              <h3>Metabolisme OK</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <BaseTable />
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col>
              <BaseTable />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <BaseTable />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <BaseTable />
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
              <BaseTable />
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col>
              <BaseTable />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <BaseTable />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col col="12" md="6" class="space-right">
          <v-row>
            <v-col>
              <h3>Macros recommandés en milieu sportif pour une <span>perte de graisse</span></h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <BaseTable />
            </v-col>
          </v-row>
        </v-col>

        <v-col col="12" md="6" class="space-left">
          <v-row>
            <v-col>
              <h3>Macros recommandés en milieu sportif pour une <span>prise de masse</span><span>sport ++</span></h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <BaseTable />
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
</v-container>
</template>

<script>
import BaseTable from "@/components/BaseProportionTable.vue"
export default {
  components: {
    BaseTable
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
