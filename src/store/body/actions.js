import urls  from '@/config/urls'
import oauth from '@/config/client'
import axios from 'axios'

export default {
  /**
   *
   */
  "save body params" (context, params) {
    return new Promise((resolve, reject) => {
        axios.post(urls.updateBodyParams, params).then(({data}) => {
            context.commit("set current user", data)
            resolve(data)
        }).catch(e => {
          console.log(e)
          reject(e)
        });
    });
  },

  /**
   *
   */
   "save body fat params" (context, params) {
     return new Promise((resolve, reject) => {
         axios.post(urls.updateBodyFatParams, params).then(({data}) => {
             context.commit("set current user", data)
             resolve(data)
         }).catch(e => {
           console.log(e)
           reject(e)
         });
     });
   },

   /**
    *
    */
    "load calories recommandation" (context, params) {
      return new Promise((resolve, reject) => {
          axios.get(urls.loadCaloriesRecommandation, params).then(({data}) => {
              context.commit("set calories recommandation", data)
              resolve(data)
          }).catch(e => {
            console.log(e)
            reject(e)
          });
      });
    },

    /**
     *
     */
     "load daily datas" (context) {
       return new Promise((resolve, reject) => {
           axios.get(urls.loadDailyDatas).then(({data}) => {
               context.commit("set daily datas", data)
               data && data.days ? resolve(data) : reject(data)
           }).catch(e => {
             console.log(e)
             reject(e)
           });
       });
     },

     /**
      *
      */
      "create daily datas" (context, params) {
        return new Promise((resolve, reject) => {
            axios.post(urls.createDailyDatas, params).then(({data}) => {
                context.commit("set daily datas", data)
                data && data.days ? resolve(data) : reject(data)
            }).catch(e => {
              console.log(e)
              reject(e)
            });
        });
      },

      /**
       *
       */
       "update daily datas" (context, params) {
         return new Promise((resolve, reject) => {
             axios.put(urls.updateDailyDatas(params.day), params).then(({data}) => {
                 context.commit("set daily datas", data)
                 data && data.days ? resolve(data) : reject(data)
             }).catch(e => {
               console.log(e)
               reject(e)
             });
         });
       },

}
