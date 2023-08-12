<template>
  <div>
    <div class="card kx-card mt-5">
      <div class="row">
        <div class="col-sm-8">
          <div class="row">
            <div>
              <label
                for="xray_diagnosis_left "
                class="form-text-label kx-label-primary"
                ><strong> Xray Diagnosis </strong></label
              >
              <div class="row">
                <div class="col-sm-6">
                  <label
                    for="xray_diagnosis_left"
                    class="form-text-label kx-label-secondary"
                  >
                    Diagnosis Left
                  </label>
                  <select
                    class="form-select"
                    aria-label="xray_diagnosis_left"
                    @change="
                      update_field(
                        'Knee Lead',
                        name,
                        'xray_diagnosis_left',
                        xray_diagnosis_left
                      )
                    "
                    v-model="xray_diagnosis_left"
                  >
                    <option
                      v-for="option in xray_diagnosis_left_options"
                      :value="option"
                    >
                      {{ option }}
                    </option>
                  </select>
                  <label
                    for="xray_diagnosis_right"
                    class="form-text-label kx-label-secondary"
                    >Diagnosis Right
                  </label>
                  <select
                    class="form-select"
                    aria-label="xray_diagnosis_right"
                    @change="
                      update_field(
                        'Knee Lead',
                        name,
                        'xray_diagnosis_right',
                        xray_diagnosis_right
                      )
                    "
                    v-model="xray_diagnosis_right"
                  >
                    <option
                      v-for="option in xray_diagnosis_right_options"
                      :value="option"
                    >
                      {{ option }}
                    </option>
                  </select>
                </div>
                <div class="col-sm-6">
                  <label
                    for="deformity_left"
                    class="form-text-label kx-label-secondary"
                  >
                    Deformity Left</label
                  >
                  <select
                    class="form-select"
                    aria-label="xray_diagnosis_right"
                    @change="
                      update_field(
                        'Knee Lead',
                        name,
                        'deformity_left',
                        deformity_left
                      )
                    "
                    v-model="deformity_left"
                  >
                    <option
                      v-for="option in deformity_left_options"
                      :value="option"
                    >
                      {{ option }}
                    </option>
                  </select>

                  <label
                    for="deformity_right"
                    class="form-text-label kx-label-secondary"
                  >
                    Deformity Right</label
                  >
                  <select
                    class="form-select"
                    aria-label="deformity_right"
                    @change="
                      update_field('Knee Lead', name, 'deformity', deformity)
                    "
                    v-model="deformity"
                  >
                    <option
                      v-for="option in deformity_right_options"
                      :value="option"
                    >
                      {{ option }}
                    </option>
                  </select>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <label
                      for="mri_remark"
                      class="form-text-label kx-label-secondary"
                      >Xray Remark</label
                    >
                    <textarea
                      class="form-control"
                      @change="
                        update_field(
                          'Knee Lead',
                          name,
                          'xray_diagnosis_remarks',
                          xray_diagnosis_remarks
                        )
                      "
                      id="xray_diagnosis_remarks"
                      v-model="xray_diagnosis_remarks"
                      rows="3"
                      placeholder="Remarks"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="mt-5">
              <label
                for="xray_diagnosis_left"
                class="form-text-label kx-label-primary"
              >
                <strong>MRI Diagnosis </strong>
              </label>

              <div class="row">
                <div class="col-sm-6">
                  <label
                    for="xray_diagnosis_left"
                    class="form-text-label kx-label-secondary"
                    >Diagnosis Left
                  </label>
                  <select
                    class="form-select"
                    aria-label="xray_diagnosis_left"
                    @change="
                      update_field(
                        'Knee Lead',
                        name,
                        'mri_diagnosis_left',
                        mri_diagnosis_left
                      )
                    "
                    v-model="mri_diagnosis_left"
                  >
                    <option
                      v-for="option in mri_diagnosis_left_options"
                      :value="option"
                    >
                      {{ option }}
                    </option>
                  </select>
                  <label
                    for="xray_diagnosis_right"
                    class="form-text-label kx-label-secondary"
                  >
                    Diagnosis Right
                  </label>
                  <select
                    class="form-select"
                    aria-label="xray_diagnosis_right"
                    @change="
                      update_field(
                        'Knee Lead',
                        name,
                        'mri_diagnosis_right',
                        mri_diagnosis_right
                      )
                    "
                    v-model="mri_diagnosis_right"
                  >
                    <option
                      v-for="option in mri_diagnosis_right_options"
                      :value="option"
                    >
                      {{ option }}
                    </option>
                  </select>
                </div>
                <div class="col-sm-6">
                  <label
                    for="deformity_left"
                    class="form-text-label kx-label-secondary"
                  >
                    Deformity Left</label
                  >
                  <select
                    class="form-select"
                    aria-label="xray_diagnosis_right"
                    @change="
                      update_field(
                        'Knee Lead',
                        name,
                        'mri_deformity_left',
                        mri_deformity_left
                      )
                    "
                    v-model="mri_deformity_left"
                  >
                    <option
                      v-for="option in mri_deformity_left_options"
                      :value="option"
                    >
                      {{ option }}
                    </option>
                  </select>

                  <label
                    for="deformity_right"
                    class="form-text-label kx-label-secondary"
                  >
                    Deformity Right</label
                  >
                  <select
                    class="form-select"
                    aria-label="deformity_right"
                    @change="
                      update_field(
                        'Knee Lead',
                        name,
                        'mri_deformity_right',
                        mri_deformity_right
                      )
                    "
                    v-model="mri_deformity_right"
                  >
                    <option
                      v-for="option in mri_deformity_right_options"
                      :value="option"
                    >
                      {{ option }}
                    </option>
                  </select>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <label
                      for="mri_remark"
                      class="form-text-label kx-label-secondary"
                      >MRI Remark</label
                    >
                    <textarea
                      class="form-control"
                      id="mri_remark"
                      @change="
                        update_field(
                          'Knee Lead',
                          name,
                          'mri_assessment_remarks',
                          mri_assessment_remarks
                        )
                      "
                      v-model="mri_assessment_remarks"
                      rows="3"
                      placeholder="Remarks"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <table class="table table-bordered text-center">
            <thead>
              <tr>
                <th scope="col">Surgery</th>
                <th scope="col">Right</th>
                <th scope="col">Left</th>
              </tr>
            </thead>
            <tbody>
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
                          'xray_advise_svf_right',
                          xray_advise_svf_right
                        )
                      "
                      v-model="xray_advise_svf_right"
                      true-value="1"
                      false-value="0"
                      id="xray_advise_svf_right"
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
                          'xray_advise_svf_left',
                          xray_advise_svf_left
                        )
                      "
                      v-model="xray_advise_svf_left"
                      true-value="1"
                      false-value="0"
                      id="xray_advise_svf_left"
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
                          'xray_advise_pfo_right',
                          xray_advise_pfo_right
                        )
                      "
                      v-model="xray_advise_pfo_right"
                      true-value="1"
                      false-value="0"
                      id="xray_advise_pfo_right"
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
                          'xray_advise_pfo_left',
                          xray_advise_pfo_left
                        )
                      "
                      v-model="xray_advise_pfo_left"
                      true-value="1"
                      false-value="0"
                      id="xray_advise_pfo_left"
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
                          'xray_advise_hto_right',
                          xray_advise_hto_right
                        )
                      "
                      v-model="xray_advise_hto_right"
                      true-value="1"
                      false-value="0"
                      id="xray_advise_hto_right"
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
                          'xray_advise_hto_left',
                          xray_advise_hto_left
                        )
                      "
                      v-model="xray_advise_hto_left"
                      true-value="1"
                      false-value="0"
                      id="xray_advise_hto_left"
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
                          'xray_advise_dfo_right',
                          xray_advise_dfo_right
                        )
                      "
                      v-model="xray_advise_dfo_right"
                      true-value="1"
                      false-value="0"
                      id="xray_advise_dfo_right"
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
                          'xray_advise_dfo_left',
                          xray_advise_dfo_left
                        )
                      "
                      v-model="xray_advise_dfo_left"
                      true-value="1"
                      false-value="0"
                      id="xray_advise_dfo_left"
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
                          'xray_advise_arthoscopy_right',
                          xray_advise_arthoscopy_right
                        )
                      "
                      v-model="xray_advise_arthoscopy_right"
                      true-value="1"
                      false-value="0"
                      id="xray_advise_arthoscopy_right"
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
                          'xray_advise_arthroscopy_left',
                          xray_advise_arthroscopy_left
                        )
                      "
                      v-model="xray_advise_arthroscopy_left"
                      true-value="1"
                      false-value="0"
                      id="xray_advise_arthroscopy_left"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row" v-if="knee_complain == '1'">TKR</th>
                <td v-if="knee_complain == '1'">
                  <div>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      @change="
                        update_field(
                          'Knee Lead',
                          name,
                          'xray_advise_tkr_right',
                          xray_advise_tkr_right
                        )
                      "
                      v-model="xray_advise_tkr_right"
                      true-value="1"
                      false-value="0"
                      id="xray_advise_tkr_right"
                    />
                  </div>
                </td>
                <td v-if="knee_complain == '1'">
                  <div>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      @change="
                        update_field(
                          'Knee Lead',
                          name,
                          'xray_advise_tkr_left',
                          xray_advise_tkr_left
                        )
                      "
                      v-model="xray_advise_tkr_left"
                      true-value="1"
                      false-value="0"
                      id="xray_advise_tkr_left"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row" v-if="hip_complain == '1'">THR</th>
                <td v-if="hip_complain == '1'">
                  <div>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      @change="
                        update_field(
                          'Knee Lead',
                          name,
                          'xray_advise_thr_right',
                          xray_advise_thr_right
                        )
                      "
                      v-model="xray_advise_thr_right"
                      true-value="1"
                      false-value="0"
                      id="xray_advise_thr_right"
                    />
                  </div>
                </td>
                <td v-if="hip_complain == '1'">
                  <div>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      @change="
                        update_field(
                          'Knee Lead',
                          name,
                          'xray_advise_thr_left',
                          xray_advise_thr_left
                        )
                      "
                      v-model="xray_advise_thr_left"
                      true-value="1"
                      false-value="0"
                      id="xray_advise_thr_left"
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
</template>

