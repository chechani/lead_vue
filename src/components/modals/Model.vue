<template>
  <div class="modal-mask" v-if="show">
    <div class="modal-container">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">New Patient</h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          @click="$emit('close')"
        ></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="Patient_name" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id="Patient_name"
            placeholder="Name"
            required
            v-model="name"
          />
        </div>
        <div class="mb-3">
          <label for="Patient_name" class="form-label">Mobile</label>
          <input
            type="tel"
            class="form-control"
            id="Patient_name"
            maxlength="10"
            placeholder="Mobile"
            required
            v-model="mobile"
          />
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="add_new_lead">
          add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PopupModel",
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
  methods: {
    add_new_lead: async function () {
      const formdata = {
        mobile: this.mobile,
        patient_full_name: this.name,
      };

      await axios
        .post("knee_lead.api.create_knee_lead", formdata)
        .then((response) => {
          this.$emit("close");
          this.$router.go();
        })
        .catch((error) => {});
    },
  },
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
