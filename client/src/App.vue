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
  --clr1: #069;

  /* width */
  --menu-width: 20rem;

  /* TRANSITIOIN */
  --duration: .3s;
}
html.alt-color-mode:root {
  --body-clr: #222;
  --txt-clr: #EFEFEF;
  --clr1: #069;
}
body {
  overflow-x: hidden;
  background-color: var(--body-clr);
  font-family: "Roboto", sans-serif;
  color: var(--txt-clr);
  transition: background-color var(--duration), transform var(--duration);
}
body.menu-open {
  transform: translate3d(calc(var(--menu-width) * -1), 0, 0);
}
.container {
  max-width: 1300px;
  margin: 0 auto;
}
main.container {
  margin-top: 2rem;
  padding: 1.5rem;
  box-shadow: 0 .25rem 1rem rgb(25 25 25 / .15);
}
</style>
