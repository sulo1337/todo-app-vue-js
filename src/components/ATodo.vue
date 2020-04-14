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
          <b-button
            type="is-primary"
            style="margin-right: 10px"
            @click="editing = true"
            >Edit</b-button
          >
          <b-button type="is-danger" @click="deleting = true">Delete</b-button>
        </div>
      </div>
    </div>
    <div>
      <b-modal :active.sync="editing">
        <div class="myModal" id="editModal">
          <h1 class="title is-2" style="text-align: center">Edit</h1>
          <div id="todoform">
            <b-field
              label="Title"
              v-bind:type="titleFieldType"
              v-bind:message="titleFieldMessage"
            >
              <b-input v-model="thistodo.title"></b-input>
            </b-field>
            <b-field
              label="Description"
              v-bind:type="descFieldType"
              v-bind:message="descFieldMessage"
            >
              <b-input
                v-model="thistodo.description"
                type="textarea"
                maxlength="255"
              ></b-input>
            </b-field>

            <b-field label="Set deadline">
              <b-datetimepicker horizontal-time-picker v-model="datetime">
              </b-datetimepicker>
            </b-field>

            <b-button type="is-primary" @click="validate">
              Edit
            </b-button>
          </div>
        </div>
      </b-modal>
    </div>
    <div>
      <b-modal :active.sync="deleting">
        <div class="myModal" id="deleteModal">
          <h1 class="title is-2">Delete</h1>
          <h1 class="title is-4">
            Are you sure you want to delete this todo?
          </h1>
          <b-button
            type="is-danger"
            style="margin-right: 10px"
            @click="deleteThis"
            >Yes</b-button
          >
          <b-button type="is-success" @click="deleting = false">No</b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ATodo",
  props: {
    thistodo: {
      type: Object
    }
  },
  data: () => {
    return {
      clicked: false,
      editing: false,
      deleting: false,
      datetime: new Date(),
      titleFieldMessage: "",
      titleFieldType: "",
      descFieldMessage: "",
      descFieldType: ""
    };
  },
  methods: {
    toggleClick() {
      if (!this.editing && !this.deleting) {
        this.clicked = !this.clicked;
      }
    },
    getDate(datetime) {
      return datetime.slice(0, 10);
    },
    getTime(datetime) {
      return datetime.slice(11, 16);
    },
    validate: function() {
      var invalidForm = false;
      if (this.thistodo.title == "") {
        this.titleFieldType = "is-danger";
        this.titleFieldMessage = "Please enter a title";
        invalidForm = true;
      } else {
        this.titleFieldType = "";
        this.titleFieldMessage = "";
      }

      if (this.thistodo.description == "") {
        this.descFieldType = "is-danger";
        this.descFieldMessage = "Please enter a description";
        invalidForm = true;
      } else {
        this.descFieldType = "";
        this.descFieldMessage = "";
      }

      if (!invalidForm) {
        var deadline = this.datetime;
        console.log(this.datetime);
        var date =
          deadline.getFullYear() +
          "-" +
          (deadline.getMonth() + 1) +
          "-" +
          deadline.getDate();
        var time =
          deadline.getHours() +
          ":" +
          deadline.getMinutes() +
          ":" +
          deadline.getSeconds();
        this.thistodo.deadline = date + "T" + time;
        this.thistodo.deadline.trim();
        console.log(this.thistodo);
        (async () => {
          await this.editRequest();
          this.$router.go();
        })();
      }
    },
    editRequest: async function() {
      await axios
        .put(process.env.VUE_APP_APIURL, this.thistodo, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          console.log(response);
        });
    },
    deleteThis: function() {
      (async () => {
        await this.deleteRequest();
        this.$router.go();
      })();
    },
    deleteRequest: async function() {
      const url = process.env.VUE_APP_APIURL + this.thistodo.id;
      url.trim();
      await axios.delete(url).then(response => {
        console.log(response);
      });
    }
  }
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

.myModal {
  background-color: #ffebe7;
  padding: 20px;
}

#editModal {
  height: 75vh;
}

#deleteModal {
  height: 30vh;
  text-align: center;
}
#todoform {
  width: 50%;
  margin: auto;
}
</style>