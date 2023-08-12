<template>
  <div class="modal-mask" v-if="show">
    <div class="modal-container">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Send Exercise</h1>
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
            v-model="exercise_req"
          >
            <option
              v-for="option in exercise_options"
              :value="option"
              placeholder=" Select Exercise "
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
          :disabled="!exercise_req"
          @click="send_exercise_advice(Knee_lead)"
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
  name: "SendExerciseModal",
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
  methods: {
    send_exercise_advice: function (e) {
      var date = new Date();
      var time =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      let date_iso = date.toISOString().split("T")[0];
      let new_date = date_iso + " " + time;
      const formdata = {
        knee_lead: e,
        exercise: this.exercise_req,
        date: new_date,
      };
      axios
        .post("knee_lead.api.add_exercise_advice", formdata)
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
