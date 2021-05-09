<template>
  <div class="container" :class="{ checked: task.checked }">
    <div class="title-check">
      <button
        aria-label="Toggle check task"
        class="check-btn"
        :class="{ actived: task.checked }"
        @click="$emit('check', task)"
      >
        <i class="fas fa-check"></i>
      </button>

      <span class="title">{{ upper(task.title) }}</span>
    </div>

    <div class="btns">
      <button
        aria-label="Set task as imporant"
        class="fav-btn"
        @click="$emit('toggleFav', task)"
      >
        <i class="far fa-star" v-if="!task.important"></i>
        <i class="fas fa-star" v-if="task.important"></i>
      </button>

      <button
        aria-label="Remove task"
        class="remove-btn"
        @click="$emit('remove', task)"
      >
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
    upper(x) {
      return x[0].toUpperCase() + x.slice(1);
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
  box-shadow: 0 .145rem .5rem rgb(25 25 25 / .15);
}
.container.checked .check-btn {
  background-color: hsl(var(--txt-clr));
  color: hsl(var(--body-clr));
}
.container.checked .check-btn > * {
  opacity: 1;
  color: hsl(var(--body-clr));
}
.container.checked .title {
  text-decoration: line-through;
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
  border: 1px solid hsl(var(--txt-clr));
  border-radius: 50%;
  background: none;
  transition: background-color .3s;
}
.check-btn > * {
  opacity: 0;
  transition: opacity .15s, color .3s;
  color: hsl(var(--txt-clr));
}
.check-btn:hover > * {
  opacity: 1;
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
  color: hsl(var(--txt-clr));
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
