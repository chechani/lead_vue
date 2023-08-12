<template>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";

export default {
  name: "DashboardFollowUp",

  mounted() {
    this.get_chart_data();
  },

  data() {
    return {
      chartlables: [],
      chartdatasets: [],
    };
  },
  methods: {
    get_chart_data: function () {
      (this.loading = !false),
        axios
          .get("knee_lead.api.get_chart_data?user=Administrator")
          .then((response) => {
            this.chartlables = response.data.message.labels;
            this.chartdatasets = response.data.message.datasets;
            this.load_chart();
          })
          .catch((error) => {});
    },

    load_chart: function () {
      const ctx = document.getElementById("myChart");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.chartlables,
          datasets: this.chartdatasets,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
};
</script>
