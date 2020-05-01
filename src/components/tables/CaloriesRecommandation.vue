<template>
<v-simple-table>
  <template v-slot:default>
    <thead>
      <tr style="background:#018fb9;color:white;">
        <th style="color:white;" class="text-left">DEJ</th>
        <th style="color:white;" class="text-left">Niveau d'activité quotidienne</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in calories">
        <td><b>{{item.dej.toFixed(0)}}</b></td>
        <td>{{item.label}}</td>
      </tr>
    </tbody>
  </template>
</v-simple-table>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props:["title"],

  data() {
    return {
      calories:[]
    }
  },

  beforeMount() {
    this.loadCaloriesRecommandation().then((calories) => {
      console.log(calories)
      this.calories = calories
    })
  },

  methods: {
    ...mapActions({
      loadCaloriesRecommandation: "load calories recommandation"
    })
  },
  computed: {
    ...mapGetters([
      "caloriesRecommandation"
    ])
  }
}

</script>

<style lang="scss">
.selected {
  background-color: #c0e8c0;
}
</style>
