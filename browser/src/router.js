import Vue from 'vue'
import VueRouter from 'vue-router'
import List from './components/List/List'
import Question from './components/Question/Question'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: List
    },
    {
      path: '/question/:id(\\d+)',
      component: Question,
      props: true
    }
  ]
})
export default router
