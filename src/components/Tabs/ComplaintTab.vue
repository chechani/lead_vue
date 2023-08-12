<template>
  <div>
    <div class="col-sm-12 card kx-card">
      <div class="row mt-3">
        <div class="col-sm-6">
          <div class="row">
            <div class="col-sm-2 mt-3">
              <div class="form-check">
                <input
                  :disabled="complaint_disabled"
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  @change="
                    update_field(
                      'Knee Lead',
                      name,
                      'knee_complain',
                      knee_complain
                    )
                  "
                  v-model="knee_complain"
                  true-value="1"
                  false-value="0"
                  id="Knee"
                />
                <label class="form-check-label" for="Knee"> Knee </label>
              </div>

              <div class="form-check" v-if="knee_complain == '1'">
                <input
                  :disabled="complaint_disabled"
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  @change="
                    update_field('Knee Lead', name, 'knee_left', knee_left)
                  "
                  v-model="knee_left"
                  true-value="1"
                  false-value="0"
                  id="KneeLeft"
                />
                <label class="form-check-label left" for="KneeLeft">
                  Left
                </label>
              </div>

              <div class="form-check" v-if="knee_complain == '1'">
                <input
                  :disabled="complaint_disabled"
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  @change="
                    update_field('Knee Lead', name, 'knee_right', knee_right)
                  "
                  v-model="knee_right"
                  true-value="1"
                  false-value="0"
                  id="KneeRight"
                />
                <label class="form-check-label right" for="KneeRight">
                  Right
                </label>
              </div>
            </div>
            <div class="col-sm-2 mt-3">
              <div class="form-check">
                <input
                  :disabled="complaint_disabled"
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  @change="
                    update_field(
                      'Knee Lead',
                      name,
                      'hip_complain',
                      hip_complain
                    )
                  "
                  v-model="hip_complain"
                  true-value="1"
                  false-value="0"
                  id="Hip"
                />
                <label class="form-check-label" for="Hip"> Hip </label>
              </div>

              <div class="form-check" v-if="hip_complain == '1'">
                <input
                  :disabled="complaint_disabled"
                  class="form-check-input left"
                  type="checkbox"
                  value=""
                  @change="
                    update_field('Knee Lead', name, 'hip_left', hip_left)
                  "
                  v-model="hip_left"
                  true-value="1"
                  false-value="0"
                  id="HipLeft"
                />
                <label class="form-check-label left" for="HipLeft">
                  Left
                </label>
              </div>

              <div class="form-check" v-if="hip_complain == '1'">
                <input
                  :disabled="complaint_disabled"
                  class="form-check-input right"
                  type="checkbox"
                  value=""
                  @change="
                    update_field('Knee Lead', name, 'hip_right', hip_right)
                  "
                  v-model="hip_right"
                  true-value="1"
                  false-value="0"
                  id="HipRight"
                />
                <label class="form-check-label right" for="HipRight">
                  Right
                </label>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="row" v-if="pain_since">
                <div class="col mt-3">
                  <label
                    class="form-select-label kx-label-secondary"
                    for="PainSince"
                    >Pain Since</label
                  >
                  {{ pain_since }}
                </div>
                <div class="col">
                  <label
                    for="MonthsYears"
                    class="form-text-label kx-label-secondary"
                  ></label>
                  <label
                    for="MonthsYears"
                    class="form-text-label kx-label-secondary"
                    v-if="pain_since == ''"
                    >Years</label
                  >

                  <input
                    :disabled="complaint_disabled"
                    type="text"
                    class="form-control"
                    id="MonthsYears"
                    :maxlength="2"
                    @change="
                      update_field(
                        'Knee Lead',
                        name,
                        'pain_since_years',
                        pain_since_years
                      )
                    "
                    @keypress="onlyNumber"
                    v-model="pain_since_years"
                  />
                </div>
              </div>

              <div class="row" v-else>
                <div class="col">
                  <label
                    class="form-select-label kx-label-secondary"
                    for="PainSince"
                    >Pain Since</label
                  ><br />
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      @change="
                        update_field(
                          'Knee Lead',
                          name,
                          'pain_since',
                          pain_since
                        )
                      "
                      value="Months"
                      v-model="pain_since"
                    />
                    <label class="form-check-label" for="inlineRadio1"
                      >Months</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      @change="
                        update_field(
                          'Knee Lead',
                          name,
                          'pain_since',
                          pain_since
                        )
                      "
                      value="Years"
                      v-model="pain_since"
                    />
                    <label class="form-check-label" for="inlineRadio2"
                      >Years</label
                    >
                  </div>
                  <br />
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio3"
                      @change="
                        update_field(
                          'Knee Lead',
                          name,
                          'pain_since',
                          pain_since
                        )
                      "
                      value="Days"
                      v-model="pain_since"
                    />
                    <label class="form-check-label" for="inlineRadio3"
                      >Day's</label
                    >
                  </div>
                </div>
                <div class="col">
                  <label
                    for="MonthsYears"
                    class="form-text-label kx-label-secondary"
                    >{{ pain_since }}</label
                  >
                  <label
                    for="MonthsYears"
                    class="form-text-label kx-label-secondary"
                    v-if="pain_since == ''"
                    >Years</label
                  >
                  <input
                    :disabled="complaint_disabled"
                    type="text"
                    class="form-control"
                    id="MonthsYears"
                    :maxlength="2"
                    @change="
                      update_field(
                        'Knee Lead',
                        name,
                        'pain_since_years',
                        pain_since_years
                      )
                    "
                    v-model="pain_since_years"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label
                    class="form-select-label kx-label-secondary"
                    for="PainLocation"
                    >Pain Location</label
                  >
                  <select
                    :disabled="complaint_disabled"
                    class="form-select"
                    aria-label="PainLocation"
                    @change="
                      update_field(
                        'Knee Lead',
                        name,
                        'pain_location',
                        pain_location
                      )
                    "
                    v-model="pain_location"
                  >
                    <option
                      v-for="option in pain_location_option"
                      :value="option"
                    >
                      {{ option }}
                    </option>
                  </select>
                </div>
                <div class="col">
                  <label
                    class="form-select-label kx-label-secondary"
                    for="PainLocation"
                    >Pain increase while</label
                  >
                  <select
                    :disabled="complaint_disabled"
                    class="form-select"
                    aria-label="PainLocation"
                    @change="
                      update_field(
                        'Knee Lead',
                        name,
                        'pain_increase_while',
                        pain_increase_while
                      )
                    "
                    v-model="pain_increase_while"
                  >
                    <option
                      v-for="option in pain_increase_while_options"
                      :value="option"
                    >
                      {{ option }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label class="form-label kx-label-secondary" for="Height"
                    >Height(in Feet)</label
                  >
                  <input
                    :disabled="complaint_disabled"
                    type="text"
                    pattern="\d*"
                    class="form-control"
                    id="Height"
                    @change="
                      update_field('Knee Lead', name, 'height', patient_height);
                      calculate_bmi();
                    "
                    @keypress="onlyNumber"
                    v-model="patient_height"
                  />
                </div>
                <div class="col">
                  <label
                    class="form-select-label kx-label-secondary"
                    for="Weight"
                    >Weight(in kg)</label
                  >
                  <input
                    :disabled="complaint_disabled"
                    type="text"
                    pattern="\d*"
                    class="form-control"
                    id="Weight"
                    @change="
                      update_field('Knee Lead', name, 'weight', patient_weight);
                      calculate_bmi();
                    "
                    @keypress="onlyNumber"
                    v-model="patient_weight"
                  />
                </div>
                <div class="col" v-if="patient_bmi">
                  <label class="form-select-label kx-label-secondary" for="BMI"
                    >BMI
                  </label>
                  <input
                    disabled
                    type="text"
                    class="form-control"
                    id="BMI"
                    v-model="patient_bmi"
                  />
                </div>
                <div class="col" v-else>
                  <label class="form-select-label kx-label-secondary" for="BMI"
                    >BMI
                  </label>
                  <button
                    type="button"
                    class="btn btn-light form-control"
                    @click="calculate_bmi"
                  >
                    Calc
                  </button>
                  <!-- <input :disabled="complaint_disabled" type="text" class="form-control" id="BMI"   v-model="patient_bmi" > -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-5">
          <div>
            <label for="PatientComplaint" class="form-label kx-label-secondary"
              >Complaint</label
            >
            <textarea
              :disabled="complaint_disabled"
              class="form-control"
              id="PatientComplaint"
              rows="5"
              @change="
                update_field('Knee Lead', name, 'pain_complain', pain_complain)
              "
              v-model="pain_complain"
              placeholder="in words.."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ComplaintTab",
  props: {
    msg: String,
  },
  mounted: function () {
    this.get_pain_location();
    this.get_pain_increase_while();
    this.get_complaint_by_knee_lead();
  },
  data() {
    return {
      name: "",
      patient_weight: "",
      patient_height: "",
      knee_complain: "",
      knee_left: "",
      knee_right: "",
      hip_complain: "",
      hip_left: "",
      hip_right: "",
      pain_since_years: "",
      pain_since: "",
      pain_since_years: "",
      pain_location: "",
      pain_increase_while: "",
      patient_bmi: "",
      pain_complain: "",
      pain_location_option: [],
      pain_increase_while_options: [],
      complaint_disabled: false,
    };
  },
  methods: {
    get_pain_increase_while: async function () {
      await axios
        .get("knee_lead.api.get_pain_increase_while")
        .then((response) => {
          for (let x in response.data.message) {
            this.pain_increase_while_options.push(response.data.message[x]);
          }
        })
        .catch((error) => {});
    },
    get_pain_location: async function () {
      await axios
        .get("knee_lead.api.get_pain_location")
        .then((response) => {
          for (let x in response.data.message) {
            this.pain_location_option.push(response.data.message[x]);
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

    get_complaint_by_knee_lead: async function () {
      await axios
        .get("knee_lead.api.get_complaint_by_knee_lead", {
          params: {
            mobile: this.$route.params.id,
          },
        })
        .then((response) => {
          this.name = response.data.data[0].name;
          this.patient_height = response.data.data[0].height;
          this.patient_weight = response.data.data[0].weight;
          this.knee_complain = response.data.data[0].knee_complain;
          this.knee_left = response.data.data[0].knee_left;
          this.knee_right = response.data.data[0].knee_right;
          this.hip_complain = response.data.data[0].hip_complain;
          this.hip_left = response.data.data[0].hip_left;
          this.hip_right = response.data.data[0].hip_right;
          this.pain_since_years = response.data.data[0].pain_since_years;
          this.pain_since = response.data.data[0].pain_since;
          this.pain_since_years = response.data.data[0].pain_since_years;
          this.pain_location = response.data.data[0].pain_location;
          this.pain_increase_while = response.data.data[0].pain_increase_while;
          this.patient_bmi = response.data.data[0].patient_bmi;
          this.pain_complain = response.data.data[0].pain_complain;
        })
        .catch((error) => {});
    },
    calculate_bmi: function () {
      let p_height = this.patient_height * 0.3048;

      this.patient_bmi = (this.patient_weight / (p_height * p_height)).toFixed(
        1
      );
    },

    toFeet: function (n) {
      var realFeet = (n * 0.3937) / 12;
      var feet = Math.floor(realFeet);
      var inches = Math.round((realFeet - feet) * 12);
      return feet + "." + inches;
    },
    update_field: async function (doctype, name, fieldname, fieldvalue) {
      if (fieldname == "patient_height") {
        let fieldvalue = this.patient_height;
      }

      const formdata = {
        doctype: doctype,
        name: name,
        fieldname: fieldname,
        fieldvalue: fieldvalue,
      };
      await axios
        .post("knee_lead.api.update_knee_lead_field_value", formdata)
        .then((response) => {
          if (pain_since) {
          } else {
          }
        })
        .catch((error) => {});
    },
  },
};
</script>

<style scoped lang="scss"></style>
