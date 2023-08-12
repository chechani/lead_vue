<template>
  <aside :class="[is_expanded ? 'is_expanded' : 'red']">
    <div class="menu">
      <router-link class="button" to="/dashboard">
        <i class="fa fa-home" aria-hidden="true"></i>
        <span class="text"> Home</span>
      </router-link>
      <router-link class="button" to="/lead">
        <i class="fa fa-list-alt" aria-hidden="true"></i>
        <span class="text"> Lead</span>
      </router-link>
      <!-- SharedLead -->
      <router-link class="button" to="/SharedLead">
        <i class="fa fa-share-square" aria-hidden="true"></i>
        <span class="text"> SharedLead</span>
      </router-link>
      <router-link class="button" @click="openmodal" to="">
        <i class="fa fa-plus-circle" aria-hidden="true"></i>
        <span class="text"> add</span>
      </router-link>
    </div>
  </aside>
  <NewLeadPopupModel
    @add="ShowModel = true"
    @close="ShowModel = !this.ShowModel"
    :show="ShowModel"
  />
</template>

<script>
import { ref } from "vue";
import NewLeadPopupModel from "@/components/modals/NewLeadModal.vue";

export default {
  name: "SideBar",
  components: {
    NewLeadPopupModel,
  },

  setup() {
    const sidebarCollapsed = ref(false);

    function toggleSidebar() {
      sidebarCollapsed.value = !sidebarCollapsed.value;
    }

    return {
      sidebarCollapsed,
      toggleSidebar,
    };
  },

  data() {
    return {
      // is_expanded: ref(false),
      is_expanded: false,
      password: "",
      ShowModel: false,
    };
  },
  methods: {
    ToggleMenu: function () {
      this.is_expanded = !this.is_expanded;
    },
    openmodal: function () {
      this.ShowModel = !this.ShowModel;
    },
  },
};
</script>

<style lang="scss" scoped>
// New sideBar

.custom-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f2f2f2;
}

.sidebar {
  width: 200px;
  height: 100%;
  background-color: #e6e6e6;
  transition: all 0.3s ease-in-out;
}

.sidebar-collapsed {
  width: 60px;
}

.main-content {
  display: flex;
  float: left;
  /* justify-content: center; */
  align-items: center;
  padding: 10px;
  width: auto;
}

.page-main {
  padding: 10px;
  height: auto;
  overflow: hidden;
}

.page-content {
  background-color: red;
  width: auto;
  overflow: hidden;
}

.page-side {
  float: left;
  width: 200px;
  background-color: green;
}

.page-side-collapsed {
  width: 60px;

  // transform: translateX(0.5rem);
  color: var(--light-kx);
  transition: 0.2s ease-out;
  .menu-toggle {
    transition: 0.2s ease-out;
    background: none;
    color: white;
    border: none;
    padding: 1rem;

    &:hover {
      transform: translateX(0.5rem);
      color: var(--light-kx);
      transition: 0.2s ease-out;
      margin-left: 1rem;
    }
  }
}
// end New sideBar

aside {
  height: 100%;
  width: calc(2rem + 15px);
  position: fixed;
  z-index: 1;
  top: 2rem;
  left: 0;
  background-color: var(--primary);
  color: var(--light);
  overflow-x: hidden;
  transition: 0.2s ease-out;
  padding-top: 60px;
  padding: 1rem;

  .logo {
    margin-bottom: 1rem;
    margin-top: 1rem;
    img {
      width: 2rem;
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    x-index: 99;
  }
  .brand {
    color: white;
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin: 1rem;
    position: relative;
    top: 0rem;
    transition: 00.2s ease-out;

    .menu-toggle {
      display: none;
      transition: 0.2s ease-out;
      background: none;
      color: white;
      border: none;

      &:hover {
        .svg-inline--fa {
          transform: translateX(0.5rem);
          color: var(--light-kx);
          transition: 0.2s ease-out;
          // margin-left: 1rem;
        }
      }
    }
  }

  h6 .button .text {
    opacity: 0;
    transition: 0.3s ease-out;
  }
  .menu {
    // margine: 0 -1rem;
    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 0.5rem 1rem;
      transition: 00.2s ease-out;
      margin-left: -1rem;

      &:hover {
        background-color: var(--light-kx);
      }
    }
    .svg-inline--fa {
      font-size: 1rem;
      color: white;
      transition: 0.2s ease-out;
      // margin-left: -2rem;
      // margin-right: 1rem;
    }
    .text {
      color: white;
      transition: 0.2s ease-out;
      margin-left: 1rem;
    }
  }
}

.is_expanded {
  width: var(--sidebar-width);
  // width: 330px;
  .menu-toggle-wrap {
    // top: -2rem;
    // top: 0rem;
    .menu-toggle {
      transform: rotate(-180deg);
    }
  }

  .topbar {
    width: 900px;
  }
}

.topbar {
  width: 1050px;
}
</style>
