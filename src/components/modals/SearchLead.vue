<template>
  <div class="modal-mask" v-if="show">
    <div class="modal-container rounded">
      <div class="modal-header">
        <h3 class="modal-title fs-5" id="exampleModalLabel">Search Lead</h3>

        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal-mask"
          aria-label="Close"
          @click="$emit('close')"
        ></button>
      </div>
      <div class="modal-body">
        <div class="row mt-4">
          <div class="col">
            <input class="form-control" type="text" v-model="search_lead" />
            <small id="emailHelp" class="form-text text-muted"
              >Note: Use +91 before mobile mobile number</small
            >
          </div>
        </div>
        <div class="row mt-4">
          <p>{{ res_message }}</p>
          <div class="col">
            <table class="table table-hover" v-if="dataitems.length > 0">
              <thead>
                <tr>
                  <td scope="col">Select</td>
                  <td scope="col">Mobile</td>
                  <td scope="col">Patient Name</td>
                  <td scope="col">Action</td>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in dataitems">
                  <input type="checkbox" @click="selectcenter(item)" />
                  <td scope="row">{{ item.name }}</td>
                  <td scope="row">{{ item.patient_full_name }}</td>
                  <td scope="row">
                    <a
                      class="text-success kx-button"
                      @click="$router.push('/lead/' + item.name)"
                    >
                      <i class="fas fa-edit"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
          class="btn btn-sm btn-primary mt-2"
          :disabled="search_lead.length < 13"
          @click="SearchLead()"
        >
          <i class="fa fa-search" aria-hidden="true"></i> Search
        </button>
      </div>
    </div>
  </div>
  <ModalSuccess
    @success="ShowSuccessModel = true"
    @close="ShowSuccessModel = false"
    :show="ShowSuccessModel"
    msg="X Ray Sent Successfully"
  />
</template>

<script>
import axios from "axios";
import Multiselect from "@vueform/multiselect";
import ModalSuccess from "@/components/modals/ModalSuccess.vue";
export default {
  name: "SearchLead",
  components: { Multiselect, ModalSuccess },
  props: {
    msg: String,
    show: false,
    exercise_options: [],

    Knee_lead: "",
  },
  mounted() {},
  data() {
    return {
      ShowSuccessModel: false,
      whatsapp_templates: [],
      center_list: [],
      selected_centers: [],
      selectedtherapyplan: [],
      name: "",
      mobile: "",
      exercise_req: "",
      selected: "",
      options: [],
      whatsapp_template: "",
      roles: [],

      doctype: "Knee Lead",
      user: this.selected,
      read: "0",
      write: "0",
      submit: "0",
      share: "0",
      everyone: "0",
      notify: "0",
      xray_records: [],
      xray_files: [],
      therapy_plan_template: [],
      lead_basic_details: [],
      search_lead: "",
      dataitems: [],
      res_message: "",
      loading: false,
    };
  },
  methods: {
    share_doc: async function () {
      const formdata = {
        doctype: this.doctype,
        name: this.Knee_lead,
        user: this.selected,
        read: this.read,
        write: this.write,
        submit: this.submit,
        share: this.share,
        everyone: this.everyone,
        notify: this.notify,
      };

      this.loading = !false;
      await axios
        .post("knee_lead.docshare.share_lead", formdata)
        .then((response) => {
          this.loading = false;
        })
        .catch((error) => {});
    },
    SearchLead: async function () {
      this.loading = !false;

      var formdata = JSON.stringify({
        mobile: this.search_lead,
      });

      await axios
        .get("knee_lead.api.get_single_knee_lead", {
          params: {
            mobile: this.search_lead,
          },
        })
        .then((response) => {
          this.loading = false;
          if (response.data.status_code == "200") {
            this.dataitems = response.data.data;
            // this.$router.push("/lead/" + response.data.data[0].name);
            this.res_message = response.data.message;
          } else {
            this.res_message = response.data.message;
          }
        })
        .catch((error) => {});
    },

    get_whatsapp_details: async function (e) {
      this.options = [];
      let url = "";

      if (e == "share_xray_camp") {
        this.get_xray_record();
      }
      if (e == "excercise_erp_hindi") {
        this.get_therapy_plan();
      }

      if (e == "knee_xray_position") {
      }

      if (e == "center_details") {
        url = "knee_lead.api.get_center_list";

        await axios
          .get(url)
          .then((response) => {
            let res_data = response.data.data[0];
            this.center_list = response.data.data[0];
            this.options = [];
            for (let x in res_data) {
              this.options.push(res_data);
            }
          })
          .catch((error) => {});
      }
    },

    get_whatsapp_templates: async function () {
      await axios
        .get("knee_lead.whatsapp.fetch")
        .then((response) => {
          let res_data = response.data.message.data;
          for (let i in res_data) {
            this.whatsapp_templates.push(res_data[i].name);
          }
        })
        .catch((error) => {});
    },
    get_therapy_plan: async function () {
      await axios
        .get("knee_lead.api.get_therapy_plan_template")
        .then((response) => {
          this.therapy_plan_template = response.data.data;
        })
        .catch((error) => {});
    },

    get_xray_record: async function () {
      await axios
        .get("knee_lead.api.get_direct_xray", {
          params: {
            knee_lead_id: this.$route.params.id,
          },
        })
        .then((response) => {
          this.xray_records = response.data.data;
        })
        .catch((error) => {});
    },

    selectfile: function (e) {
      this.xray_files.push(e);
    },
    selectcenter: function (e) {
      this.selected_centers.push(e);
    },
    selecttherapyplan: function (e) {
      this.selectedtherapyplan.push(e);
    },
    get_profile_by_knee_lead: async function () {
      await axios
        .get("knee_lead.api.get_profile_by_knee_lead", {
          params: {
            mobile: this.$route.params.id,
          },
        })
        .then((response) => {
          this.lead_basic_details = response.data.data;
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
  max-width: 50%;
}

.modal {
  display: block !important; /* I added this to see the modal, you don't need this */
}

/* Important part */
.modal-dialog {
  overflow-y: initial !important;
}
</style>
