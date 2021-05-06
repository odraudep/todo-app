<template>
  <div class="container">
    <div class="title-check">
      <button
        aria-label="Toggle check task"
        class="check-btn"
        :class="{ actived: task.checked }"
        @click="toggleTask"
      >
        <i class="fas fa-check"></i>
      </button>

      <span class="title">{{ task.title }}</span>
    </div>

    <div class="btns">
      <button class="fav-btn" aria-label="Set task as imporant">
        <i class="far fa-star" v-if="!task.important"></i>
        <i class="fas fa-star" v-if="task.important"></i>
      </button>

      <button class="remove-btn" aria-label="Remove task">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: {
    task: Object,
  },
  methods: {
    toggleTask() {
      // PLAY SONG
      new Audio( require("@/assets/check.mp3") ).play();
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  max-width: 40rem;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: .25rem;
  box-shadow: 0 0.25rem 1rem rgb(25 25 25 / 0.15);
}
.title-check {
  display: flex;
  align-items: center;
}
.check-btn {
  cursor: pointer;
  min-width: 1.5rem;
  height: 1.5rem;
  margin-right: 1em;
  border: 1px solid var(--txt-clr);
  border-radius: 50%;
  background: none;
  transition: background-color .3s;
}
.check-btn > * {
  opacity: 0;
  transition: opacity .15s, color .3s;
  color: var(--txt-clr);
}
.check-btn:hover > * {
  opacity: 1;
}
.check-btn.actived {
  background-color: var(--txt-clr);
  color: var(--body-clr);
}
.check-btn.actived > * {
  opacity: 1;
  color: var(--body-clr);
}
.btns {
  display: flex;
  justify-content: center;
}
.fav-btn,
.remove-btn {
  cursor: pointer;
  margin: 0 .5em;
  border: none;
  background: none;
  font-size: 1.5rem;
}
.fav-btn > * {
  color: #FAD207;
}
.remove-btn > * {
  color: var(--txt-clr);
}
@media screen and (max-width: 360px) {
  .container,
  .title-check {
    flex-direction: column;
  }
  .check-btn {
    margin-right: 0;
    margin-bottom: 1rem;
  }
  .btns {
    margin-top: 1rem;
  }
}
</style>
