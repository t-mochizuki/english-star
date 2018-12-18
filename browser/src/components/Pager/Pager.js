import Vue from 'vue'

export default Vue.component('Pager', {
  props: ['pages'],
  computed: {
    _pos() {
      return this.$store.state.list.pos;
    },
    _last: function () {
      return this.pages.length;
    },
    _prev: function () {
      return this.pages[0] != this._pos
    },
    _next: function () {
      return this.pages[this._last - 1] != this._pos
    }
  },
  methods: {
    _updatePos(pos) {
      this.$store.commit({
        type: 'list/updatePos',
        pos: pos
      })
      this.$store.dispatch({
        type: 'list/callListApi'
      })
    },
    handlePrev: function () {
      if (this._prev) {
        this._updatePos(this._pos - 1);
      }
    },
    handlePage: function (page) {
      if (page < 1) {
        page = 1;
      }
      if (this._last < page) {
        page = this._last;
      }
      if (this._pos != page) {
        this._updatePos(page);
      }
    },
    handleNext: function () {
      if (this._next) {
        this._updatePos(this._pos + 1);
      }
    }
  }
})
