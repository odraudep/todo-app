<template>
  <div>
    <h1>Favorites</h1>

    <Task
      v-for="task in favTasks" :key="task.id"
      :task="task"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Task from "@/components/Task";

export default {
  name: "Favorites",
  computed: {
    ...mapGetters(["favTasks"])
  },
  components: { Task }
}
</script>

<style>

</style>
