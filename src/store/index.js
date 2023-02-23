import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import menu from './modules/menu';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    menu,
    user
  },
  getters
});

export default store;
