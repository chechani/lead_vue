<template>
  <div class="row">
    <div class="col-sm-6">
      <div class="row">
        <div class="col">
          <table class="table table-bordered text-center">
            <thead>
              <tr>
                <th scope="col-sm-2"></th>
                <th scope="col">Doctor</th>
                <th scope="col-sm-2">Type</th>

                <th scope="col">Time</th>
              </tr>
            </thead>

            <tbody v-for="item in paginatedDatainvestigationadvice">
              <tr>
                <td>
                  <img
                    alt="Maleyoung"
                    style="
                      border-radius: 100%;
                      max-width: 80px;
                      max-height: 80px;
                    "
                    :src="'https://www.kneexpert.in/' + item.doctor_photo"
                  />
                </td>
                <td>{{ item.practitioner_name }}</td>
                <td>{{ item.appointment_type }}</td>

                <td>{{ item.appointment_datetime }}</td>
              </tr>
            </tbody>
          </table>
          <nav v-if="appointment_details.length > 25">
            <button
              class="pagination-button"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              Prev
            </button>

            <button
              class="pagination-button"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
              v-if="paginatedDatainvestigationadvice.length > 0"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
    <div class="col-sm-6">
      <div v-if="lead_details[0].patient_id" class="row m-0">
        <div class="col-sm-6">
          <Multiselect
            v-model="states"
            :options="states_options"
            :searchable="true"
            @select="get_city"
            placeholder="Select State"
          >
          </Multiselect>
        </div>
        <div class="col-sm-6">
          <Multiselect
            v-model="city"
            :options="city_options"
            :searchable="true"
            @select="get_doctors"
            placeholder="Select City"
          >
          </Multiselect>
        </div>
      </div>
      <div v-else class="col-sm-4">
        <button
          type="button"
          class="btn brn-sm btn-primary"
          @click="create_patient"
        >
          Create New patient
        </button>
      </div>

      <div class="row mt-4">
        <div class="row" v-for="item in doctors_list">
          <div v-if="item == 'Total Count'"></div>
          <div v-else class="col-sm-2">
            <img
              alt="Maleyoung"
              style="border-radius: 100%; max-width: 80px; max-height: 80px"
              :src="'https://www.kneexpert.in/' + item.image"
            />
          </div>
          <div class="col-sm-4">
            <h6>
              {{ item.first_name }} {{ item.middle_name }} {{ item.last_name }}
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
          <div class="col-sm-4">
            <button
              class="btn btn-sm btn-success kx-button"
              style="color: white; margin-right: 10px"
              @click="fnShowAppointmentModel(item.name, item)"
            >
              <i class="fa fa-calendar" aria-hidden="true"></i>

              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <BookAppointmentModal
    @success="ShowAppointmentModel = true"
    @close="ShowAppointmentModel = false"
    :show="ShowAppointmentModel"
    :Knee_lead="Knee_lead_id"
    :lead_details="lead_details"
    :practitioner_data="practitioner_data"
    msg="X Ray Sent Successfully"
  />
</template>

<script>
import axios from "axios";
import BookAppointmentModal from "@/components/modals/BookAppointment.vue";
import Multiselect from "@vueform/multiselect";

