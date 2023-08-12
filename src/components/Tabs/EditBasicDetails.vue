<template>
  <div>
    <div class="col-sm-12">
      <div class="row">
        <div class="col-sm-4">
          <label
            for="patient_full_name"
            class="form-text-label kx-label-secondary"
            >Patient Name</label
          >
          <input
            type="text"
            class="form-control"
            id="patient_full_name"
            @change="
              update_field(
                'Knee Lead',
                name,
                'patient_full_name',
                patient_full_name
              )
            "
            v-model="patient_full_name"
          />
        </div>
        <div class="col-sm-2">
          <label for="age" class="form-text-label kx-label-secondary"
            >Age</label
          >
          <input
            type="text"
            class="form-control"
            id="age"
            maxlength="2"
            @change="update_field('Knee Lead', name, 'age', age)"
            v-model="age"
            @keypress="onlyNumber"
          />
        </div>
        <div class="col-sm-2">
          <label for="gender" class="form-text-label kx-label-secondary"
            >Gender</label
          >
          <select
            class="form-select"
            id="gender"
            aria-label="gender"
            @change="update_field('Knee Lead', name, 'gender', gender)"
            v-model="gender"
          >
            <option v-for="option in gender_options" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="col-sm-4">
          <label for="occupation" class="form-text-label kx-label-secondary"
            >Occupation</label
          >
          <select
            class="form-select"
            id="occupation"
            aria-label="occupation"
            @change="update_field('Knee Lead', name, 'occupation', occupation)"
            v-model="occupation"
          >
            <option
              v-for="option in patient_occupation_options"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-4">
          <label class="form-select-label kx-label-secondary" for="HelthScheme"
            >Health Scheme</label
          >
          <select
            class="form-select"
            aria-label="HelthScheme"
            @change="
              update_field('Knee Lead', name, 'health_scheme', health_scheme)
            "
            v-model="health_scheme"
          >
            <option v-for="option in health_scheme_options" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div class="col-sm-3">
          <label class="form-select-label kx-label-secondary" for="City"
            >City</label
          >

          <select
            class="form-select"
            aria-label="City"
            @change="get_state_by_city(city)"
            v-model="city"
          >
            <option v-for="option in city_options" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="col-sm-4">
          <label class="form-select-label kx-label-secondary" for="State"
            >State</label
          >
          <select
            class="form-select"
            aria-label="State"
            @change="update_field('Knee Lead', name, 'state', patient_state)"
            v-model="patient_state"
          >
            <option v-for="option in patient_state_options" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4">
          <label
            for="patient_full_name"
            class="form-text-label kx-label-secondary"
            >Mobile</label
          >
          <input
            type="text"
            class="form-control"
            id="mobile"
            @change="update_field('Knee Lead', name, 'mobile', mobile)"
            v-model="mobile"
            readonly
            style="background-color: #efeded;"
          />
        </div>
       <div class="col-sm-4">
  <label for="whatsapp_no" class="form-text-label kx-label-secondary"
    >WhatsApp No.</label
  >
  <input
    type="text"
    class="form-control"
    id="whatsapp_no"
    @input="
      update_field('Knee Lead', name, 'whatsapp_no', whatsapp_no)
    "
    v-model="whatsapp_no"
  />
