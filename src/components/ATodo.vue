<template>
  <div
    id="card"
    v-bind:class="{
      completed: thistodo.completed,
      notcompleted: !thistodo.completed,
      isClickedComp: this.clicked && thistodo.completed,
      isClickedNotComp: this.clicked && !thistodo.completed
    }"
    @click="toggleClick"
  >
    <div class="title is-4" v-if="!this.clicked">
      {{ thistodo.title }}
      <div style="float: right">
        <img src="@/assets/upwards.png" id="arrowhead" />
      </div>
    </div>
    <div v-if="this.clicked">
      <div>
        <p class="title is-2">
          {{ thistodo.title }}
        </p>
        <p class="title is-5">{{ thistodo.description }}</p>
        <p>
          <b
            >Deadline: {{ getDate(thistodo.added) }} at
            {{ getTime(thistodo.added) }}</b
          >
        </p>
        <p>
          <b>Created on:</b> {{ getDate(thistodo.added) }} at
          {{ getTime(thistodo.added) }}
        </p>
        <b>Status: </b>
        <p v-if="thistodo.completed" style="display: inline">Completed</p>
        <p v-else style="display: inline">Not Completed</p>
        <br />
        <div style="display: block">
          <b-button type="is-primary" style="margin-right: 10px">Edit</b-button>
          <b-button type="is-danger">Delete</b-button>
        </div>
      </div>
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
    },
    getDate(datetime) {
      return datetime.slice(0, 10);
    },
    getTime(datetime) {
      return datetime.slice(11, 16);
    }
  },
  computed: {}
};
</script>

<style scoped>
#clickedp {
  text-align: center;
}

.isClickedComp {
  background-color: #73e2a7 !important;
  text-decoration: none !important;
}

.isClickedNotComp {
  background-color: #f9627e !important;
}

.notcompleted {
  background-color: #f9627ea2;
}

.completed {
  background-color: #73e2a7a2;
  text-decoration: line-through;
}

#arrowhead {
  float: right;
  width: 8%;
  height: auto;
}
</style>