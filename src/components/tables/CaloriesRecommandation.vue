<template>
<v-simple-table>
  <template v-slot:default>
    <thead>
      <tr>
        <th class="text-left">DEJ</th>
        <th class="text-left">Niveau d'activité quotidienne</th>
      </tr>
    </thead>
    <tbody>
      <tr for="item in cals">
        <td><b>{{item.dej}}</b></td>
        <td>{{item.label}}</td>
      </tr>
    </tbody>
  </template>
</v-simple-table>
</template>
<script>
export default {
  props:[],

  data() {
    cals:[]
  },

  beforeMount() {

  },

  methods: {
    ...mapActions({
      
    })
  }
  computed: {
    category() {
      if (this.age < 40) {
        return 0
      }

      if (this.age < 60) {
        return 1
      }

      return 2
    }
  }
}

</script>

<style lang="scss">
.selected {
  background-color: #c0e8c0;
}
</style>
