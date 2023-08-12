<template>
  <div class="modal-mask modal-xl" v-if="show">
    <div class="modal-container rounded border modal-xl">
      <div class="modal-header">
        <strong>OPD Appointmnent booking </strong>
        {{ lead_details[0].patient_id }}

        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal-mask"
          aria-label="Close"
          @click="$emit('close')"
        ></button>
      </div>
      <div class="modal-body mt-4 p-2">
        <div class="row">
          <div>
            <div class="row" v-for="item in practitioner_data">
              <div class="col-sm-2">
                <img
                  alt="Maleyoung"
                  style="
                    border-radius: 100%;
                    max-width: 100px;
                    max-height: 100px;
                  "
                  :src="'https://www.kneexpert.in/' + item.image"
                />
              </div>
              <div class="col-sm-4">
                <h6>
                  {{ item.first_name }} {{ item.middle_name }}
                  {{ item.last_name }}
                </h6>
                <p class="doc-speciality">
                  {{ item.healthcare_practitioner_category }}
                </p>
                <p class="doc-location">
                  <i class="fa fa-map-marker" aria-hidden="true"></i>
                  {{ item.city }},
                  {{ item.state }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <!-- :disabledDates="disabledDates" -->
            <VueDatePicker
              id="NextFollowUpDate"
              auto-apply
              v-model="appointment_date"
              :preview-format="format"
              format="dd/MM/yyyy"
            ></VueDatePicker>
          </div>
          <div class="col">
            <button
              type="button"
              class="btn btn-primary"
              @click="check_availability"
            >
              Check Availability
            </button>
          </div>
        </div>
        <div class="row bg-danger mt-4 p-4" v-if="message">
          <span class="text-white"> {{ message }}</span>
        </div>
        <!-- {{ appointment_date_data }} -->
        <div class="row" v-for="items in appointment_date_data">
          <!-- >>>>>>>>>>>>>>> {{ item }} -->
          <div class="card bg-info mt-4">
            <div class="card-body text-white">
              <h4>{{ items.hospital_name }}</h4>
            </div>
          </div>

          <div class="col-sm-1 m-1 p-2" v-for="item in items.avail_slot">
            <div class="radio-toolbar">
              <span v-if="item.booked"> {{ item.from_time }} </span>

              <span v-else>
                <input
                  v-model="slot_date"
                  type="radio"
                  :id="item.hospital_name + item.from_time"
                  name="radios"
                  :value="item.from_time"
                  @change="booking_data(item, items.hospital)"
                />
                <label :for="item.hospital_name + item.from_time">{{
                  item.from_time
                }}</label>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="book_appointment">
          Book Now
        </button>
      </div>
    </div>
  </div>
  <ModalSuccess
    @success="ShowSuccessModel = true"
    @close="ShowSuccessModel = false"
    :show="ShowSuccessModel"
    :msg="msg"
  />
</template>

<script>
import axios from "axios";
import ModalSuccess from "@/components/modals/ModalSuccess.vue";

export default {
  name: "BookAppointmentModal",
  components: { ModalSuccess },
  props: {
    msg: String,
    show: false,
    Knee_lead: "",
    practitioner_data: Array,
    lead_details: Array,
  },
  data() {
    return {
      ShowSuccessModel: false,
      name: "",
      mobile: "",
      slot_date: "",
      appointment_date: new Date(),
      appointment_date_data: [],
      disabledDates: {
        to: new Date(Date.now() - 8640000),
      },
      patient_id: "",
      hospital: "",
      msg: "",
      message: "",
    };
  },
  methods: {
    update_field: async function (doctype, fieldname, fieldvalue) {
      const formdata = {
        doctype: doctype,
        name: this.$route.params.id,
        fieldname: fieldname,
        fieldvalue: fieldvalue,
      };
      await axios
        .post("knee_lead.api.update_knee_lead_field_value", formdata)
        .then((response) => {})

        .catch((error) => {});
    },
    create_patient: function () {
      const axiosInstance = axios.create({
        baseURL: "https://develop.kneexpert.in/api/method/",
        headers: {
          Authorization: "token c08c55d4d0e5d70:8f87cb5f7d5ff24",
        },
      });

      const formdata = {
        mobile_no: this.lead_details[0].mobile,
        patient_full_name: this.lead_details[0].patient_full_name,
        city: this.lead_details[0].city,
        gender: this.lead_details[0].gender,
      };
      axiosInstance
        .post("sahaj.knee_lead_portal.register_patient", formdata)
        .then((response) => {
          if (response.data.status_code == "422") {
            this.update_field("Knee Lead", "patient_id", response.data.data);
            this.patient_id = response.data.data;
          } else {
            this.patient_id = response.data.data;
            this.update_field("Knee Lead", "patient_id", response.data.data);
          }

          // Handle response
        })
        .catch((error) => {
          // Handle error
        });
    },
    check_availability: function () {
      this.message = "";
      const axiosInstance = axios.create({
        baseURL: "https://develop.kneexpert.in/api/method/",
        headers: {
          Authorization: "token c08c55d4d0e5d70:8f87cb5f7d5ff24",
        },
      });

      const today = this.appointment_date;
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;

      axiosInstance
        .get(
          "sahaj.appointment.get_availability_data?date=" +
            date +
            "&practitioner=" +
            this.Knee_lead
        )
        .then((response) => {
          if (response.data.message == "Not Available") {
            this.message = response.data.data;
          }
          this.appointment_date_data = response.data.data.slot_details;
        })
        .catch((error) => {});
    },
    book_appointment: function () {
      const axiosInstance = axios.create({
        baseURL: "https://develop.kneexpert.in/api/method/",
        headers: {
          Authorization: "token c08c55d4d0e5d70:8f87cb5f7d5ff24",
        },
      });

      const today = this.appointment_date;
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;

      const formdata = {
        patient: this.lead_details[0].patient_id,
        practitioner: this.Knee_lead,
        appointment_date: date,
        appointment_time: this.slot_date,
        appointment_type: "OPD",
        hospital: this.hospital,
      };
      axiosInstance
        .post("sahaj.finalapi.get_doctor_appointment", formdata)
        .then((response) => {
          if (response.data.status_code == 200) {
            this.ShowSuccessModel = true;
            this.msg = "Appointment ID: " + response.data.message;
          }
        })
        .catch((error) => {});
    },
    booking_data: function (e, f) {
      this.hospital = f;
    },
  },
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
  width: 90%;
  max-width: 100%;
}
.modal-header {
  background: #2bb0ce;
  color: white;
  padding: 1rem;
  border-radius: 5px;
}

.radio-toolbar input[type="radio"] {
  display: none;
}
.radio-toolbar label {
  display: inline-block;
  background-color: #ddd;
  padding: 10px 20px;
  cursor: pointer;
}
.radio-toolbar input[type="radio"]:checked + label {
  background-color: #2bb0ce;
  color: #fff;
}
.radio-toolbar input[type="radio"] + label:hover {
  transition: transform 0.2s;
  transform: scale(1.2);
}

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
  width: 90vw;
  max-width: 90%;
  z-index: 10;
}

.modal {
  display: block !important; /* I added this to see the modal, you don't need this */
}

/* Important part */
.modal-dialog {
  overflow-y: initial !important;
}
.modal-body {
  height: 70vh;
  overflow-y: auto;
  z-index: 10;
}
</style>
