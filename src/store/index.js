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
    fetchTodos(context) {
      return new Promise((res, rej) => {
        axios
          .get("http://10.0.0.156:8080/api/todos")
          .then(response => {
            context.commit("UPDATE_TODOS", response.data);
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
