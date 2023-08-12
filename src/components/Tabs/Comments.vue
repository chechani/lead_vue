<template>
  <div class="row">
    <div class="col-sm-6">
      <table
        class="table table-bordered mt-4 text-center"
        v-if="lead_comments.length > 0"
      >
        <thead>
          <tr>
            <th scope="col-sm-2">Date</th>
            <th scope="col-sm-2">User</th>
            <th scope="col">comment</th>
          </tr>
        </thead>
        <tbody v-for="item in paginatedDatainvestigationadvice">
          <tr>
            <td>{{ format_date_time(item.comment_date) }}</td>
            <td>{{ item.comment_by }}</td>

            <td>{{ item.content }}</td>
          </tr>
        </tbody>
      </table>
      <nav v-if="lead_comments.length > 5">
        <button
          class="pagination-button"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Prev
        </button>

        <button
          class="pagination-button"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
          v-if="paginatedDatainvestigationadvice.length > 0"
        >
          Next
        </button>
      </nav>
    </div>
    <div class="col-sm-6 mt-4"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CommentsTab",
  props: {
    msg: String,
  },
  computed: {
    paginatedDatainvestigationadvice: function () {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.lead_comments.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.get_knee_lead_comments();
  },
  data() {
    return {
      lead_comments: [],
      perPage: 5,
      currentPage: 1,
      // totalPages: 0,

      subject: "",
      content: "",
    };
  },
  methods: {
    get_knee_lead_comments: async function () {
      await axios
        .get("knee_lead.api.get_knee_lead_comment", {
          params: {
            knee_lead_id: this.$route.params.id,
          },
        })
        .then((response) => {
          this.lead_comments = response.data.data[0];
        })
        .catch((error) => {});
    },
    create_comment: async function () {
      const formdata = {
        mobile: this.$route.params.id,
        subject: this.subject,
        content: this.content,
      };
      await axios
        .post("knee_lead.api.add_knee_lead_comment", formdata)
        .then((response) => {
          this.get_knee_lead_comments();
        })
        .catch((error) => {});
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
            time;
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
