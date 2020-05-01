<template>
  <div class="space-top">
    <v-row>
      <h4 :style="{borderBottomColor:color}" class="hygie-font"><span v-html="title" /></h4>
    </v-row>
    <v-row>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left"></th>
              <th class="text-left">gr/jour</th>
              <th class="text-left">calories totales</th>
              <th class="text-left">répartition en %</th>
              <th class="text-left">gr/kg</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Protéines</td>
              <td>{{(distribution[0] / 100 * calories / 4).toFixed(0)}}</td>
              <td>{{(distribution[0] / 100 * calories).toFixed(0)}}</td>
              <td>{{distribution[0]}}%</td>
              <td>{{((distribution[0] / 100 * calories / 4) / weight).toFixed(1)}}</td>
            </tr>
            <tr>
              <td>Lipides</td>
              <td>{{(distribution[1] / 100 * calories / 9).toFixed(0)}}</td>
              <td>{{(distribution[1] / 100 * calories).toFixed(0)}}</td>
              <td>{{distribution[1]}}%</td>
              <td>{{((distribution[1] / 100 * calories / 9) / weight).toFixed(1)}}</td>
            </tr>
            <tr>
              <td>Glucides</td>
              <td>{{(distribution[2] / 100 * calories / 4).toFixed(0)}}</td>
              <td>{{(distribution[2] / 100 * calories).toFixed(0)}}</td>
              <td>{{distribution[2]}}%</td>
              <td>{{((distribution[2] / 100 * calories / 4) / weight).toFixed(1)}}</td>
            </tr>
            <tr>
              <td>Kcal recommandés</td>
              <td></td>
              <td>{{calories.toFixed(0)}}</td>
              <td>100%</td>
              <td></td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

  </v-row>
  </div>
</template>
<script>
export default {
  props:["title", "distribution", "calories", "weight", "color"],
  data() {
     return {

     }
  }
}

</script>
<style lang="scss">
.hygie-font {
  font-family: "Fira Sans";
  text-transform: uppercase;
}

.space-top {
  margin-top: 3rem;
}

h4 {
  width: 100%;
  min-height: 4rem;
  border-bottom: solid .3rem;
  padding-bottom: .2rem;
  --letter-spacing: -.04rem;
}

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
