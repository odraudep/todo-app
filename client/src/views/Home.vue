<template>
  <div>
    <h1>Todo App</h1>

    <!-- ADD TASK -->
    <InputModal @addTask="add" />

    <!-- TASKS -->
    <div class="tasks">
      <Task v-for="(task, index) in tasks" :key="index" :task="task" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import InputModal from "@/components/InputModal";
import Task from "@/components/Task";

export default {
  name: "Home",
  data() {
    return {
      task: { checked: false, important: false }
    };
  },
  computed: {
    ...mapState(["tasks"])
  },
  methods: {
    ...mapActions(["addTask"]),
    async add(task) {
      await this.addTask(task);

      this.task = { checked: false, important: false };
    },
  },
  components: { Task, InputModal },
};
</script>

<style scoped>
h1 {
  margin-bottom: 1em;
  text-align: center;
}
</style>
