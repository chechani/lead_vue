<template>
  <div>
    <div class="col-sm-3 mt-5">
      <div class="input-group">
        <select
          class="form-select"
          aria-label="PainLocation"
          v-model="exercise_req"
        >
          <option
            v-for="option in exercise_options"
            :value="option"
            placeholder=" Select Exercise  "
          >
            {{ option }}
          </option>
        </select>
        <div class="input-group-prepend">
          <button
            type="button"
            class="btn btn-success"
            :disabled="!exercise_req"
            @click="send_exercise_advice"
            style="float: right; margin-left: 0.5rem"
          >
            Send Exercise
          </button>
        </div>
      </div>
    </div>
    <div class="col-sm-6">
      <table
        class="table table-bordered mt-4 text-center"
        v-if="exercise_advices.length > 0"
      >
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Exercise</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody v-for="item in paginatedDataexercise">
          <tr>
            <td>{{ format_date_time(item.date) }}</td>
            <td>{{ item.exercise }}</td>
            <td>{{ item.status }}</td>
          </tr>
        </tbody>
      </table>
      <nav v-if="paginatedDataexercise.length > 5">
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
</template>

<script>
import axios from "axios";

export default {
  name: "ExerciseTab",
  props: {
    msg: String,
  },
  computed: {
    paginatedDataexercise() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.exercise_advices.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.get_exercise_advice();
    this.get_knee_lead_exercise_advice();
  },
  data() {
    return {
      exercise_options: [],
      exercise_req: "",
      exercise_advices: [],
      perPage: 5,
      currentPage: 1,
    };
  },
  methods: {
    get_knee_lead_exercise_advice: async function () {
      await axios
        .get("knee_lead.api.get_knee_lead_exercise_advice", {
          params: {
            knee_lead: this.$route.params.id,
          },
        })
        .then((response) => {
          this.exercise_advices = response.data.data;
        })
        .catch((error) => {});
    },
    get_exercise_advice: async function () {
      await axios
        .get("knee_lead.api.get_exercise_advice")
        .then((response) => {
          for (let x in response.data.data) {
            this.exercise_options.push(response.data.data[x].name);
          }
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
    send_exercise_advice: async function () {
      var date = new Date();
      var time =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      let date_iso = date.toISOString().split("T")[0];
      let new_date = date_iso + " " + time;

      const formdata = {
        knee_lead: this.$route.params.id,
        exercise: this.exercise_req,
        date: new_date,
      };
      this.loading = !false;

      await axios
        .post("knee_lead.api.add_exercise_advice", formdata)
        .then((response) => {
          this.get_knee_lead_exercise_advice();
          this.loading = false;
        })
        .catch((error) => {});
    },
  },
};
</script>

<style scoped lang="scss"></style>
