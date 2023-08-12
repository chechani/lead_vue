  <template>
    <div class="modal-mask" v-if="show">
      <div class="modal-container rounded">
        <div class="modal-header">
          <h3 class="modal-title fs-5" id="exampleModalLabel">
            Send WhatsApp to <strong> {{ Knee_lead }} </strong>
          </h3>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal-mask"
            aria-label="Close"
            @click="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <label class="form-check-label" for="Group"
                >WhatsApp Template</label
              >
              <Multiselect
                id="Group"
                v-model="whatsapp_template"
                :options="whatsapp_templates"
                :searchable="true"
                @change="get_whatsapp_details($event)"
              >
              </Multiselect>
            </div>
            <div class="col-sm-6">
              <label class="form-check-label" for="users">{{
                whatsapp_template
              }}</label>
              <Multiselect
                id="users"
                v-model="selected"
                :options="options"
                :searchable="true"
              >
              </Multiselect>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col" v-if="whatsapp_template == 'center_details'">
              <table class="table table-hover" v-if="center_list.length > 0">
                <thead>
                  <tr>
                    <td scope="col">Select</td>
                    <td scope="col">Center</td>
                    <td scope="col">Coordinator</td>
                  </tr>
                </thead>

                <tbody>
                  <!-- <tr v-for="item in selected"> -->
                  <tr v-for="item in center_list">
                    <input type="checkbox" @click="selectcenter(item)" />
                    <td scope="row">{{ item.center_name }} <br /></td>
                    <td scope="row">{{ item.coordinator_name }} <br /></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="col" v-if="whatsapp_template == 'camp_xray_share'">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <td scope="col">Select</td>
                    <td scope="col">Type</td>
                    <td scope="col">File</td>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="item in xray_records">
                    <td scope="row">
                      <input type="checkbox" @click="selectfile(item)" />
                    </td>
                    <td scope="row">{{ item.type }}</td>
                    <td scope="row">
                      <img
                        v-bind:src="'https://lead.kneexpert.in' + item.xray"
                        alt="Xray Image"
                        width="50"
                        height="60"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col" v-if="whatsapp_template == 'excercise_erp_hindi'">
              <!-- excercise_erp_hindi -->
              <table
                class="table table-hover"
                v-if="therapy_plan_template.length > 0"
              >
                <thead>
                  <tr>
                    <td scope="col">Select</td>
                    <td scope="col">Therapy Template</td>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="item in therapy_plan_template">
                    <input type="checkbox" @click="selecttherapyplan(item)" />
                    <td scope="row">{{ item.name }} <br /></td>
                    <td scope="row">{{ item.coordinator_name }} <br /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col" v-else>
              <table class="table table-hover" v-if="whatsapp_template">
                <thead>
                  <tr>
                    <td scope="col">whatsapp_template</td>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>{{ whatsapp_template }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-sm btn-primary mt-2"
            @click="
              send_whatsapp();
              $emit('close');
            "
          >
            <i class="fas fa-share"></i> Send WhatsApp
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
    <ModelFail
      @success="ShowFailedModel = true"
      @close="ShowFailedModel = false"
      :show="ShowFailedModel"
      msg="Faild to Send"
    />
  </template>

  <script>
  import axios from "axios";
  import Multiselect from "@vueform/multiselect";
  import ModalSuccess from "@/components/modals/ModalSuccess.vue";
  import ModelFail from "@/components/modals/ModelFail.vue";
  export default {
    name: "ModalWaShare",
    components: { Multiselect, ModalSuccess, ModelFail },
    props: {
      msg: String,
      show: false,
      exercise_options: [],

      Knee_lead: "",
    },
    mounted() {
      this.get_whatsapp_templates();
      this.get_profile_by_knee_lead();
      this.get_xray_record();
    },
    data() {
      return {
        ShowSuccessModel: false,
        ShowFailedModel: false,
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
        whatsapp_no: "",
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
          .then((response) => {})
          .catch((error) => {});
      },

      get_whatsapp_details: async function (e) {
        this.options = [];
        let url = "";

        if (e == "share_xray_camp") {
        }
        if (e == "excercise_erp_hindi") {
          this.get_therapy_plan();
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
          .get("knee_lead.double_tick_whatsapp.get_double_tick_templates")
          .then((response) => {
            let res_data = response.data.message;
            for (let i in res_data) {
              let res = this.split_characters(res_data[i].name);

              let data_push = { value: res_data[i].name, label: res };
              this.whatsapp_templates.push(data_push);
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
      send_whatsapp: async function () {
        if (this.whatsapp_template == "engish_hindi_xray_upload_v2") {
          var component = [];

          for (let x in this.lead_basic_details) {
            component.push(this.lead_basic_details[x].patient_full_name);
            component.push(this.lead_basic_details[x].age);
            component.push(this.lead_basic_details[x].patient_full_name);
            component.push(this.lead_basic_details[x].age);
          }

          const formdata = {
            mobile: this.$route.params.id,

            template: this.whatsapp_template,
            media_url:
              "https://quickscale-template-media.s3.ap-south-1.amazonaws.com/org_zB8VElqjQx/86e03bb0-3646-451f-b7d4-c2275e8bd2bd.jpeg",
            language: "en",
            media_type: "IMAGE",
            components: component,
            button_type: "QUICK_REPLY",
            button_name: "एक्स-रे भेजे",
          };

          await axios
            .post(
              "knee_lead.double_tick_whatsapp.send_whatsapp_with_buttons",
              formdata
            )
            .then((response) => {
              if (response.status == "200") {
                this.ShowSuccessModel = true;
              }
            })
            .catch((error) => {});
        } else if (this.whatsapp_template == "hindi_xray_video_upload") {
          var component = [];

          for (let x in this.lead_basic_details) {
            component.push(this.lead_basic_details[x].patient_full_name);
            component.push(this.lead_basic_details[x].age);
            component.push("https://www.youtube.com/watch?v=cUfDLxDbMEw");
            component.push("https://www.youtube.com/watch?v=F990AaZ6cTg");
          }

          const formdata = {
            mobile: this.$route.params.id,

            template: this.whatsapp_template,
            media_url:
              "https://lead.kneexpert.in/files/KneetreatmentYoutubeThumbnail.jpg",
            language: "hi",
            media_type: "IMAGE",
            components: component,
            button_type: "QUICK_REPLY",
            button_name: "एक्स-रे भेजे",
          };

          await axios
            .post(
              "knee_lead.double_tick_whatsapp.send_whatsapp_with_buttons",
              formdata
            )
            .then((response) => {
              if (response.status == "200") {
                this.ShowSuccessModel = true;
              }
            })
            .catch((error) => {});
        } else if (this.whatsapp_template == "hindi_xray_upload") {
          var component = [];

          for (let x in this.lead_basic_details) {
            component.push(this.lead_basic_details[x].patient_full_name);
            component.push(this.lead_basic_details[x].age);
          }

          const formdata = {
            mobile: this.$route.params.id,

            template: this.whatsapp_template,
            media_url:
              "https://lead.kneexpert.in/files/KneetreatmentYoutubeThumbnail.jpg",
            language: "hi",
            media_type: "IMAGE",
            components: component,
            button_type: "QUICK_REPLY",
            button_name: "एक्स-रे भेजे",
          };

          await axios
            .post(
              "knee_lead.double_tick_whatsapp.send_whatsapp_with_buttons",
              formdata
            )
            .then((response) => {
              if (response.status == "200") {
                this.ShowSuccessModel = true;
              }
            })
            .catch((error) => {});
        }
        //
        else if (this.whatsapp_template == "kl_exercise_new") {
          let exercises = this.selectedtherapyplan[0].exercise;
          var component = [];

          for (let x in this.lead_basic_details) {
            component.push(this.lead_basic_details[x].patient_full_name);
            component.push(this.lead_basic_details[x].age);
          }
          for (let x in exercises) {
            component.push(exercises[x].youtube_url);

            component.push(exercises[x].no_of_days.toString());
            component.push(exercises[x].frequency_per_day.toString());
            component.push(exercises[x].repetition_per_session.toString());
          }

          const formdata = {
            mobile: this.$route.params.id,

            template: this.whatsapp_template,
            media_url:
              "https://lead.kneexpert.in/files/KneetreatmentYoutubeThumbnail.jpg",
            language: "hi",
            media_type: "IMAGE",
            components: component,
            button_type: "QUICK_REPLY",
            button_name: "संपर्क करे",
          };

          await axios
            .post(
              "knee_lead.double_tick_whatsapp.send_whatsapp_with_buttons",
              formdata
            )
            .then((response) => {
              if (response.status == "200") {
                this.ShowSuccessModel = true;
                this.exercises = [];
              }
            })
            .catch((error) => {});
        } else if (this.whatsapp_template == "excercise_erp_hindi") {
          let exercises = this.selectedtherapyplan[0].exercise;
          var component = [];

          for (let x in this.lead_basic_details) {
            component.push(this.lead_basic_details[x].patient_full_name);
            component.push(this.lead_basic_details[x].age);
          }
          for (let x in exercises) {
            component.push(exercises[x].youtube_url);

            component.push(exercises[x].no_of_days.toString());
            component.push(exercises[x].frequency_per_day.toString());
            component.push(exercises[x].repetition_per_session.toString());
          }

          const formdata = {
            mobile: this.$route.params.id,
            template: this.whatsapp_template,
            media_url:
              "https://lead.kneexpert.in/files/KneetreatmentYoutubeThumbnail.jpg",
            language: "hi",
            media_type: "IMAGE",
            components: component,
            button_type: "QUICK_REPLY",
            button_name: "संपर्क करे",
          };

          await axios
            .post(
              "knee_lead.double_tick_whatsapp.send_whatsapp_with_buttons",
              formdata
            )
            .then((response) => {
              if (response.status == "200") {
                this.ShowSuccessModel = true;
                this.exercises = [];
              }
            })
            .catch((error) => {});
        } else if (this.whatsapp_template == "center_details") {
          var component = [];

          for (let x in this.selected_centers) {
            component.push(this.selected_centers[x].center_name);
            component.push(this.selected_centers[x].address);
            component.push(this.selected_centers[x].coordinator_name);
            component.push(this.selected_centers[x].coordinator_number);
          }

          const formdata = {
            mobile: this.$route.params.id,

            template: this.whatsapp_template,
            language: "en",
            media_type: "TEXT",
            components: component,
          };

          await axios
            .post("knee_lead.double_tick_whatsapp.send_whatsapp", formdata)
            .then((response) => {
              if (response.status == "200") {
                this.ShowSuccessModel = true;
                this.selected_centers = [];
              }
            })
            .catch((error) => {});
        } else if (this.whatsapp_template == "camp_xray_share") {
          for (let x in this.xray_files) {
            const formdata = {
              mobile: this.$route.params.id,

              template: this.whatsapp_template,
              media_url: "https://lead.kneexpert.in" + this.xray_files[x].xray,
              language: "en",
              media_type: "IMAGE",
              components: [],
            };

            await axios
              .post("knee_lead.double_tick_whatsapp.send_whatsapp", formdata)
              .then((response) => {
                if (response.status == "200") {
                  this.ShowSuccessModel = true;
                }
              })
              .catch((error) => {});
          }
        } else {
          let leng = "en";
          if (this.whatsapp_template == "hindi_xray_upload") {
            leng = "hi";
          }
          const formdata = {
            mobile: this.$route.params.id,

            template: this.whatsapp_template,
            language: leng,
            media_type: "TEXT",
            components: [],
          };

          if (this.whatsapp_no && (this.whatsapp_no.startsWith("+91") && this.whatsapp_no.length === 13)) {
      const formdata = {
        mobile: this.whatsapp_no, // Use whatsapp_no instead of this.$route.params.id
        template: this.whatsapp_template,
        language: leng,
        media_type: "TEXT",
        components: [],
      };

      await axios
        .post("knee_lead.double_tick_whatsapp.send_whatsapp", formdata)
        .then((response) => {
          if (response.data.message.messages[0].status == "SENT") {
            this.ShowSuccessModel = true;
          } else {
            this.ShowFailedModel = true;
          }
        })
        .catch((error) => {});
    } else {
      // Send to mobile if whatsapp_no doesn't meet the criteria
      const formdata = {
        mobile: this.$route.params.id,
        template: this.whatsapp_template,
        language: leng,
        media_type: "TEXT",
        components: [],
      };

      await axios
        .post("knee_lead.double_tick_whatsapp.send_whatsapp", formdata)
        .then((response) => {
          if (response.data.message.messages[0].status == "SENT") {
            this.ShowSuccessModel = true;
          } else {
            this.ShowFailedModel = true;
          }
        })
        .catch((error) => {});
    } 
  }
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
            // this.lead_basic_details = response.data.data;
            this.whatsapp_no = response.data.data[0].whatsapp_no;
            console.log(response.data.data[0].whatsapp_no);
          })
          .catch((error) => {});
      },

      split_characters: function (str) {
        var i,
          frags = str.split("_");
        for (i = 0; i < frags.length; i++) {
          frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
        }
        return frags.join(" ");
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
  .modal-body {
    height: 80vh;
    overflow-y: auto;
  }
  </style>
