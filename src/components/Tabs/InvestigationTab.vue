<template>
  <div>
    <div class="col-sm-3 mt-5">
      <div class="input-group">
        <select
          class="form-select"
          aria-label="PainLocation"
          v-model="investigation_req"
        >
          <option
            v-for="option in investigation_req_options"
            :value="option"
            placeholder=" Select Investigation "
          >
            {{ option }}
          </option>
        </select>
        <div class="input-group-prepend">
          <button
            type="button"
            class="btn btn-success"
            :disabled="!investigation_req"
            @click="send_investigation_advice"
            style="float: right; margin-left: 10px"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
    <div class="col-sm-6">
      <table
        class="table table-bordered mt-4 text-center"
        v-if="investigation_advice.length > 0"
      >
        <thead>
          <tr>
            <th scope="col">Message</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody v-for="item in paginatedDatainvestigationadvice">
          <tr>
            <td>{{ item.investigation }}</td>
            <td>{{ format_date_time(item.date) }}</td>
            <td><i class="fa-solid fa-check"></i></td>
          </tr>
        </tbody>
      </table>
      <nav v-if="paginatedDatainvestigationadvice.length > 5">
        <button
          class="pagination-button"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Prev
        </button>
        <span class="pagination-button"
          >{{ currentPage }} of {{ totalPages }}</span
        >
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
</template>

<script>
import axios from "axios";

export default {
  name: "InvestigationTab",
  props: {
    msg: String,
  },
  computed: {
    paginatedDatainvestigationadvice: function () {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.investigation_advice.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.get_investigation_advice();
    this.get_knee_lead_investigation_advice();
  },
  data() {
    return {
      investigation_req_options: [],
      investigation_req: "",
      investigation_advice: [],
      perPage: 5,
      currentPage: 1,
    };
  },
  methods: {
    get_investigation_advice: async function () {
      await axios
        .get("knee_lead.api.get_investigation_advice")
        .then((response) => {
          for (let x in response.data.data) {
            this.investigation_req_options.push(response.data.data[x].name);
          }
        })
        .catch((error) => {});
    },
    get_knee_lead_investigation_advice: async function () {
      await axios
        .get("knee_lead.api.get_knee_lead_investigation_advice", {
          params: {
            knee_lead: this.$route.params.id,
          },
        })
        .then((response) => {
          this.investigation_advice = response.data.data;
        })
        .catch((error) => {});
    },
    send_investigation_advice: async function () {
      var date = new Date();
      var time =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      let date_iso = date.toISOString().split("T")[0];
      let new_date = date_iso + " " + time;
      const formdata = {
        knee_lead: this.$route.params.id,
        investigation: this.investigation_req,
        message: this.investigation_req,
        date: date_iso,
        time: time,
        status: "Delivered",
      };
      this.loading = !false;

      await axios
        .post("knee_lead.api.add_investigation_advice", formdata)
        .then((response) => {
          this.get_knee_lead_investigation_advice();
          this.loading = false;
        })
        .catch((error) => {});
    },
    format_date_time: function (e) {
      if (e) {
        var date_time = e.split(" ");
        var date = date_time[0];
        var time = date_time[1];
        var final_date = date.split("-");
        if (time) {
          var final_date_time =
            final_date[2] +
            "-" +
            final_date[1] +
            "-" +
            final_date[0] +
            " " +
            time;
        }
        var final_date_time =
          final_date[2] + "-" + final_date[1] + "-" + final_date[0];

        return final_date_time;
      }
      return;
    },
  },
};
</script>

<style scoped lang="scss"></style>
