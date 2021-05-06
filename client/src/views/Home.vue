<template>
  <div>
    <h1>Todo App</h1>

    <form class="form-inline" @submit.prevent="addTask">
      <input type="text"
        placeholder="What needs to be done?"
        v-model="todo.title"
      >
      <button type="submit" class="btn">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      todo: { checked: false, important: false }
    }
  },
  methods: {
    addTask() {
      console.log(this.todo);

      this.todo = { checked: false, important: false };
    }
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 1em;
  text-align: center;
}
.form-inline {
  display: flex;
  max-width: 50rem;
  margin: 0 auto;
}
@media screen and (max-width: 360px) {
  .form-inline {
    flex-direction: column;
  }
  .form-inline input,
  .form-inline button {
    padding: .75em;
  }
}
</style>
