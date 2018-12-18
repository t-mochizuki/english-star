import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import axios from 'axios'

const question = {
  namespaced: true,
  state: {
    word: '',
    sound: '',
    sentence: ''
  },
  actions: {
    callQuestionApi({ state, commit }, payload) {
      axios
        .get(`/question/${payload.questionId}`)
        .then(response => {
          const word = response.data.Word;
          commit({
            type: 'updateWord',
            word: word
          });
          const sound = response.data.Sentence;
          commit({
            type: 'updateSound',
            sound: sound
          });
          const len = word.length;
          const sentence = sound.replace(word, '_'.repeat(len));
          commit({
            type: 'updateSentence',
            sentence: sentence
          });
        })
    }
  },
  mutations: {
    updateSentence(state, payload) {
      state.sentence = payload.sentence;
    },
    updateSound(state, payload) {
      state.sound = payload.sound;
    },
    updateWord(state, payload) {
      state.word = payload.word;
    },
  }
}

const list = {
  namespaced: true,
  state: {
    pos: 1,
    begin: 1,
    end: 5,
    num: 1
  },
  actions: {
    callListApi({ state, commit }) {
      axios
        .get(`/list?pos=${state.pos}&cnt=5`)
        .then(response => {
          commit({
            type: 'updateListBegin',
            begin: response.data.Begin
          });
          commit({
            type: 'updateListEnd',
            end: response.data.End
          });
          commit({
            type: 'updateNum',
            num: response.data.Num
          });
        })
    }
  },
  mutations: {
    updatePos(state, payload) {
      state.pos = payload.pos;
    },
    updateListBegin(state, payload) {
      state.begin = payload.begin;
    },
    updateListEnd(state, payload) {
      state.end = payload.end;
    },
    updateNum(state, payload) {
      state.num = payload.num;
    }
  }
}

const store = new Vuex.Store({
  modules: {
    question,
    list
  }
})
export default store
