import Vue from 'vue';
import Vuex from 'vuex';

import guestbook from './gb.module'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    guestbook,
  }
});