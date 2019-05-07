import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from 'src/store'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

// export default function (/* { store, ssrContext } */) {
//   const Router = new VueRouter({
//     scrollBehavior: () => ({ y: 0 }),
//     routes,

//     // Leave these as is and change from quasar.conf.js instead!
//     // quasar.conf.js -> build -> vueRouterMode
//     // quasar.conf.js -> build -> publicPath
//     mode: process.env.VUE_ROUTER_MODE,
//     base: process.env.VUE_ROUTER_BASE
//   })

//   return Router
// }


const Router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes,

  // Leave these as is and change from quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
})


export default Router

Router.beforeEach((to, from, next) => {
  // console.log('=============================')
  // console.log(to.name, to);
  // console.log(from.name, from);
  // console.log('=============================')

    var AppName = store.state.App.AppName + '-name';
    switch(to.name) {
        case 'pertamax':
        case 'HalamanUtama':
        case 'mainMenu':
            // console.log('('+localStorage.getItem(AppName)+')');
            if (!localStorage.getItem(AppName)) {    
              next({name: 'login'});
            } 
            next();
            return;        
            break;
        case 'login':
            // console.log('DONE')
            // console.log('=============================')        
            if (!localStorage.getItem(AppName)) {    
              next();
            }  else {
              next({name: 'mainMenu'});
            }
            return;
            break;
        default:
            // console.log('DONE')
            // console.log('=============================')     

            store.dispatch('App/doAppCheckLogin').then(
              function() {

                var UserInfo = store.state.App.AppUser; 
                if(UserInfo.flag) {       
                  var MdiFrm = store.getters['App/getAppModules'].MdiFrm;
                  if (store.getters['App/getAppForms'][MdiFrm] === undefined) {
                    /* Logical ini buat untuk F5 (Refresh Page) */
                    next({name: 'mainMenu'}); 
                  }
                  next();
                } else {
                  if (localStorage.getItem('name')) {
                    next({name: 'mainMenu'}); 
                  } else {
                    next({name: 'login'});
                  }
                }  

              }
            )

            break;
    }

  /* must call `next` */
})
