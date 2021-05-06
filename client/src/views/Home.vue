<template>
  <div>
    <h1>Todo App</h1>

    <!-- ADD TASK -->
    <form class="form-inline" @submit.prevent="addTask">
      <input
        type="text"
        placeholder="What needs to be done?"
        v-model="task.title"
      />
      <button type="submit" class="btn">Add</button>
    </form>

    <!-- TASKS -->
    <div class="tasks">
      <Task v-for="(task, index) in tasks" :key="index" :task="task" />
    </div>
  </div>
</template>

<script>
import Task from "@/components/Task";

export default {
  name: "Home",
  data() {
    return {
      task: { checked: false, important: false },
      tasks: [
        {
          title: "Wash your hands",
          checked: true,
          important: true,
        },
        {
          title: "Brush your teeth",
          checked: false,
          important: false,
        }
      ],
    };
  },
  methods: {
    addTask() {
      console.log(this.task);

      this.task = { checked: false, important: false };
    },
  },
  components: { Task },
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
    padding: 0.75em;
  }
}
</style>
