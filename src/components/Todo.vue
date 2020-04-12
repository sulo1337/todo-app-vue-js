<template>
  <div id="card">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="false"
    ></b-loading>
    <div id="content">
      <p class="title is-2">Hi, Here is a List of Your Todos:</p>
      <div v-for="todo in todos" v-bind:key="todo.id">
        <CompleteButton :thistodo="todo" />
        <ATodo :thistodo="todo" />
      </div>
    </div>
  </div>
</template>

<script>
import ATodo from "@/components/ATodo.vue";
import CompleteButton from "@/components/CompleteButton.vue";
export default {
  name: "ToDo",
  components: {
    ATodo,
    CompleteButton
  },
  props: {
    msg: String
  },
  data: () => {
    return {
      todos: [],
      isLoading: true
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
      });
      //set loading to false after a resolved Promise from fetchTodos
      this.isLoading = false;
    }
  },
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

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
