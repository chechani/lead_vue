<template>
  <div class="modal-mask" v-if="show">
    <div class="modal-container rounded border border-danger">
      <div class="modal-header">
        <h4 class="modal-title fs-5" id="exampleModalLabel">Error</h4>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal-mask"
          aria-label="Close"
          @click="$emit('close')"
        ></button>
      </div>
      <div class="modal-body text-center mt-4 p-2">
        <span> {{ msg }}</span>
      </div>
      <div class="modal-footer"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorModal",
  props: {
    msg: String,
    show: false,
  },
  data() {
    return {
      name: "",
      mobile: "",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(8, 0, 8, 0.4);
  z-index: 99;
  display: grid;
  place-items: center;
}

.modal-container {
  background: white;
  padding: 1rem;
  width: 80vw;
  max-width: 500px;
}
.modal-header {
  background: rgb(231, 103, 103);
  color: white;
  padding: 1rem;
  border-radius: 5px;
}
</style>
