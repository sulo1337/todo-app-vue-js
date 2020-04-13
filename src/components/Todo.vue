<template>
  <div id="card">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="false"
    ></b-loading>
    <div id="content">
      <p class="title is-2">
        Hi, Here is a List of Your Todos:
      </p>
      <AddTodo />
      <div v-for="todo in todos" v-bind:key="todo.id">
        <CompleteButton :thistodo="todo" />
        <ATodo :thistodo="todo" id="atodo" />
      </div>
    </div>
  </div>
</template>

<script>
import ATodo from "@/components/ATodo.vue";
import CompleteButton from "@/components/CompleteButton.vue";
import AddTodo from "@/components/AddTodo.vue";
export default {
  name: "ToDo",
  components: {
    ATodo,
    CompleteButton,
    AddTodo
  },
  props: {
    msg: String
  },
  data: () => {
    return {
      todos: [],
      isLoading: true,
      modalActive: false
    };
  },
  created() {
    this.updateTodos();
  },
  methods: {
    updateTodos: async function() {
      this.isLoading = true;
      //wait store action "fetchTodos" to retrieve data and resolve a Promise
      await this.$store.dispatch("fetchTodos").then(response => {
        this.todos = this.$store.getters.getTodos;
        this.todos.sort((a, b) => (a.added < b.added ? 1 : -1));
      });
      //set loading to false after a resolved Promise from fetchTodos
      this.isLoading = false;
    },
    addTodo() {}
  },
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#atodo {
  display: inline-block;
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  margin-bottom: 10px;
  margin-top: 10px;
  box-shadow: 0px 0px 0px #000000;
  transition: transform 0.2s ease-in-out;
  // transition: padding 0.2s ease-in-out;
}

#atodo:hover {
  transform: translate(-8px, -8px);
  box-shadow: 1px 1px 8px #000000;
  /* padding: 30px; */
  transition: transform 0.2s ease-in-out;
  // transition: padding 0.2s ease-in-out;
  cursor: pointer;
}

#content{
  background-color: #ffffff;
  box-shadow: 2px 2px 8px #000000;
  border-radius: 40px;
  height: 100%;
  width: 90%;
  margin: auto;
  text-align: left;
  padding: 40px;
}


</style>
