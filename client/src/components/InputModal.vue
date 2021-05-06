<template>
  <div>
    <div class="modal" v-if="open">
      <div class="overlay" @click="toggleModal"></div>

      <div class="container">
        <form class="form-inline" @submit.prevent="add">
          <div class="form-control">
            <input
              type="text"
              placeholder="What needs to be done?"
              class="input-text"
              v-model="task.title"
            />
          </div>
          <button type="submit" class="btn">
            <span v-if="!loading">Add</span>
            <span class="loader" v-if="loading"></span>
          </button>
        </form>

        <button class="btn-close" @click="toggleModal">
          <span></span>
        </button>
      </div>
    </div>

    <button
      type="button"
      class="btn open-modal"
      @click="toggleModal"
    >
      Add
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "InputModal",
  data() {
    return {
      open: false,
      task: {}
    };
  },
  computed: {
    ...mapState(["loading"])
  },
  methods: {
    ...mapActions(["addTask"]),
    toggleModal() {
      this.open = !this.open;
    },
    add() {
      if (!this.task.title || this.task.title.trim() == "")
        return alert("What needs to be done?");

      this.addTask(this.task);

      this.task = {};
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
  z-index: 1;
}
.overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: hsl(var(--txt-clr) / .5);
}
.container {
  max-width: 30rem;
  padding: 1rem;
  position: relative;
  border-radius: 0.25rem;
  background-color: hsl(var(--body-clr));
  box-shadow: 0 .25rem 1rem rgb(0 0 0 / .15);
}
.form-inline {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.form-inline .btn[type="submit"] {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5.7rem;
  height: 2.625rem;
  position: relative;
}
.btn-close {
  --close: 0.075em;

  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  top: 0;
  right: 0;
  border: var(--close) solid hsl(var(--txt-clr));
  border-radius: 50%;
  box-shadow: 0 0 0 var(--close) hsl(var(--body-clr));
  transform: translate3d(50%, -50%, 0);
  background: hsl(var(--body-clr));
  font-size: 3rem;
}
.btn-close span,
.btn-close span::before {
  width: 80%;
  height: var(--close);
  position: relative;
  border-radius: 0.145rem;
  background-color: hsl(var(--txt-clr));
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
  background-color: hsl(var(--txt-clr));
}
/* ------- */
.open-modal {
  display: block;
  margin: 0 auto;
}

/* loader */
.loader::before {
  content: "";
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  border: .25em solid #FFF;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: loader 1.2s infinite;
}
@keyframes loader {
  to {
    transform: rotate(360deg);
  }
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
