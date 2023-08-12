<template>
  <ModalProvider>
    <RouterView />
  </ModalProvider>
</template>

<script>
import { RouterView } from "vue-router";
import { ModalProvider } from "vue-modal-provider";

import Header from "@/components/Header/Header.vue";
import SideBaar from "@/components/SideBaar.vue";
import axios from "axios";
import store from "./store";

export default {
  name: "App",
  components: {
    Header,
    SideBaar,
    // SidebarMenu
  },
  props: {},
  data() {
    return {
      menu: [
        {
          header: "Knee Xpert",
          hiddenOnCollapse: true,
        },
        {
          href: "/Home",
          title: "Home",
          icon: "fa fa-home",
        },
      ],
    };
  },

  beforeCreate() {
    this.$store.commit("initializeStore");
    const token = this.$store.state.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      axios.defaults.headers.common["Content-Type"] = "application/json";
      const axiosInstance = axios.create({
        baseURL: "https://develop.kneexpert.in/api/method/",
        headers: {
          Authorization: "token c08c55d4d0e5d70:613ee1c0980d513",
        },
      });
    } else {
      this.$router.push("/login");
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
};
</script>

<style lang="scss">
:root {
  --primary: #2bb0ce;
  --primary-alt: #39549a;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-all: #2bb0ce;
  --sidebar-width: 250px;
  --light-kx: #2bb0ce;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Fira sans", sans-serif;
}

#app {
  font-family: Verdana, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  // display: flex;
}

.content {
  margin-left: 50px;
}

#content {
  margin-left: 50px;
  margin-top: 50px;
}

.kx-nav {
  max-height: 50px;
  background-color: var(--primary);
  margin-left: -3.2rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;

  .nav-link {
    color: white;
  }
}

.right {
  color: red;
}

#HipRight {
  background-color: #fa8991;
  border-color: #fcbcc2;
}

#KneeRight {
  background-color: #fa8991;
  border-color: #fcbcc2;
}

.left {
  color: blue;
}

.loader {
  color: #36549b59;
  text-align: center;
  margin-left: 35rem;
  margin-top: 15rem;
  padding: 2rem;
}
</style>
