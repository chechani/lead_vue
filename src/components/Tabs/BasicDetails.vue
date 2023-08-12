<template>
  <div>
    <EditBasicDetails v-if="editable" />
    <NonEditBasicDetails v-else :items="items" />
  </div>
</template>

<script>
import EditBasicDetails from "@/components/Tabs/EditBasicDetails.vue";
import NonEditBasicDetails from "@/components/Tabs/NonEditBasicDetails.vue";

export default {
  name: "BasicDetails",
  components: {
    EditBasicDetails,
    NonEditBasicDetails,
  },
  props: {
    msg: String,
    health_scheme: String,
    editable: Boolean,
    items: [],
  },
};
</script>

<style scoped lang="scss"></style>
