import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import App from './App'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

// export default function (/* { ssrContext } */) {
//   const Store = new Vuex.Store({
//     modules: {
//       example
//     }
//   })

//   return Store
// }


const store = new Vuex.Store({
  modules: {
    App
  },
  // plugins: [WiliPlugIn]  // IMPORTANT: USAGE
})

export default store