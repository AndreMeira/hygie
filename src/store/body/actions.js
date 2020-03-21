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

}
