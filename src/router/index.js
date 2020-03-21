import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import BodyParamsForm from '../views/BodyParamsForm.vue'
import DailyDataCalendar from '../views/DailyDataCalendar.vue'
import DailyDataForm from '../views/DailyDataForm.vue'
import BodyFatComputing from '../views/BodyFatComputing.vue'
import BodyFatInterpretation from '../views/BodyFatInterpretation.vue'
import EnergyPerDay from '../views/EnergyPerDay.vue'
import NutritionPlan from '../views/NutritionPlan.vue'
import Account from '../views/account/Account.vue'
import axios from 'axios'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/donnees-perso',
    name: 'BodyParamsForm',
    component: BodyParamsForm
  },
  {
    path: '/mes-donnees-quotidienne-calendrier',
    name: 'DailyDataCalendar',
    component: DailyDataCalendar
  },
  {
    path: '/mes-donnees-quotidienne-saisie',
    name: 'DailyDataForm',
    component: DailyDataForm
  },
  {
    path: '/masse-grasse',
    name: 'BodyFatComputing',
    component: BodyFatComputing
  },
  {
    path: '/masse-grasse-interpretation',
    name: 'BodyFatInterpretation',
    component: BodyFatInterpretation
  },
  {
    path: '/programme-nutritionnel',
    name: 'NutritionPlan',
    component: NutritionPlan
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/mon-compte',
    name: 'Account',
    component: Account
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode:"history",
  routes
})

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token')
  if (!['Login', 'Signup'].includes(to.name) && !token) {
      next({ name: 'Login' })
  } else if (['Login', 'Signup'].includes(to.name) && token) {
    next({ name: 'BodyParamsForm' })
  } else if (['Home'].includes(to.name) && token) {
    next({ name: 'NutritionPlan' })
  } else {
    next()
  }
})

export default router
