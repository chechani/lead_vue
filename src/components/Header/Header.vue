<template>
  <head>
    <meta charset="utf-8" />
    <link
      rel="shortcut icon"
      type="image/png"
      href="https://lead.kneexpert.in/files/Fevicon.png"
    />
    <title>Knee Lead</title>
  </head>
  <header @add="ShowModel = true">
    <nav class="navbar navbar-expand-lg navbar-light kx-nav">
      <div class="container-fluid">
        <div class="col-sm-9">
          <a class="navbar-brand" href="#">
            <img style="margin-top: 7px;"
              alt="Knee Xpert Logo"
              height=""
              class="kx-brand-logo"
              src="../../assets/img/smartylogo.png"
            />
          </a>
        </div>
        <div class="col-sm-1 log-out-btn">
          <button
            class="kx-logout-button"
            style="margin-right: 2rem"
            @click.prevent="fetch_user_lead()"
          >
            <i class="fa fa-cloud-download" aria-hidden="true"></i>
          </button>
          <button class="kx-logout-button" @click.prevent="search_lead_fn()">
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>

        <!-- search_lead_fn -->
        <div class="col-sm-1 log-out-btn">
          <div class="dropdown">
            <button
              class="dropdown-toggle kx-logout-button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ username }} <i class="fa fa-power-off" aria-hidden="true"></i>
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#" @click.prevent="logout">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <FetchLeadModel
      @add="ShowFetchModel = true"
      @close="ShowFetchModel = false"
      :show="ShowFetchModel"
      :Knee_lead="Knee_lead_id"
      msg="TIkam"
    />

    <SearchLead
      @add="ShowSearchModel = true"
      @close="ShowSearchModel = false"
      :show="ShowSearchModel"
      :Knee_lead="Knee_lead_id"
      msg="TIkam"
    />
  </header>
</template>
<script>
import axios from "axios";
import Header from "@/components/Header/Header.vue";
import FetchLeadModel from "@/components/modals/FetchLeadModel.vue";
import SearchLead from "@/components/modals/SearchLead.vue";
import SideBaar from "@/components/SideBaar.vue";

export default {
  name: "Header",
  components: {
    FetchLeadModel,
    SearchLead,
  },
  mounted() {
    this.username = localStorage.getItem("full_name");
  },
  props: {
    msg: String,
    username: "",
  },
  data() {
    return {
      username: localStorage.getItem("full_name"),
      ShowFetchModel: false,
      ShowSearchModel: false,
    };
  },
  methods: {
    logout: function () {
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.clear();
      this.$router.push("/login");
    },
    fetch_user_lead: function () {
      this.ShowFetchModel = !this.ShowFetchModel;
    },
    search_lead_fn: function () {
      this.ShowSearchModel = !this.ShowSearchModel;
    },
  },
};
</script>

<style>
.kx-brand-logo {
  height: 35px;
}

.log-out-btn {
  margin-right: 1rem;
}
.kx-logout-button {
  /* height :25px; */
  background: none;
  border: none;
  color: #ffff;

  /* padding: 1rem; */
}
</style>
