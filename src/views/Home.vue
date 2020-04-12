<template>
  <div class="home">
    <div id="top">
      <Intro />
    </div>
    <Todo msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import Todo from "@/components/Todo.vue";
import Intro from "@/components/Intro.vue";

export default {
  name: "Home",
  components: {
    Todo,
    Intro
  }
};
</script>

<style lang="scss">
#top {
  width: 90%;
  margin: auto;
  text-align: left;
  padding: 20px;
}

</style>