export default {
  name: "AppointmentTab",

  components: {
    BookAppointmentModal,
    Multiselect,
  },
  props: {
    msg: String,
    show: false,
    states: String,
    city: String,
    lead_details: Array,
  },
  computed: {
    paginatedDatainvestigationadvice: function () {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.appointment_details.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.get_states();
    this.set_state_city();
    this.get_appointment_details();
  },
  data() {
    return {
      lead_comments: [],
      perPage: 25,
      currentPage: 1,
      subject: "",
      content: "",
      ShowAppointmentModel: false,
      states_options: [],
      states: this.patient_state,
      city: "",
      city_options: [],
      doctors_list: [],
      doctor_name: "",
      appointment_details: [],
      practitioner_data: [],
      patient_id: "",
    };
  },
  methods: {
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

    set_state_city: function () {
      this.states = this.states;
      this.city = this.city;
    },
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
    get_states: function () {
      const axiosInstance = axios.create({
        baseURL: "https://develop.kneexpert.in/api/method/",
        headers: {
          Authorization: "token c08c55d4d0e5d70:8f87cb5f7d5ff24",
        },
      });
      axiosInstance
        .get("sahaj.finalapi.get_states")
        .then((response) => {
          for (let i in response.data.message) {
            this.states_options.push(response.data.message[i].state);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    get_city: function () {
      const axiosInstance = axios.create({
        baseURL: "https://develop.kneexpert.in/api/method/",
        headers: {
          Authorization: "token c08c55d4d0e5d70:8f87cb5f7d5ff24",
        },
      });
      axiosInstance
        .get("sahaj.finalapi.get_city?state=" + this.states)
        .then((response) => {
          this.city_options = [];
          for (let i in response.data.message) {
            this.city_options.push(response.data.message[i].city);
          }
        })
        .catch((error) => {});
    },
    fnShowAppointmentModel: function (e, practitioner) {
      this.practitioner_data = [];
      this.practitioner_data.push(practitioner);
      this.Knee_lead_id = e;
      console.log(this.ShowAppointmentModel);
      this.ShowAppointmentModel = !this.ShowAppointmentModel;
    },
    get_doctors: function () {
      const axiosInstance = axios.create({
        baseURL: "https://develop.kneexpert.in/api/method/",
        headers: {
          Authorization: "token c08c55d4d0e5d70:8f87cb5f7d5ff24",
        },
      });
      axiosInstance
        .get(
          "sahaj.finalapi.get_doctor_list_v2?state=" +
            this.states +
            "&longitude=&lattitude=&complaints=Knee+Pain&healthcare_sub_category=&gender=&practitioner_speciality=&healthcare_category=&limit_start=0&limit_page_length=25&city=" +
            this.city
        )
        .then((response) => {
          this.city_options = [];
          this.doctors_list = response.data.data;
        })
        .catch((error) => {});
    },

    check_practitioner_schedule: function () {
      const axiosInstance = axios.create({
        baseURL: "https://develop.kneexpert.in/api/method/",
        headers: {
          Authorization: "token c08c55d4d0e5d70:8f87cb5f7d5ff24",
        },
      });
      axiosInstance
        .get(
          "sahaj.appointment.check_practitioner_schedule?practitioner=Dr.+Mohit-Chechani-8696490240-Vile+Parle-Mumbai-00001"
        )
        .then((response) => {})
        .catch((error) => {});
      //
    },
    check_availability: function () {
      console.log("appointment asdasdasd");
      axios
        .get(
          "https://www.kneexpert.in/api/method/sahaj.appointment.get_availability_data?date=2023-06-28&practitioner=Dr.+Mohit-Chechani-8696490240-Vile+Parle-Mumbai-00001",
          {
            headers: {
              Authorization: "token" + "", //the token is a variable which holds the token
            },
          }
        )
        .then((response) => {})
        .catch((error) => {});
      //
    },

    get_appointment_details: function () {
      const axiosInstance = axios.create({
        baseURL: "https://develop.kneexpert.in/api/method/",
        headers: {
          Authorization: "token c08c55d4d0e5d70:8f87cb5f7d5ff24",
        },
      });

      const formdata = {
        patient: this.lead_details[0].patient_id,
      };
      axiosInstance
        .post("sahaj.patient_api.get_my_appointment_list_patient", formdata)
        .then((response) => {
          this.appointment_details = response.data.data;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.doc-speciality {
  font-size: 14px;
  color: #757575;
  margin-bottom: 15px;
}

.doc-location {
  color: #757575;
  font-size: 14px;
  margin-bottom: 25px;
}
</style>
