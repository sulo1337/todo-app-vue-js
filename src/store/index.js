import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listTodos: []
  },
  mutations: {
    UPDATE_TODOS: (state, todos) => {
      state.listTodos = todos;
    }
  },
  actions: {
    //methods
    //async function also returns a promise
    //we can do async instead of return new promise
    fetchTodos(context) {
      return new Promise((res, rej) => {
        axios
          .get(process.env.VUE_APP_APIURL)
          .then(response => {
            context.commit("UPDATE_TODOS", response.data);
            //this is important, if data is obtained, then we should resolve this promise
            //if it is not resolved then promise is not returned and this program is stuck here
            res();
          })
          .catch(() => rej());
      });
    }
  },
  getters: {
    getTodos: state => {
      return state.listTodos;
    }
  },
  modules: {}
});
