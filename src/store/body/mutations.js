export default {

  "set calories recommandation" (state, recommandation) {
    state.caloriesRecommandation = recommandation
    console.log("mutation", state)
  },

  "set daily datas" (state, datas) {
    state.dailyDatas = datas
  }
}
