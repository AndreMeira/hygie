<template>
  <div class="space-top">
    <v-row>
      <h4>Perte de graisse</h4>
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
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Lipides</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Glucides</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Kcal recommandés</td>
              <td></td>
              <td></td>
              <td></td>
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

.space-top {
  margin-top: 3rem;
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
