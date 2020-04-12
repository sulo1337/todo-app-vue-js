<template>
  <div
    id="card"
    v-bind:class="{
      completed: thistodo.completed,
      notcompleted: !thistodo.completed
    }"
    @click="toggleClick"
  >
    <div class="title is-4" v-if="!this.clicked">
      {{ thistodo.title }}
    </div>
    <div class="title is-4" v-if="this.clicked">
      {{ thistodo.title }} clicked!
    </div>
  </div>
</template>

<script>
export default {
  name: "ATodo",
  props: {
    thistodo: {
      type: Object
    }
  },
  data: () => {
    return {
      clicked: false
    };
  },
  methods: {
    toggleClick() {
      this.clicked = !this.clicked;
    }
  }
};
</script>

<style scoped>
#card {
  display: inline-block;
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  margin-bottom: 10px;
  margin-top: 10px;
  box-shadow: 0px 0px 0px #000000;
  transition: transform 0.5s ease-in-out;
  transition: padding 0.5s ease-in-out;
}

#card:hover {
  transform: translate(-8px, -8px);
  box-shadow: 1px 1px 8px #000000;
  padding: 30px;
  transition: transform 0.2s ease-in-out;
  transition: padding 0.2s ease-in-out;
}
.completed {
  background-color: #73e2a7;
}

.notcompleted {
  background-color: #f9627d;
}
</style>