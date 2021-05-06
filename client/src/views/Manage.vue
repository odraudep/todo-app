<template>
  <div>
    <h1>Manage</h1>

    <div class="columns">
      <div class="col">
        <h2>Unchecked Tasks</h2>

        <div class="tasks">
          <Task
            v-for="task in uncheckedTasks" :key="task.id"
            :task="task"
          />
        </div>

        <div class="btns">
          <button
            class="btn-link success"
            v-if="uncheckedTasks.length > 0"
            @click="checkAllTasks"
          >
            Check All
          </button>
        </div>
      </div>
      <div class="col">
        <h2>Checked Tasks</h2>

        <div class="tasks">
          <Task
            v-for="task in checkedTasks" :key="task.id"
            :task="task"
          />
        </div>

        <div class="btns">
          <button
            class="btn-link success"
            v-if="checkedTasks.length > 0"
            @click="uncheckAllTasks"
          >
            Uncheck All
          </button>

          <button
            class="btn-link danger"
            v-if="checkedTasks.length > 0"
            @click="removeAll"
          >
            Remove All
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Task from "@/components/Task";

export default {
  name: "Manage",
  computed: {
    ...mapGetters(["uncheckedTasks", "checkedTasks"])
  },
  methods: {
    ...mapActions(["checkAllTasks", "uncheckAllTasks", "removeAllTasks"]),
    removeAll() {
      if (confirm("Are you sure?"))
        this.removeAllTasks();
    }
  },
  components: { Task },
};
</script>

<style scoped>
.columns {
  display: flex;
  gap: 4rem;
}
.columns > * {
  flex: 1;
}
.col {
  display: flex;
  flex-direction: column;
  min-height: 25rem;
  padding: 1rem;
  box-shadow: 0 .25rem 1rem rgb(25 25 25 / .15);
}
.btns {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: auto;
}
</style>
