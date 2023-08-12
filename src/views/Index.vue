<template>
  <div id="content">
    <SideBaar></SideBaar>
    <Header></Header>
    <div class="container-fluid">
      <div class="row">Index Page</div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import SideBaar from "@/components/SideBaar.vue";

export default {
  name: "IndexPage",
  components: {
    SideBaar,
    Header,
  },
};
</script>
