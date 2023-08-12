<template>
  <div>
    <div>
      <div class="row">
        <div class="col-sm-4">
          <div class="row">
            <div class="col">
              <label for="opd_date" class="form-label kx-label-secondary">
                OPD Consultation Done on</label
              >
              <VueDatePicker
                id="opd_date"
                v-model="opd_date"
                format="dd/MM/yyyy H:I"
              ></VueDatePicker>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label for="opd_remarks " class="kx-label-secondary"
                  >Remark</label
                >
                <textarea
                  class="form-control"
                  @change="
                    update_field('Knee Lead', name, 'opd_remarks', opd_remarks)
                  "
                  id="opd_remarks"
                  rows="5"
                  placeholder="Remarks"
                  v-model="opd_remarks"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="row">
            <table class="table table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col">Surgery</th>
                  <th scope="col" colspan="2">Advice</th>
                  <th scope="col" colspan="2">Willing</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th></th>
                  <td style="color: red">Right</td>
                  <td style="color: blue">Left</td>
                  <td style="color: red">Right</td>
                  <td style="color: blue">Left</td>
                </tr>
                <tr>
                  <th scope="row">SVF</th>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_advise_svf_right',
                            opd_advise_svf_right
                          )
                        "
                        v-model="opd_advise_svf_right"
                        true-value="1"
                        false-value="0"
                        id="opd_advise_svf_right"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_advise_svf_left',
                            opd_advise_svf_left
                          )
                        "
                        v-model="opd_advise_svf_left"
                        true-value="1"
                        false-value="0"
                        id="opd_advise_svf_left"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_patient_willingness_svf_right',
                            opd_patient_willingness_svf_right
                          )
                        "
                        v-model="opd_patient_willingness_svf_right"
                        true-value="1"
                        false-value="0"
                        id="opd_patient_willingness_svf_right"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_patient_willingness_svf_left',
                            opd_patient_willingness_svf_left
                          )
                        "
                        v-model="opd_patient_willingness_svf_left"
                        true-value="1"
                        false-value="0"
                        id="opd_patient_willingness_svf_left"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">PFO</th>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_advise_pfo_right',
                            opd_advise_pfo_right
                          )
                        "
                        v-model="opd_advise_pfo_right"
                        true-value="1"
                        false-value="0"
                        id="opd_advise_pfo_right"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_advise_pfo_left',
                            opd_advise_pfo_left
                          )
                        "
                        v-model="opd_advise_pfo_left"
                        true-value="1"
                        false-value="0"
                        id="opd_advise_pfo_left"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_patient_willingness_pfo_right',
                            opd_patient_willingness_pfo_right
                          )
                        "
                        v-model="opd_patient_willingness_pfo_right"
                        true-value="1"
                        false-value="0"
                        id="opd_patient_willingness_pfo_right"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_patient_willingness_pfo_left',
                            opd_patient_willingness_pfo_left
                          )
                        "
                        v-model="opd_patient_willingness_pfo_left"
                        true-value="1"
                        false-value="0"
                        id="opd_patient_willingness_pfo_left"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">HTO</th>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_advise_hto_right',
                            opd_advise_hto_right
                          )
                        "
                        v-model="opd_advise_hto_right"
                        true-value="1"
                        false-value="0"
                        id="opd_advise_hto_right"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_advise_hto_left',
                            opd_advise_hto_left
                          )
                        "
                        v-model="opd_advise_hto_left"
                        true-value="1"
                        false-value="0"
                        id="opd_advise_hto_left"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_patient_willingness_hto_right',
                            opd_patient_willingness_hto_right
                          )
                        "
                        v-model="opd_patient_willingness_hto_right"
                        true-value="1"
                        false-value="0"
                        id="opd_patient_willingness_hto_right"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_patient_willingness_hto_left',
                            opd_patient_willingness_hto_left
                          )
                        "
                        v-model="opd_patient_willingness_hto_left"
                        true-value="1"
                        false-value="0"
                        id="opd_patient_willingness_hto_left"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">DFO</th>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_advise_dfo_right',
                            opd_advise_dfo_right
                          )
                        "
                        v-model="opd_advise_dfo_right"
                        true-value="1"
                        false-value="0"
                        id="opd_advise_dfo_right"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_advise_dfo_left',
                            opd_advise_dfo_left
                          )
                        "
                        v-model="opd_advise_dfo_left"
                        true-value="1"
                        false-value="0"
                        id="opd_advise_dfo_left"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_patient_willingness_dfo_right',
                            opd_patient_willingness_dfo_right
                          )
                        "
                        v-model="opd_patient_willingness_dfo_right"
                        true-value="1"
                        false-value="0"
                        id="opd_patient_willingness_dfo_right"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_patient_willingness_dfo_left',
                            opd_patient_willingness_dfo_left
                          )
                        "
                        v-model="opd_patient_willingness_dfo_left"
                        true-value="1"
                        false-value="0"
                        id="opd_patient_willingness_dfo_left"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Arthroscopy</th>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_advise_arthro_right',
                            opd_advise_arthro_right
                          )
                        "
                        v-model="opd_advise_arthro_right"
                        true-value="1"
                        false-value="0"
                        id="opd_advise_arthro_right"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_advise_arthro_left',
                            opd_advise_arthro_left
                          )
                        "
                        v-model="opd_advise_arthro_left"
                        true-value="1"
                        false-value="0"
                        id="opd_advise_arthro_left"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_patient_willingness_arthro_right',
                            opd_patient_willingness_arthro_right
                          )
                        "
                        v-model="opd_patient_willingness_arthro_right"
                        true-value="1"
                        false-value="0"
                        id="opd_patient_willingness_arthro_right"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_patient_willingness_arthro_left',
                            opd_patient_willingness_arthro_left
                          )
                        "
                        v-model="opd_patient_willingness_arthro_left"
                        true-value="1"
                        false-value="0"
                        id="opd_patient_willingness_arthro_left"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">TKR</th>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_advise_tkr_right',
                            opd_advise_tkr_right
                          )
                        "
                        v-model="opd_advise_tkr_right"
                        true-value="1"
                        false-value="0"
                        id="opd_advise_tkr_right"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_advise_tkr_left',
                            opd_advise_tkr_left
                          )
                        "
                        v-model="opd_advise_tkr_left"
                        true-value="1"
                        false-value="0"
                        id="opd_advise_tkr_left"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_patient_willingness_tkr_right',
                            opd_patient_willingness_tkr_right
                          )
                        "
                        v-model="opd_patient_willingness_tkr_right"
                        true-value="1"
                        false-value="0"
                        id="opd_patient_willingness_tkr_right"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_patient_willingness_tkr_left',
                            opd_patient_willingness_tkr_left
                          )
                        "
                        v-model="opd_patient_willingness_tkr_left"
                        true-value="1"
                        false-value="0"
                        id="opd_patient_willingness_tkr_left"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">THR</th>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_advise_thr_right',
                            opd_advise_thr_right
                          )
                        "
                        v-model="opd_advise_thr_right"
                        true-value="1"
                        false-value="0"
                        id="opd_advise_thr_right"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_advise_thr_left',
                            opd_advise_thr_left
                          )
                        "
                        v-model="opd_advise_thr_left"
                        true-value="1"
                        false-value="0"
                        id="opd_advise_thr_left"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_patient_willingness_thr_right',
                            opd_patient_willingness_thr_right
                          )
                        "
                        v-model="opd_patient_willingness_thr_right"
                        true-value="1"
                        false-value="0"
                        id="opd_patient_willingness_thr_right"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        @change="
                          update_field(
                            'Knee Lead',
                            name,
                            'opd_patient_willingness_thr_left',
                            opd_patient_willingness_thr_left
                          )
                        "
                        v-model="opd_patient_willingness_thr_left"
                        true-value="1"
                        false-value="0"
                        id="opd_patient_willingness_thr_left"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "OpdConsultationTab",
  props: {
    msg: String,
  },
  mounted() {
    this.get_opd_consultation();
  },
  data() {
    return {
      name: "",
      opd_date: new Date().toISOString().slice(0, 10),
      opd_request_date_time: null,
      opd_by: null,
      opd_follow_up_date: null,
      opd_exercise_shared: null,
      opd_next_follow_up_date: null,
      opd_advise_svf_left: null,
      opd_advise_pfo_left: null,
      opd_advise_hto_left: null,
      opd_advise_dfo_left: null,
      opd_advise_arthro_left: null,
      opd_advise_tkr_left: null,
      opd_advise_thr_left: null,
      opd_advise_svf_right: null,
      opd_advise_pfo_right: null,
      opd_advise_hto_right: null,
      opd_advise_dfo_right: null,
      opd_advise_arthro_right: null,
      opd_advise_tkr_right: null,
      opd_advise_thr_right: null,
      opd_patient_willingness_svf_left: null,
      opd_patient_willingness_pfo_left: null,
      opd_patient_willingness_hto_left: null,
      opd_patient_willingness_dfo_left: null,
      opd_patient_willingness_arthro_left: null,
      opd_patient_willingness_tkr_left: null,
      opd_patient_willingness_thr_left: null,
      opd_patient_willingness_svf_right: null,
      opd_patient_willingness_pfo_right: null,
      opd_patient_willingness_hto_right: null,
      opd_patient_willingness_dfo_right: null,
      opd_patient_willingness_arthro_right: null,
      opd_patient_willingness_tkr_right: null,
      opd_patient_willingness_thr_right: null,
      opd_remarks: "",
    };
  },
  methods: {
    get_opd_consultation: async function () {
      await axios
        .get("knee_lead.api.get_opd_consultation_by_knee_lead", {
          params: {
            mobile: this.$route.params.id,
          },
        })
        .then((response) => {
          for (let x in response.data.data) {
            this.name = response.data.data[x].name;
            this.opd_request_date_time =
              response.data.data[x].opd_request_date_time;

            this.opd_by = response.data.data[x].opd_by;

            this.opd_follow_up_date = response.data.data[x].opd_follow_up_date;

            this.opd_exercise_shared =
              response.data.data[x].opd_exercise_shared;
            this.opd_next_follow_up_date =
              response.data.data[x].opd_next_follow_up_date;
            this.opd_advise_svf_left =
              response.data.data[x].opd_advise_svf_left;
            this.opd_advise_pfo_left =
              response.data.data[x].opd_advise_pfo_left;
            this.opd_advise_hto_left =
              response.data.data[x].opd_advise_hto_left;
            this.opd_advise_dfo_left =
              response.data.data[x].opd_advise_dfo_left;
            this.opd_advise_arthro_left =
              response.data.data[x].opd_advise_arthro_left;
            this.opd_advise_tkr_left =
              response.data.data[x].opd_advise_tkr_left;
            this.opd_advise_thr_left =
              response.data.data[x].opd_advise_thr_left;
            this.opd_advise_svf_right =
              response.data.data[x].opd_advise_svf_right;
            this.opd_advise_pfo_right =
              response.data.data[x].opd_advise_pfo_right;
            this.opd_advise_hto_right =
              response.data.data[x].opd_advise_hto_right;
            this.opd_advise_dfo_right =
              response.data.data[x].opd_advise_dfo_right;
            this.opd_advise_arthro_right =
              response.data.data[x].opd_advise_arthro_right;
            this.opd_advise_tkr_right =
              response.data.data[x].opd_advise_tkr_right;
            this.opd_advise_thr_right =
              response.data.data[x].opd_advise_thr_right;
            this.opd_patient_willingness_svf_left =
              response.data.data[x].opd_patient_willingness_svf_left;
            this.opd_patient_willingness_pfo_left =
              response.data.data[x].opd_patient_willingness_pfo_left;
            this.opd_patient_willingness_hto_left =
              response.data.data[x].opd_patient_willingness_hto_left;
            this.opd_patient_willingness_dfo_left =
              response.data.data[x].opd_patient_willingness_dfo_left;
            this.opd_patient_willingness_arthro_left =
              response.data.data[x].opd_patient_willingness_arthro_left;
            this.opd_patient_willingness_tkr_left =
              response.data.data[x].opd_patient_willingness_tkr_left;
            this.opd_patient_willingness_thr_left =
              response.data.data[x].opd_patient_willingness_thr_left;
            this.opd_patient_willingness_svf_right =
              response.data.data[x].opd_patient_willingness_svf_right;
            this.opd_patient_willingness_pfo_right =
              response.data.data[x].opd_patient_willingness_pfo_right;
            this.opd_patient_willingness_hto_right =
              response.data.data[x].opd_patient_willingness_hto_right;
            this.opd_patient_willingness_dfo_right =
              response.data.data[x].opd_patient_willingness_dfo_right;
            this.opd_patient_willingness_arthro_right =
              response.data.data[x].opd_patient_willingness_arthro_right;
            this.opd_patient_willingness_tkr_right =
              response.data.data[x].opd_patient_willingness_tkr_right;
            this.opd_patient_willingness_thr_right =
              response.data.data[x].opd_patient_willingness_thr_right;
            this.opd_remarks = response.data.data[x].opd_remarks;
            this.opd_date = date(response.data.data[x].opd_date);
          }
        })
        .catch((error) => {});
    },
    update_field: async function (doctype, name, fieldname, fieldvalue) {
      const formdata = {
        doctype: doctype,
        name: name,
        fieldname: fieldname,
        fieldvalue: fieldvalue,
      };
      await axios
        .post("knee_lead.api.update_knee_lead_field_value", formdata)
        .then((response) => {
          this.get_opd_consultation();
        })
        .catch((error) => {});
    },
  },
};
</script>

<style scoped lang="scss"></style>
