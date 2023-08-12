<template>
  <Header></Header>
  <div class="home"></div>
</template>

<script>
import IndexPage from "@/components/Index.vue";
import Header from "@/components/Header/Header.vue";

export default {
  name: "IndexPage",
  components: {
    IndexPage,
    Header,
  },
};
</script>