<script>
import axios from "axios";

export default {
  name: "AssessmentTab",
  props: {
    msg: String,
  },
  mounted() {
    this.get_assessment();
    this.get_deformities();
    this.get_mri_deformity();
    this.get_mri_diagnosis();
    this.get_knee_xray_diagnosis();
  },
  data() {
    return {
      deformity: "",
      deformity_left: "",
      hip_xray_diagnosis_left: "",
      hip_xray_diagnosis_right: "",
      knee_xray_grade_left: "",
      knee_xray_grade_right: "",
      mri_assessment_remarks: "",
      mri_deformity_left: "",
      mri_deformity_right: "",
      mri_diagnosis_left: "",
      mri_diagnosis_right: "",
      name: "",
      pain_since: "",
      xray_advise_arthoscopy_right: "",
      xray_advise_arthroscopy_left: "",
      xray_advise_dfo_left: "",
      xray_advise_dfo_right: "",
      xray_advise_hto_left: "",
      xray_advise_hto_right: "",
      xray_advise_pfo_left: "",
      xray_advise_pfo_right: "",
      xray_advise_svf_left: "",
      xray_advise_svf_right: "",
      xray_advise_thr_left: "",
      xray_advise_thr_right: "",
      xray_advise_tkr_left: "",
      xray_advise_tkr_right: "",
      xray_diagnosis_left: "",
      xray_diagnosis_remarks: "",
      xray_diagnosis_right: "",
      deformity_left_options: [],
      deformity_right_options: [],
      mri_deformity_left_options: [],
      mri_deformity_right_options: [],
      mri_diagnosis_left_options: [],
      mri_diagnosis_right_options: [],
      xray_diagnosis_left_options: [],
      xray_diagnosis_right_options: [],
    };
  },

  methods: {
    get_knee_xray_diagnosis: async function () {
      await axios
        .get("knee_lead.api.knee_xray_diagnosis")
        .then((response) => {
          for (let x in response.data.message) {
            this.xray_diagnosis_left_options.push(response.data.message[x]);
            this.xray_diagnosis_right_options.push(response.data.message[x]);
          }
        })
        .catch((error) => {});
    },
    get_deformities: async function () {
      await axios
        .get("knee_lead.api.get_deformity")
        .then((response) => {
          for (let x in response.data.message) {
            this.deformity_left_options.push(response.data.message[x]);
            this.deformity_right_options.push(response.data.message[x]);
          }
        })
        .catch((error) => {});
    },

    get_mri_diagnosis: async function () {
      await axios
        .get("knee_lead.api.get_mri_diagnosis")
        .then((response) => {
          for (let x in response.data.message) {
            this.mri_diagnosis_left_options.push(response.data.message[x]);
            this.mri_diagnosis_right_options.push(response.data.message[x]);
          }
        })
        .catch((error) => {});
    },

    get_mri_deformity: async function () {
      await axios
        .get("knee_lead.api.get_mri_deformity")
        .then((response) => {
          for (let x in response.data.message) {
            this.mri_deformity_left_options.push(response.data.message[x]);
            this.mri_deformity_right_options.push(response.data.message[x]);
          }
        })
        .catch((error) => {});
    },
    get_assessment: async function () {
      await axios
        .get("knee_lead.api.get_assessment_by_knee_lead", {
          params: {
            mobile: this.$route.params.id,
          },
        })
        .then((response) => {
          this.deformity = response.data.data[0].deformity;
          this.deformity_left = response.data.data[0].deformity_left;
          this.hip_xray_diagnosis_left =
            response.data.data[0].hip_xray_diagnosis_left;
          this.hip_xray_diagnosis_right =
            response.data.data[0].hip_xray_diagnosis_right;
          this.knee_xray_grade_left =
            response.data.data[0].knee_xray_grade_left;
          this.knee_xray_grade_right =
            response.data.data[0].knee_xray_grade_right;
          this.mri_assessment_remarks =
            response.data.data[0].mri_assessment_remarks;
          this.mri_deformity_left = response.data.data[0].mri_deformity_left;
          this.mri_deformity_right = response.data.data[0].mri_deformity_right;
          this.mri_diagnosis_left = response.data.data[0].mri_diagnosis_left;
          this.mri_diagnosis_right = response.data.data[0].mri_diagnosis_right;
          this.name = response.data.data[0].name;
          this.pain_since = response.data.data[0].pain_since;
          this.xray_advise_arthoscopy_right =
            response.data.data[0].xray_advise_arthoscopy_right;
          this.xray_advise_arthroscopy_left =
            response.data.data[0].xray_advise_arthroscopy_left;
          this.xray_advise_dfo_left =
            response.data.data[0].xray_advise_dfo_left;
          this.xray_advise_dfo_right =
            response.data.data[0].xray_advise_dfo_right;
          this.xray_advise_hto_left =
            response.data.data[0].xray_advise_hto_left;
          this.xray_advise_hto_right =
            response.data.data[0].xray_advise_hto_right;
          this.xray_advise_pfo_left =
            response.data.data[0].xray_advise_pfo_left;
          this.xray_advise_pfo_right =
            response.data.data[0].xray_advise_pfo_right;
          this.xray_advise_svf_left =
            response.data.data[0].xray_advise_svf_left;
          this.xray_advise_svf_right =
            response.data.data[0].xray_advise_svf_right;
          this.xray_advise_thr_left =
            response.data.data[0].xray_advise_thr_left;
          this.xray_advise_thr_right =
            response.data.data[0].xray_advise_thr_right;
          this.xray_advise_tkr_left =
            response.data.data[0].xray_advise_tkr_left;
          this.xray_advise_tkr_right =
            response.data.data[0].xray_advise_tkr_right;
          this.xray_diagnosis_left = response.data.data[0].xray_diagnosis_left;
          this.xray_diagnosis_remarks =
            response.data.data[0].xray_diagnosis_remarks;
          this.xray_diagnosis_right =
            response.data.data[0].xray_diagnosis_right;
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
          this.get_assessment();
        })
        .catch((error) => {});
    },
  },
};
</script>

<style scoped lang="scss"></style>
