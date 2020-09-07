import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currencyFilter'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false 

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyD1ZnuXCqkiuyAmxKq0C2VnsPk3Cr1JvGc",
  authDomain: "vue-crm-ef45d.firebaseapp.com",
  databaseURL: "https://vue-crm-ef45d.firebaseio.com",
  projectId: "vue-crm-ef45d",
  storageBucket: "vue-crm-ef45d.appspot.com",
  messagingSenderId: "316927017140",
  appId: "1:316927017140:web:85d117dabba2c9dcfc57e1"
})

let app 

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


