<template>
  <div class="modal-mask" v-if="show">
    <div class="modal-container">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Fetch Leads</h1>

        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal-mask"
          aria-label="Close"
          @click="$emit('close')"
        ></button>
      </div>
      <div class="modal-body">
        <div class="input-group mt-2 mb-2">
          <input
            type="text"
            class="form-control"
            v-model="mobile"
            placeholder="Mobile"
          />
        </div>
        <small id="emailHelp" class="form-text text-muted"
          >Note: Use +91 before fetch mobile number</small
        >
        <span class="info">
          <p class="text-success">{{ response_message }}</p>
        </span>
      </div>
      <div class="modal-footer">
        <div
          v-if="loading"
          class="spinner-border text-primary"
          style="float: left"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
        <button
          type="button"
          class="btn btn-primary"
          :disabled="mobile.length < 10"
          @click="fetch_lead_data"
          style="float: right; margin-left: 10px"
        >
          <i class="fa fa-cloud-download" aria-hidden="true"></i>
          Fetch
        </button>
        <button
          type="button"
          class="btn btn-primary"
          :disabled="!mobile"
          @click="fetch_lead_data_edit"
          style="float: right; margin-left: 10px"
        >
          <i class="fa fa-cloud-download" aria-hidden="true"></i>
          Fetch & Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FetchLeadModel",
  props: {
    msg: String,
    show: false,
    investigation_req_options: [],
    Knee_lead: "",
  },
  mounted() {},
  data() {
    return {
      loading: false,
      name: "",
      mobile: "",
      ShowFetchModel: "",
      response_message: "",
      session_user_email: JSON.parse(localStorage.getItem("role")),
    };
  },
  methods: {
    fetch_lead_data: async function () {
      this.loading = !false;
      await axios
        .get("knee_lead.api.post_new_lead", {
          params: {
            name: this.mobile,
            user: this.session_user_email[0].name,
          },
        })
        .then((response) => {
          this.response_message = response.data.message.message;
          this.loading = false;
        })
        .catch((error) => {});
    },
    fetch_lead_data_edit: async function () {
      this.loading = !false;
      await axios
        .get("knee_lead.api.post_new_lead", {
          params: {
            name: this.mobile,
            user: this.session_user_email[0].name,
          },
        })
        .then((response) => {
          this.loading = false;

          if (response.data.message.status_code == "200") {
            this.$router.push("/lead/" + "+91" + this.mobile);
            this.$emit("close");
          }
          this.response_message = response.data.message.message;
        })
        .catch((error) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(8, 0, 8, 0.4);
  z-index: 2;
  display: grid;
  place-items: center;
}

.modal-container {
  background: white;
  padding: 1rem;
  width: 80vw;
  max-width: 500px;
}
</style>
