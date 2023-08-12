<template>
  <div id="content">
    <SideBaar></SideBaar>
    <Header></Header>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-2" v-for="item in lead_couns_lead_status">
          <div class="card dashbord-card">
            <strong
              v-if="item.knee_lead_status == 'Xray Received (Opportunity)'"
              >Xray Received</strong
            >
            <strong v-else>{{ item.knee_lead_status }}</strong>
            <p class="dashbord-card-font">{{ item.count }}</p>
          </div>
        </div>
      </div>
      <div class="row" v-for="item in lead_couns_next_followup">
        <div class="col-sm-2">
          <div class="card dashbord-card">
            <strong>Today</strong>

            <p class="dashbord-card-font">{{ item.Today }}</p>
          </div>
        </div>

        <div class="col-sm-2">
          <div class="card dashbord-card">
            <strong>This Week</strong>
            <p class="dashbord-card-font">{{ item.This_Week }}</p>
          </div>
        </div>

        <div class="col-sm-2">
          <div class="card dashbord-card">
            <strong>Next Week</strong>
            <p class="dashbord-card-font">{{ item.Next_Week }}</p>
          </div>
        </div>

        <div class="col-sm-2">
          <div class="card dashbord-card">
            <strong>Missed</strong>
            <p class="dashbord-card-font">{{ item.Missed_Follow_ups }}</p>
          </div>
        </div>

        <div class="col-sm-4 mt-3">
          <div class="card">
            <table style="width:100% text-align:center;">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>0 - 30</th>
                  <th>30 - 60</th>
                  <th>60+</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tr>
                <td>In</td>
                <td>20</td>
                <td>50</td>
                <td>10</td>
                <td>80</td>
              </tr>
              <tr>
                <td>Out</td>
                <td>20</td>
                <td>50</td>
                <td>10</td>
                <td>80</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6">
          <h5>Follow ups</h5>
          <DashboardFollowUp />
        </div>
        <div class="col-sm-6">
          <h5>Xray Received</h5>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6">
          <h5>Talking Hours</h5>
        </div>
        <div class="col-sm-6">
          <h5>Followup's</h5>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.dashbord-card {
  padding: 0.5rem;
  text-align: center;
  color: #ffff;
  height: 4rem;
  margin-top: 1rem;
  background: linear-gradient(to bottom, var(--primary) 50%, white 50%);
}

.dashbord-card-font {
  color: darkgray;
}
</style>

<script>
import axios from "axios";
import DashboardFollowUp from "@/components/dashboard/followupChart.vue";

import Header from "@/components/Header/Header.vue";
import SideBaar from "@/components/SideBaar.vue";

export default {
  name: "DashBoard",

  components: {
    Header,
    SideBaar,
    DashboardFollowUp,
  },
  mounted() {
    this.get_knee_lead_counts();
  },

  data() {
    return {
      lead_couns_lead_status: [],
      lead_couns_next_followup: [],
      chartlables: [],
      chartdatasets: [],
      data: null,
    };
  },

  methods: {
    get_knee_lead_counts: function () {
      (this.loading = !false),
        axios
          .get("knee_lead.api.get_knee_lead_counts")
          .then((response) => {
            this.loading = false;
            this.lead_couns_next_followup = response.data.message[1];
            this.lead_couns_lead_status = response.data.message[0];
          })
          .catch((error) => {
            this.$router.go(this.$router.currentRoute);
          });
    },
  },
};
</script>
