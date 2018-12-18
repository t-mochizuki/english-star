import Vue from 'vue'

export default Vue.component('Question', {
  props: { id: Number },
  computed: {
    sentence() {
      return this.$store.state.question.sentence;
    },
    sound() {
      return this.$store.state.question.sound;
    },
    word() {
      return this.$store.state.question.word;
    },
  },
  methods: {
    listen: function () {
      let u = new SpeechSynthesisUtterance();
      u.lang = 'en-US';
      u.pitch = 0.8;
      u.text = this.sound;
      speechSynthesis.speak(u);
    },
    submit: function () {
      if (this.word.toLowerCase() == this.answer.toLowerCase()) {
        alert('Correct');
      } else {
        alert("Wrong");
      }
    },
    handlePrev: function () {
      if (this.id <= 1) return 1;
      return this.id - 1;
    },
    handleNext: function () {
      if (1 <= this.id) return 1;
      return Number(this.id) + 1;
    }
  },
  watch: {
    id: {
      handler() {
        this.answer = '';
        this.$store.dispatch({
          type: 'question/callQuestionApi',
          questionId: this.id
        });
      },
      immediate: true
    }
  }
})
