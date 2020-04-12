<template>
  <div id="card">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="false"
    ></b-loading>
    <div id="content" v-if="!isLoading">
      <p class="title is-2">Hi, Here is a List of Your Todos:{{ todos }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToDo",
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
      //wait store action "fetchTodos" to retrieve data
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
  height: 90vh;
  width: 90%;
  margin: auto;
  text-align: left;
  padding: 40px;
}
</style>
