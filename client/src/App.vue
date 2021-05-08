<template>
  <div>
    <Navbar />

    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: { Navbar },
  created() {
    this.$store.dispatch("loadData");
  }
};
</script>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:root {
  --body-clr: 0 0% 96%;
  --txt-clr: 0 0% 13%;
  --clr1: 150 50% 35%;

  /* width */
  --menu-width: 20rem;

  /* TRANSITIOIN */
  --duration: .3s;

  /* FONT */
  --fm: "Roboto", sans-serif;
}
html.alt-color-mode:root {
  --body-clr: 0 0% 13%;
  --txt-clr: 0 0% 94%;
  --clr1: 150 50% 50%;
}
body {
  overflow-x: hidden;
  background-color: hsl(var(--body-clr));
  font-family: var(--fm);
  color: hsl(var(--txt-clr));
  transition: background-color var(--duration), transform var(--duration);
}
body.menu-open {
  transform: translate3d(var(--menu-width), 0, 0);
}
h1 {
  margin-bottom: 1em;
  text-align: center;
}
h2 {
  margin-bottom: 1.25em;
}
.hidden {
  overflow: hidden;
}
.container {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
}
main.container {
  min-height: calc(100vh - 10rem);
  margin-top: 2rem;
  padding: 1.5rem;
  box-shadow: 0 .25rem 1rem rgb(25 25 25 / .15);
}
/* INPUTS */
.form-control {
  --radius: .2em;

  cursor: text;
  width: 100%;
  position: relative;
  border-radius: var(--radius);
}
.form-control::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  box-shadow: 0 0 0 .2rem hsl(var(--clr1) / .9);
  border-radius: var(--radius);
  opacity: 0;
}
.form-control:focus-within::after {
  opacity: 1;
}
input[type="text"],
textarea {
  display: block;
  width: 100%;
  padding: .75em 1.5em;
  border-radius: var(--radius);
  font-size: 1rem;
  font-family: var(--fm);
}
/* BUTTONS */
.btn {
  cursor: pointer;
  padding: .75em 1.75em;
  border: none;
  border-radius: .2em;
  outline: none;
  background-color: hsl(var(--clr1));
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1rem;
  color: hsl(var(--body-clr));
}
.btn:focus {
  box-shadow: 0 0 0 .25em hsl(var(--clr1) / .8);
}
.btn:active {
  background-color: hsl(var(--clr1) / .9);
}
.btn-link {
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1rem;
}
.btn-link:hover {
  text-decoration: underline;
}
.btn-link.success {
  color: green;
}
.btn-link.danger {
  color: red;
}
</style>
