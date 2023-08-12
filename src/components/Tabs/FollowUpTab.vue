<template>
  <div>
    <div class="row">
      <div class="col-sm-12" v-if="display_folloup_form">
        <div class="card kx-card">
          <div class="row">
            <div class="col-sm-6">
              <div class="row">
                <div class="col-sm-8">
                  <label for="followup_stage" class="kx-label-secondary"
                    >Purpose</label
                  >
                  <select
                    class="form-select"
                    aria-label="followup_stage"
                    v-model="followup_stage"
                    @change="set_next_followup_date"
                  >
                    <option v-for="option in followup_stages" :value="option">
                      {{ option }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-8">
                  <label for="NextFollowUpDate" class="kx-label-secondary"
                    >Next FollowUp Date</label
                  >
                  <VueDatePicker
                    id="NextFollowUpDate"
                    auto-apply
                    v-model="next_request_follow_up_date"
                    :preview-format="format"
                    format="dd/MM/yyyy H:I"
                  ></VueDatePicker>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="row">
                <div class="col">
                  <label for="followup_stage" class="kx-label-secondary"
                    >Comment</label
                  >
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    style="height: 150px; width: 500px"
                    v-model="folloup_remark"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-6 mt-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="event_category"
                  value="WhatsApp"
                  id="xfollowp-label"
                />
                <label class="xfollowp-label" for="xfollowp-label">
                  <img
                    alt="Maleyoung"
                    style="height: 25px"
                    src="../../assets/img/whatsapp.png"
                /></label>
              </div>

              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="event_category"
                  value="SMS"
                  id="xfollowp-label"
                />
                <label class="xfollowp-label" for="event_category_sms">
                  <img
                    alt="Maleyoung"
                    style="height: 16px"
                    src="../../assets/img/SMS.png"
                /></label>
              </div>

              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="event_category"
                  value="Call"
                  id="xfollowp-label"
                />
                <label class="event_category_call" for="event_category_call">
                  <img
                    alt="Maleyoung"
                    style="height: 20px"
                    src="../../assets/img/Call.png"
                /></label>
              </div>
            </div>

            <div class="row"></div>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="row">
          <div class="col">
            <!-- {{followup_stage}} -->

            <button
              type="button"
              class="btn btn-success"
              style="margin-left: 1rem"
              @click="create_followup()"
              v-if="display_folloup_form"
              :disabled="
                (followup_stage == '')
                  | (event_category == '')
                  | (folloup_remark == '')
                  | (next_request_follow_up_date == '')
              "
            >
              SAVE
            </button>
            <button
              type="button"
              class="btn btn-success"
              style="margin-left: 1rem"
              @click="fn_display_folloup_form"
              v-else
            >
              Plan New FollowUp
            </button>
          </div>
        </div>
      </div>

      <div class="col-sm-12">
        <div
          class="spinner-border spinner-border-lg loader"
          v-if="loading"
        ></div>
        <div class="card kx-card table-responsive" v-else>
          <table
            v-if="paginatedDataFollowUps.length > 0"
            class="table align-middle table-bordered text-center"
          >
            <thead>
              <tr>
                <th scope="col">Taken On</th>
                <th scope="col">Event Stage</th>
                <th scope="col">Event Category</th>
                <th scope="col">Status</th>
                <th scope="col">Next FollowUp Date</th>
                <th scope="col">Done By</th>
                <th scope="col">Remark</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in paginatedDataFollowUps">
                <!-- creation -->
                <td>{{ format_date_time(item.creation) }}</td>
                <td>{{ item.event_stage }}</td>
                <td>{{ item.event_category }}</td>

                <td v-if="edit_FollowUp">
                  <select
                    class="form-select"
                    aria-label="followup_stage"
                    v-model="item.status"
                    @change="update_followup_status(item)"
                  >
                    <option v-for="option in followup_statuses" :value="option">
                      {{ option }}
                    </option>
                  </select>
                </td>
                <td v-else>{{ item.status }}</td>

                <td>{{ format_date_time(item.starts_on) }}</td>
                <td>{{ item.event_owner }}</td>
                <td v-if="edit_FollowUp">
                  <input
                    @keyup.enter="update_followup_status(item)"
                    type="text"
                    class="form-intput"
                    v-model="item.description"
                  />
                </td>
                <td>{{ item.description }}</td>
                <td>
                  <button class="btn btn-info" @click="edit_followup(item)">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <nav v-if="paginatedDataFollowUps.length > 5">
            <button
              class="pagination-button"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              Prev
            </button>
            <span>{{ currentPage }} of {{ totalPages }}</span>
            <button
              class="pagination-button"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FollowUpTab",
  props: {
    msg: String,
  },
  setup() {
    const format = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `Selected date is ${day}/${month}/${year}`;
    };
  },
  computed: {
    paginatedDataFollowUps() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.FollowUps.slice(startIndex, endIndex);
    },
  },

  mounted() {
    this.get_followup_stages();
    this.get_followups();
    this.get_followup_status();
  },
  data() {
    return {
      event_category: "Call",
      exercise_req: "",
      exercise_advices: [],
      perPage: 5,
      currentPage: 1,
      FollowUps: [],
      display_folloup_form: false,
      followup_stages: [],

      next_request_follow_up_date: new Date(),
      edit_FollowUp: false,
      FolowUp_Details: [],
      followup_status: "",
      followup_statuses: [],
    };
  },
  methods: {
    set_next_followup_date: async function () {
      var date = new Date();

      if (this.followup_stage == "Blood Test") {
        // date.setDate(date.getDate() + 7);
        this.next_request_follow_up_date = date.setDate(date.getDate() + 7);
      }

      if (this.followup_stage == "Contact") {
        this.next_request_follow_up_date = date.setDate(date.getDate());
      }

      if (this.followup_stage == "Excercise") {
        this.next_request_follow_up_date = date.setDate(date.getDate() + 10);
      }
      if (this.followup_stage == "Fitness") {
        this.next_request_follow_up_date = date.setDate(date.getDate());
      }
      if (this.followup_stage == "Initial Contact") {
        this.next_request_follow_up_date = date.setDate(date.getDate());
      }
      if (this.followup_stage == "MRI") {
        this.next_request_follow_up_date = date.setDate(date.getDate() + 7);
      }
      if (this.followup_stage == "MRI Request") {
        this.next_request_follow_up_date = date.setDate(date.getDate() + 7);
      }
      if (this.followup_stage == "MRI Upload Request") {
        this.next_request_follow_up_date = date.setDate(date.getDate() + 3);
      }
      if (this.followup_stage == "New Xray Request") {
        this.next_request_follow_up_date = date.setDate(date.getDate() + 5);
      }
      if (this.followup_stage == "Online Consultation") {
        this.next_request_follow_up_date = date.setDate(date.getDate() + 1);
      }
      if (this.followup_stage == "OPD Visit") {
        this.next_request_follow_up_date = date.setDate(date.getDate() + 3);
      }
      if (this.followup_stage == "Scanogram") {
        this.next_request_follow_up_date = date.setDate(date.getDate() + 4);
      }
      if (this.followup_stage == "Scanogram Request") {
        this.next_request_follow_up_date = date.setDate(date.getDate() + 4);
      }
      if (this.followup_stage == "Scanogram Upload Request") {
        this.next_request_follow_up_date = date.setDate(date.getDate() + 1);
      }
      if (this.followup_stage == "Therapy / Surgery Plan") {
        this.next_request_follow_up_date = date.setDate(date.getDate() + 7);
      }
      if (this.followup_stage == "Xray Hip") {
        this.next_request_follow_up_date = date.setDate(date.getDate() + 1);
      }
      if (this.followup_stage == "Xray Request") {
        this.next_request_follow_up_date = date.setDate(date.getDate() + 1);
      }
      if (this.followup_stage == "Xray Upload Request") {
        this.next_request_follow_up_date = date.setDate(date.getDate() + 1);
      }
    },
    edit_followup: async function (e) {
      this.FolowUp_Details = [];
      this.edit_FollowUp = true;
      this.FolowUp_Details.push(e);
    },
    get_followup_status: async function () {
      await axios
        .get("knee_lead.api.get_event_status")
        .then((response) => {
          this.followup_statuses = response.data.message;
        })
        .catch((error) => {});
    },
    update_followup_status: async function (e) {
      let formdata = e;
      await axios
        .post("knee_lead.api.update_knee_lead_follow_up", formdata)
        .then((response) => {
          this.get_followups();
          this.loading = false;
        })
        .catch((error) => {});
    },

    get_followup_stages: async function () {
      await axios
        .get("knee_lead.api.get_stage")
        .then((response) => {
          for (let x in response.data.data) {
            this.followup_stages.push(response.data.data[x].stage);
          }
        })
        .catch((error) => {});
    },
    get_followups: async function () {
      await axios
        .get("knee_lead.api.get_follow_up", {
          params: {
            knee_lead_id: this.$route.params.id,
          },
        })
        .then((response) => {
          this.FollowUps = response.data.data["All Follow Ups"];
          //
          this.followup_stage =
            response.data.data["last_follow_up"][0].event_stage;
          this.edit_FollowUp = false;
        })
        .catch((error) => {});
    },
    create_followup: async function () {
      function checkZero(data) {
        if (data.length == 1) {
          data = "0" + data;
        }
        return data;
      }

      var today_date = new Date(this.next_request_follow_up_date);
      var today_date_iso = today_date.toISOString().split("T")[0];
      var today_hour = today_date.getHours() + "";
      var today_minutes = today_date.getMinutes() + "";
      var today_seconds = today_date.getSeconds() + "";
      today_hour = checkZero(today_hour);
      today_minutes = checkZero(today_minutes);
      today_seconds = checkZero(today_seconds);
      var today_time =
        today_date_iso +
        " " +
        today_hour +
        ":" +
        today_minutes +
        ":" +
        today_seconds;

      var date = today_date;
      var time =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      let date_iso = date.toISOString().split("T")[0];
      let new_date = date_iso + " " + 0 + time + 0;
      const formdata = {
        knee_lead: this.$route.params.id,
        subject: this.followup_stage,
        event_category: this.event_category,
        event_type: "Private",
        event_stage: this.followup_stage,
        starts_on: today_time,
        repeat_event_on: new_date,
        status: "Open",
        description: this.folloup_remark,
      };
      this.loading = !false;

      await axios
        .post("knee_lead.api.add_knee_lead_follow_up", formdata)
        .then((response) => {
          this.get_followups();
          this.loading = false;
          this.fn_display_folloup_form();
        })
        .catch((error) => {});
    },

    fn_display_folloup_form: function () {
      if (this.display_folloup_form) {
        this.display_folloup_form = false;
      } else {
        this.display_folloup_form = true;
      }
    },
    format_date_time: function (e) {
      if (e) {
        var date_time = e.split(" ");
        var date = date_time[0];
        var time = date_time[1];
        var sp_time = time.split(":");

        var final_time = sp_time[0] + ":" + sp_time[1];

        var final_date = date.split("-");
        if (time) {
          var final_date_time =
            final_date[2] +
            "-" +
            final_date[1] +
            "-" +
            final_date[0] +
            " " +
            final_time;
        }
        var final_date_time =
          final_date[2] +
          "-" +
          final_date[1] +
          "-" +
          final_date[0] +
          " " +
          final_time;

        return final_date_time;
      }
      return;
    },
  },
};
</script>

<style scoped lang="scss"></style>
