<template>
  <div>
    <h1>Favorites</h1>

    <Task
      v-for="task in favTasks" :key="task.id"
      :task="task"
      @check="check"
      @toggleFav="toggleFav"
      @remove="remove"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Task from "@/components/Task";

export default {
  name: "Favorites",
  computed: {
    ...mapGetters(["favTasks"])
  },
  methods: {
    ...mapActions(["toggleTask", "toggleFav", "removeTask"]),
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
  components: { Task }
}
</script>

<style>

</style>
