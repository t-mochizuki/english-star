import Vue from 'vue'
import Question from './components/Question/Question.vue'
import List from './components/List/List.vue'
import Pager from './components/Pager/Pager.vue'

export default Vue.component('App', {
  components: { Question, List, Pager }
})
