<template>
  <div>
    <h1>Todo App</h1>

    <!-- ADD TASK -->
    <InputModal />

    <!-- TASKS -->
    <div class="tasks">
      <Task
        v-for="task in tasks" :key="task.id"
        :task="task"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import InputModal from "@/components/InputModal";
import Task from "@/components/Task";

export default {
  name: "Home",
  data() {
    return {
      task: {}
    };
  },
  computed: {
    ...mapState(["tasks"])
  },
  methods: {},
  components: { Task, InputModal },
};
</script>

<style scoped></style>
