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
  components: { Navbar }
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
  --body-clr: #F5F5F5;
  --txt-clr: #222;
  --clr1: 150 50% 35%;

  /* width */
  --menu-width: 20rem;

  /* TRANSITIOIN */
  --duration: .3s;

  /* FONT */
  --fm: "Roboto", sans-serif;
}
html.alt-color-mode:root {
  --body-clr: #222;
  --txt-clr: #EFEFEF;
  --clr1: 150 50% 50%;
}
body {
  overflow-x: hidden;
  background-color: var(--body-clr);
  font-family: var(--fm);
  color: var(--txt-clr);
  transition: background-color var(--duration), transform var(--duration);
}
body.menu-open {
  transform: translate3d(var(--menu-width), 0, 0);
}
.container {
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
input[type="text"],
textarea {
  display: block;
  width: 100%;
  padding: .75em 1.5em;
  border: 1px solid #ccc;
  border-radius: .2em;
  outline: none;
  font-size: 1rem;
  font-family: var(--fm);
}
input[type="text"]:focus,
textarea:focus {
  box-shadow: 0 0 0 .2rem hsl(var(--clr1) / .9);
}

/* BUTTONS */
.btn {
  cursor: pointer;
  padding: .5em 1.75em;
  border: none;
  border-radius: .2em;
  outline: none;
  background-color: hsl(var(--clr1));
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1rem;
  color: var(--body-clr);
}
.btn:focus {
  box-shadow: 0 0 0 .25em hsl(var(--clr1) / .8);
}
.btn:active {
  background-color: hsl(var(--clr1) / .9);
}
</style>
