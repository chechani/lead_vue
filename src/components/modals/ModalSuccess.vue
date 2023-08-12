<template>
  <div class="modal-mask" v-if="show">
    <div class="modal-container">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Message</h1>

        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal-mask"
          aria-label="Close"
          @click="$emit('close')"
        ></button>
      </div>
      <div class="modal-body">
        <div class="alert alert-success" role="alert">
          <h2>{{ msg }}</h2>
        </div>
      </div>
      <div class="modal-footer"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ModalSuccess",
  props: {
    msg: String,
    show: false,
    exercise_options: [],
    Knee_lead: "",
  },
  mounted() {},
  data() {
    return {
      name: "",
      mobile: "",
      exercise_req: "",
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(8, 0, 8, 0.4);
  z-index: 2;
  display: grid;
  place-items: center;
}

.modal-container {
  background: white;
  padding: 1rem;
  width: 80vw;
  max-width: 500px;
}
</style>
