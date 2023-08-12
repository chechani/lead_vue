<template>
  <div class="modal-mask" v-if="show">
    <div class="modal-container">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">
          Send Investigation
        </h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal-mask"
          aria-label="Close"
          @click="$emit('close')"
        ></button>
      </div>
      <div class="modal-body">
        <div class="input-group mt-2 mb-2">
          <select
            class="form-select"
            aria-label="PainLocation"
            v-model="investigation_req"
          >
            <option
              v-for="option in investigation_req_options"
              :value="option"
              placeholder=" Select Investigation "
            >
              {{ option }}
            </option>
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-primary"
          :disabled="!investigation_req"
          @click="send_investigation_advice"
          style="float: right; margin-left: 10px"
        >
          <i class="fa fa-rocket" aria-hidden="true"></i> Send
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SendInvestigationModal",
  props: {
    msg: String,
    show: false,
    investigation_req_options: [],
    Knee_lead: "",
  },
  mounted() {},
  data() {
    return {
      name: "",
      mobile: "",
      investigation_req: "",
    };
  },
  methods: {
    send_investigation_advice: async function () {
      var date = new Date();
      var time =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      let date_iso = date.toISOString().split("T")[0];
      let new_date = date_iso + " " + time;
      const formdata = {
        knee_lead: this.Knee_lead,
        investigation: this.investigation_req,
        message: this.investigation_req,
        date: date_iso,
        time: time,
        status: "Delivered",
      };
      await axios
        .post("knee_lead.api.add_investigation_advice", formdata)
        .then((response) => {
          this.$emit("close");
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
