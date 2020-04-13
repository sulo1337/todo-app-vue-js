<template>
  <div id="addtodo">
    <img
      src="https://img.icons8.com/doodle/48/000000/add.png"
      @click="modalActive = true"
    />
    <b-modal :active.sync="modalActive">
      <div id="modal">
        <h1 class="title is-2">Add a Todo</h1>
        <div id="todoform">
          <b-field
            label="Title"
            v-bind:type="titleFieldType"
            v-bind:message="titleFieldMessage"
          >
            <b-input v-model="todo.title"></b-input>
          </b-field>
          <b-field
            label="Description"
            v-bind:type="descFieldType"
            v-bind:message="descFieldMessage"
          >
            <b-input
              v-model="todo.description"
              type="textarea"
              maxlength="255"
            ></b-input>
          </b-field>

          <b-field label="Set deadline">
            <b-datetimepicker horizontal-time-picker v-model="datetime">
            </b-datetimepicker>
          </b-field>

          <b-button type="is-success" @click="validate">
            Add
          </b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => {
    return {
      modalActive: false,
      todo: {
        id: 0,
        title: "",
        description: "",
        added: null,
        deadline: null,
        completed: false
      },
      datetime: new Date(),
      titleFieldType: "",
      titleFieldMessage: "",
      descFieldType: "",
      descFieldMessage: ""
    };
  },
  methods: {
    validate: function() {
      var invalidForm = false;
      if (this.todo.title == "") {
        this.titleFieldType = "is-danger";
        this.titleFieldMessage = "Please enter a title";
        invalidForm = true;
      } else {
        this.titleFieldType = "";
        this.titleFieldMessage = "";
      }

      if (this.todo.description == "") {
        this.descFieldType = "is-danger";
        this.descFieldMessage = "Please enter a description";
        invalidForm = true;
      } else {
        this.descFieldType = "";
        this.descFieldMessage = "";
      }

      if (!invalidForm) {
        var today = this.datetime;
        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        var time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        this.todo.deadline = date + "T" + time;
        this.todo.deadline.trim();
        (async () => {
          await this.add();
          this.$router.go();
        })();
      }
    },
    add: function() {
      return new Promise((res, rej) => {
        axios
          .post("http://10.0.0.156:8080/api/todos", this.todo, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            res();
          });
      });
    }
  }
};
</script>

<style scoped>
#addtodo {
  text-align: center;
  margin-bottom: 10px;
}

#addtodo > img {
  transform: translate(0px, 15px);
  transition: transform 0.2s ease-in-out;
}

#addtodo > img:hover {
  cursor: pointer;
  transform: translate(-2px, 13px);
  transition: transform 0.2s ease-in-out;
}

#modal {
  background-color: #ffebe7;
  height: 70vh;
  padding: 20px;
  border-radius: 20px;
}

#todoform {
  width: 50%;
  margin: auto;
  text-align: left;
}
</style>