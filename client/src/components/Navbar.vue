<template>
  <header class="header">
    <nav class="header__nav container">
      <a href="/">
        <img src="@/assets/brand.png" alt="Brand" class="header__brand">
      </a>

      <button class="header__toggler" @click="toggleMenu($event)" target="#menu">
        <i class="fas fa-bars"></i>
      </button>

      <ul class="header__menu" id="menu">
        <li
          class="header__item"
          v-for="(link, index) in links" :key="index"
        >
          <router-link :to="link.path" class="header__link">{{ link.name }}</router-link>
        </li>

        <li class="header__item">
          <button
            type="button" class="toggle-dark"
            @click="toggleDark"
          >
            <i class="fas fa-adjust"></i>
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      links: [
        {
          name: "Home",
          path: "/"
        },
        {
          name: "Favorites",
          path: "/favorites"
        },
        {
          name: "Manage",
          path: "/manage"
        }
      ]
    }
  },
  methods: {
    toggleMenu(e) {
      const toggler = e.target.classList.contains("header__toggler")
        ? e.target
        : e.target.parentElement;
      const target = toggler.getAttribute("target");
      const menu = document.querySelector(target);

      menu.classList.toggle("open");
      document.body.classList.toggle("menu-open");
    },
    toggleDark() {
      document.querySelector("html").classList.toggle("alt-color-mode");
    }
  },
  mounted() {
    addEventListener("resize", toggleMenuBehavior);

    const dom = {
      toggler: ".header__toggler",
      menu: ".header__menu",
      style: "style#menuBehavior"
    };

    const menuClasses = {
      menu: "open",
      body: "menu-open"
    };

    function toggleMenuBehavior() {
      const menu = document.querySelector(dom.menu);

      // MAX-WIDTH OF THE RESPONSIVENESS
      if (innerWidth > 768) {
        if (menu.classList.contains(menuClasses.menu))
          menu.classList.remove(menuClasses.menu);

        if (document.body.classList.contains(menuClasses.body))
          document.body.classList.remove(menuClasses.body);

        return;
      }

      const toggler = document.querySelector(dom.toggler);

      const menuWidth = menu.getBoundingClientRect().width;
      const togglerFromRight = innerWidth - toggler.getBoundingClientRect().right + toggler.getBoundingClientRect().width;

      if (innerWidth > menuWidth + togglerFromRight && !menu.classList.contains(menuClasses.menu)) {
        if (document.querySelector(dom.style))
          document.querySelector(dom.style).remove();

        return;
      }

      if (document.querySelector(dom.style) || menu.classList.contains(menuClasses.menu)) return;

      // STYLE ELEMENT
      const style = document.createElement("style");

      style.textContent = `
        .header__menu.open {
          transform: translate3d(calc(var(--menu-width) * -1), 0, 0);
        }
        body.menu-open {
          transform: translate3d(0, 0, 0);
        }
      `;
      style.id = "menuBehavior";

      document.body.appendChild(style);
    }

    toggleMenuBehavior();
  }
}
</script>

<style scoped>
.header {
  padding: .5rem 5rem;
  box-shadow: 0 .1rem .5rem rgb(25 25 25 / .15);
  background-color: var(--body-clr);
  transition: background-color var(--duration);
}
.header__nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header__brand {
  max-width: 5rem;
  max-height: 5rem;
}
.header__toggler,
.toggle-dark {
  cursor: pointer;
  outline: none;
  border: none;
  background: none;
}
.header__toggler {
  display: none;
  font-size: 2rem;
}
.header__menu {
  list-style: none;
  display: flex;
  align-items: center;
}
.header__item {
  margin: 0 1.5em;
}
.header__link {
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 500;
  color: inherit;
}
.header__link.actived {
  text-decoration: underline;
}
.header__link:hover {
  text-decoration: underline;
}
.toggle-dark {
  margin-left: 2rem;
  font-size: 1.5rem;
}
.header__toggler .fas,
.toggle-dark .fas {
  color: var(--txt-clr);
}
@media screen and (max-width: 768px) {
  .header__toggler {
    display: block;
    z-index: 1;
  }
  .header__menu {
    flex-direction: column;
    width: 100%;
    max-width: var(--menu-width);
    height: 100vh;
    padding: 1rem;
    position: absolute;
    top: 0;
    right: calc(var(--menu-width) * -1);
    background-color: var(--body-clr);
    box-shadow: -.1rem 0 .5rem rgb(25 25 25 / .15);
    transition: transform var(--duration), background-color var(--duration);
  }
  .header__item:first-child,
  .header__item:last-child {
    margin-top: auto;
  }
  .header__item {
    margin: .5em 0;
  }
  .header__link {
    padding: .5em;
  }
  .toggle-dark {
    margin-left: 0;
  }
}
@media screen and (max-width: 360px) {
  .header {
    padding: .5rem 2rem;
  }
  .header__brand {
    max-width: 4rem;
    max-height: 4rem;
  }
}
</style>
