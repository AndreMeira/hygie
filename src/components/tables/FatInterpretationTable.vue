<template>
<v-simple-table>
  <template v-slot:default>
    <thead>
      <tr>
        <th class="text-left"></th>
        <th class="text-left">Maigreur / sèche</th>
        <th class="text-left">Norme santé</th>
        <th class="text-left">Surpoids</th>
        <th class="text-left">Obésité</th>
      </tr>
    </thead>
    <tbody v-if="gender === 'F'">
      <tr v-if="category === 0">
        <td><b>Femme de 20 à 40 ans</b></td>
        <td> <21 %</td>
        <td>21% à 33%</td>
        <td>33% à 39%</td>
        <td> >39%</td>
      </tr>
      <tr v-if="category === 1">
        <td><b>Femme de 40 à 60 ans</b></td>
        <td> <23 %</td>
        <td>23% à 34%</td>
        <td>35% à 40%</td>
        <td> >40%</td>
      </tr>
      <tr v-if="category === 2">
        <td><b>Femme de 62 à 80 ans</b></td>
        <td> <23 %</td>
        <td>23% à 34%</td>
        <td>35% à 40%</td>
        <td> >40%</td>
      </tr>
    </tbody>

    <tbody v-if="gender === 'M'">
      <tr v-if="category === 0">
        <td><b>Homme de 20 à 40 ans</b></td>
        <td> <8 %</td>
        <td>8% à 20%</td>
        <td>20% à 25%</td>
        <td> >25%</td>
      </tr>
      <tr v-if="category === 1">
        <td><b>Homme de 40 à 60 ans</b></td>
        <td> <11 %</td>
        <td>11% à 22%</td>
        <td>23% à 28%</td>
        <td> >28%</td>
      </tr>
      <tr v-if="category === 2">
        <td><b>Homme de 62 à 80 ans</b></td>
        <td> <13 %</td>
        <td>13% à 25%</td>
        <td>26% à 30%</td>
        <td> >30%</td>
      </tr>
    </tbody>
  </template>
</v-simple-table>
</template>
<script>
export default {
  props:["gender", "age"],

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
