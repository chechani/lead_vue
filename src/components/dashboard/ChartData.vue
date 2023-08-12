<template>
  <div>
    <div>
      <Bar :data="data" :options="options" />
    </div>
  </div>
</template>

<script>
const { reactiveProp } = mixins;

export default {
  name: "LeadChart",
  extends: Line,
  mixins: [reactiveProp],
  props: ["chartData", "options"],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
