<template>
  <div id="main">
    <div id="in">
      <b-checkbox
        :value="thistodo.completed"
        type="is-info"
        size="is-large"
      ></b-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompleteButton",
  props: {
    thistodo: {
      type: Object
    }
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