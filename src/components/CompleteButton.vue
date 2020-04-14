<template>
  <div id="main">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="false"
    ></b-loading>
    <div id="in" @click="toggleComplete">
      <b-checkbox :value="complete" type="is-info" size="is-large"></b-checkbox>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CompleteButton",
  props: {
    thistodo: {
      type: Object
    }
  },
  data: () => {
    return {
      complete: null,
      isLoading: false
    };
  },
  methods: {
    toggleComplete: function() {
      this.thistodo.completed = !this.thistodo.completed;
      this.isLoading = true;
      (async () => {
        await this.updateDB();
      })();
      this.isLoading = false;
    },
    updateDB: function() {
      return new Promise((res, rej) => {
        axios
          .put(process.env.VUE_APP_API_URL, this.thistodo, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            res();
          });
      });
    }
  },
  created() {
    this.complete = this.thistodo.completed;
  }
};
</script>

<style scoped>
#main {
  display: inline-block;
  margin-top: 20px;
  transform: scale(1.5);
}

#in {
  transform: translate(0px, 5px);
}
</style>