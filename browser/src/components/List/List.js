import Vue from 'vue'

export default Vue.component('List', {
  computed: {
    pages() {
      let l = [];
      for (let i = 1; i <= this.$store.state.list.num; ++i) {
        l.push(i);
      }
      return l;
    },
    ls() {
      let l = [];
      for (let i = this.$store.state.list.begin; i <= this.$store.state.list.end; ++i) {
        l.push({ id: i });
      }
      return l;
    }
  },
  mounted: function () {
    this.$store.dispatch('list/callListApi');
  },
  methods: {
    handleClick: function (questionId) {
      this.$store.dispatch({
        type: 'list/callQuestionApi',
        questionId: questionId
      });
    }
  }
})