</div>

        <div class="col-sm-4 mt-5">
          <input
            type="checkbox"
            class="form-check-input"
            id="same_whatsapp_no"
            @change="
              set_wa_field();
              update_field(
                'Knee Lead',
                name,
                'same_whatsapp_no',
                same_whatsapp_no
              );
            "
            v-model="same_whatsapp_no"
            true-value="1"
            false-value="0"
          />
          <label for="same_whatsapp_no" class="form-text-label">
            &nbsp; Same As Mobile</label
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Multiselect from "@vueform/multiselect";
export default {
  name: "EditBasicDetails",
  components: { Multiselect },
  props: {
    msg: String,
  },
  mounted() {
    this.get_profile_by_knee_lead();
    this.get_health_scheme();
    this.get_city_state();
    this.get_state();
    this.get_occupation();
  },
  data() {
    return {
      name: "",
      patient_full_name: "",
      gender: "",
      age: "",
      occupation: "",
      is_a_healthcare_practitioner: "",
      mobile: "",
      verified_m: "",
      whatsapp_no: "",
      verified_wa: "",
      city: "",
      state: "",
      pincode: "",
      mediclaim: "",
      mediclaim_no: "",
      tpa: "",
      health_scheme: "",
      profile_verified: "",
      patient_state: "",
      disabled: false,
      health_scheme_disabled: false,
      health_scheme_options: [],
      city_options: [],
      patient_state_options: [],
      patient_occupation_options: [],
      gender_options: ["Male", "Female", "Other"],
    };
  },
  methods: {
    get_profile_by_knee_lead: async function () {
      await axios
        .get("knee_lead.api.get_profile_by_knee_lead", {
          params: {
            mobile: this.$route.params.id,
          },
        })
        .then((response) => {
          this.name = response.data.data[0].name;
          this.patient_full_name = response.data.data[0].patient_full_name;
          this.gender = response.data.data[0].gender;
          this.age = response.data.data[0].age;
          this.occupation = response.data.data[0].occupation;
          this.is_a_healthcare_practitioner =
            response.data.data[0].is_a_healthcare_practitioner;
          this.mobile = response.data.data[0].mobile;
          this.verified_m = response.data.data[0].verified_m;
          this.whatsapp_no = response.data.data[0].whatsapp_no;
          this.verified_wa = response.data.data[0].verified_wa;
          this.city = response.data.data[0].city;
          this.patient_state = response.data.data[0].state;
          this.pincode = response.data.data[0].pincode;
          this.mediclaim = response.data.data[0].mediclaim;
          this.mediclaim_no = response.data.data[0].mediclaim_no;
          this.tpa = response.data.data[0].tpa;
          this.health_scheme = response.data.data[0].health_scheme;
          this.profile_verified = response.data.data[0].profile_verified;
          this.same_whatsapp_no = response.data.data[0].same_whatsapp_no;
        })
        .catch((error) => {});
    },
    get_health_scheme: async function () {
      await axios
        .get("knee_lead.api.get_health_scheme")
        .then((response) => {
          for (let x in response.data.data) {
            this.health_scheme_options.push(response.data.data[x].name);
          }
        })
        .catch((error) => {});
    },
    onlyNumber: function ($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },

    get_city_state: async function () {
      await axios
        .get("knee_lead.api.get_city")
        .then((response) => {
          for (let x in response.data.data) {
            this.city_options.push(response.data.data[x].city);
          }
          this.city_state_options = response.data.data;
        })
        .catch((error) => {});
    },
    get_state: async function () {
      await axios
        .get("knee_lead.api.get_state")
        .then((response) => {
          for (let x in response.data.data) {
            this.patient_state_options.push(response.data.data[x].state);
          }

          // this.
        })
        .catch((error) => {});
    },
    get_occupation: async function () {
      await axios
        .get("knee_lead.api.get_occupation")
        .then((response) => {
          for (let x in response.data.data) {
            this.patient_occupation_options.push(response.data.data[x].name);
          }
        })
        .catch((error) => {});
    },

    get_state_by_city: async function (e) {
      this.update_field("Knee Lead", this.name, "city", e);
      let patient_city_state_data = this.city_state_options;
      for (let x in patient_city_state_data) {
        if (patient_city_state_data[x].city == e) {
          await new Promise((resolve) => setTimeout(resolve, 2000));

          this.update_city_state(patient_city_state_data[x].state);
        }
      }
    },

    update_city_state: async function (e) {
      this.update_field("Knee Lead", this.name, "state", e);
      this.patient_state = e;
    },

    update_field: async function (doctype, name, fieldname, fieldvalue) {
      if (fieldname === "health_scheme") {
      }
      const formdata = {
        doctype: doctype,
        name: this.$route.params.id,
        fieldname: fieldname,
        fieldvalue: fieldvalue,
      };
      await axios
        .post("knee_lead.api.update_knee_lead_field_value", formdata)
        .then((response) => {
          this.get_profile_by_knee_lead();
          this.get_data_from_lead();
        })
        .then(this.refreshpage(fieldname))
        .catch((error) => {});
    },
    set_wa_field: function () {
      if (this.same_whatsapp_no) {
        this.whatsapp_no = this.mobile;
        setTimeout(() => {
          this.update_field(
            "Knee Lead",
            this.name,
            "whatsapp_no",
            this.whatsapp_no
          );
        }, 1000);
      } else {
        this.whatsapp_no = "";
      }
    },
    refreshpage: function (e) {
      if (e == "health_scheme") {
        setTimeout(function () {
          //do what you need here
          window.location.reload();
        }, 1000);
      }
    },
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
