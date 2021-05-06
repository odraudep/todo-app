<template>
  <div>
    <div class="modal" v-if="open">
      <div class="overlay" @click="toggleModal"></div>

      <div class="container">
        <form class="form-inline" @submit.prevent="addTask">
          <div class="form-control">
            <input
              type="text"
              placeholder="What needs to be done?"
              class="input-text"
              v-model="task.title"
            />
          </div>
          <button type="submit" class="btn">Add</button>
        </form>

        <button class="btn-close" @click="toggleModal">
          <span></span>
        </button>
      </div>
    </div>

    <button type="button" class="btn open-modal" @click="toggleModal">Add</button>
  </div>
</template>

<script>
export default {
  name: "InputModal",
  data() {
    return {
      open: false,
      task: { important: false, checked: false }
    };
  },
  methods: {
    toggleModal() {
      this.open = !this.open;
    },
    addTask() {
      if (!this.task.title || this.task.title.trim() == "")
        return alert("What needs to be done?");

      this.$emit("addTask", this.task);

      this.task = { important: false, checked: false };
    },
  }
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(0 0 0 / 0.5);
}
.container {
  max-width: 30rem;
  padding: 1rem;
  position: relative;
  z-index: 1;
  border-radius: 0.25rem;
  background-color: var(--body-clr);
}
.form-inline {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.btn-close {
  --close: 0.075em;

  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  position: absolute;
  top: 0;
  right: 0;
  border: var(--close) solid var(--txt-clr);
  border-radius: 50%;
  box-shadow: 0 0 0 var(--close) var(--body-clr);
  transform: translate3d(50%, -50%, 0);
  background: var(--body-clr);
  font-size: 3rem;
}
.btn-close span,
.btn-close span::before {
  width: 80%;
  height: var(--close);
  position: relative;
  border-radius: 0.145rem;
  background-color: var(--txt-clr);
}
.btn-close span {
  transform: rotate(45deg);
}
.btn-close span::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(90deg);
  background-color: var(--txt-clr);
}
/* ------- */
.open-modal {
  display: block;
  margin: 0 auto;
}
@media screen and (max-width: 768px) {
  .container {
    padding-top: 1.5rem;
  }
  .btn-close {
    --close: 0.05em;

    width: 2rem;
    height: 2rem;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
