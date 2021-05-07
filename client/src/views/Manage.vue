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
            @check="check"
            @toggleFav="toggleFav"
            @remove="remove"
          />
        </div>

        <div class="btns" v-if="uncheckedTasks.length > 0">
          <button
            class="btn-link success"
            @click="checkAll"
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
            @check="check"
            @toggleFav="toggleFav"
            @remove="remove"
          />
        </div>

        <div class="btns" v-if="checkedTasks.length > 0">
          <button
            class="btn-link success"
            @click="uncheckAllTasks"
          >
            Uncheck All
          </button>

          <button
            class="btn-link danger"
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
    ...mapActions([
      "toggleTask",
      "toggleFav",
      "removeTask",
      "checkAllTasks",
      "uncheckAllTasks",
      "removeAllTasks"
    ]),
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
    async checkAll() {
      await this.checkAllTasks();

      // PLAY SONG
      new Audio( require("@/assets/check.mp3") ).play();
    },
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
@media screen and (max-width: 768px) {
  .columns {
    flex-direction: column;
  }
}
</style>
