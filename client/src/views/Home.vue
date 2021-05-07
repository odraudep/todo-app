<template>
  <div>
    <h1>Todo App</h1>

    <!-- ADD TASK -->
    <InputModal
      txt="What needs to be done?"
      @addTask="addTask"
    />

    <!-- TASKS -->
    <div class="tasks">
      <Task
        v-for="task in tasks" :key="task.id"
        :task="task"
        @check="check"
        @toggleFav="toggleFav"
        @remove="remove"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import InputModal from "@/components/InputModal";
import Task from "@/components/Task";

export default {
  name: "Home",
  computed: {
    ...mapState(["tasks"])
  },
  methods: {
    ...mapActions(["addTask", "toggleTask", "toggleFav", "removeTask"]),
    async check(task) {
      await this.toggleTask(task);

      // PLAY SONG
      if (!task.checked)
        new Audio( require("@/assets/check.mp3") ).play();
    },
    remove(task) {
      if (confirm("Are you sure?"))
        this.removeTask(task);
    },
  },
  components: { Task, InputModal },
};
</script>

<style scoped></style>
