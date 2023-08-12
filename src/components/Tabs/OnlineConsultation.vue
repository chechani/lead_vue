<template>
  <div>
    <div class="row">
      <div class="col-sm-4">
        <div class="row">
          <div class="col">
            <label
              for="online_consult_date"
              class="form-label kx-label-secondary"
              >Online Consultation Done on</label
            >
            <VueDatePicker
              id="online_consult_date"
              @change="
                update_field_date(
                  'Knee Lead',
                  name,
                  'online_consult_date',
                  online_consult_date
                )
              "
              :option="timeoption"
              v-model="online_consult_date"
              format="dd/MM/yyyy H:I"
            ></VueDatePicker>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label for="Oc_remark" class="kx-label-secondary">Remark</label>
              {{ online_consultation_remark }}
              <textarea
                class="form-control"
                id="online_consultation_remarks"
                @change="
                  update_field(
                    'Knee Lead',
                    name,
                    'online_consultation_remarks',
                    online_consultation_remarks
                  )
                "
                v-model="online_consultation_remarks"
                rows="5"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="row"></div>
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
                <th>SVF</th>
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
                          'advise_svf_right',
                          advise_svf_right
                        )
                      "
                      v-model="advise_svf_right"
                      true-value="1"
                      false-value="0"
                      id="advise_svf_right"
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
                          'advise_svf_left',
                          advise_svf_left
                        )
                      "
                      v-model="advise_svf_left"
                      true-value="1"
                      false-value="0"
                      id="advise_svf_left"
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
                          'online_consult_patient_willingness_svf_right',
                          online_consult_patient_willingness_svf_right
                        )
                      "
                      v-model="online_consult_patient_willingness_svf_right"
                      true-value="1"
                      false-value="0"
                      id="online_consult_patient_willingness_svf_right"
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
                          'online_consult_patient_willingness_svf_left',
                          online_consult_patient_willingness_svf_left
                        )
                      "
                      v-model="online_consult_patient_willingness_svf_left"
                      true-value="1"
                      false-value="0"
                      id="online_consult_patient_willingness_svf_left"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th>PFO</th>
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
                          'advise_pfo_right',
                          advise_pfo_right
                        )
                      "
                      v-model="advise_pfo_right"
                      true-value="1"
                      false-value="0"
                      id="advise_pfo_right"
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
                          'advise_pfo_left',
                          advise_pfo_left
                        )
                      "
                      v-model="advise_pfo_left"
                      true-value="1"
                      false-value="0"
                      id="advise_pfo_left"
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
                          'online_consult_patient_willingness_pfo_right',
                          online_consult_patient_willingness_pfo_right
                        )
                      "
                      v-model="online_consult_patient_willingness_pfo_right"
                      true-value="1"
                      false-value="0"
                      id="online_consult_patient_willingness_pfo_right"
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
                          'online_consult_patient_willingness_pfo_left',
                          online_consult_patient_willingness_pfo_left
                        )
                      "
                      v-model="online_consult_patient_willingness_pfo_left"
                      true-value="1"
                      false-value="0"
                      id="online_consult_patient_willingness_pfo_left"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th>HTO</th>
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
                          'advise_hto_right',
                          advise_hto_right
                        )
                      "
                      v-model="advise_hto_right"
                      true-value="1"
                      false-value="0"
                      id="advise_hto_right"
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
                          'advise_hto_left',
                          advise_hto_left
                        )
                      "
                      v-model="advise_hto_left"
                      true-value="1"
                      false-value="0"
                      id="advise_hto_left"
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
                          'online_consult_patient_willingness_hto_right',
                          online_consult_patient_willingness_hto_right
                        )
                      "
                      v-model="online_consult_patient_willingness_hto_right"
                      true-value="1"
                      false-value="0"
                      id="online_consult_patient_willingness_hto_right"
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
                          'online_consult_patient_willingness_hto_left',
                          online_consult_patient_willingness_hto_left
                        )
                      "
                      v-model="online_consult_patient_willingness_hto_left"
                      true-value="1"
                      false-value="0"
                      id="online_consult_patient_willingness_hto_left"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th>DFO</th>
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
                          'advise_dfo_right',
                          advise_dfo_right
                        )
                      "
                      v-model="advise_dfo_right"
                      true-value="1"
                      false-value="0"
                      id="advise_dfo_right"
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
                          'advise_dfo_left',
                          advise_dfo_left
                        )
                      "
                      v-model="advise_dfo_left"
                      true-value="1"
                      false-value="0"
                      id="advise_dfo_left"
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
                          'online_consult_patient_willingness_dfo_right',
                          online_consult_patient_willingness_dfo_right
                        )
                      "
                      v-model="online_consult_patient_willingness_dfo_right"
                      true-value="1"
                      false-value="0"
                      id="online_consult_patient_willingness_dfo_right"
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
                          'online_consult_patient_willingness_dfo_left',
                          online_consult_patient_willingness_dfo_left
                        )
                      "
                      v-model="online_consult_patient_willingness_dfo_left"
                      true-value="1"
                      false-value="0"
                      id="online_consult_patient_willingness_dfo_left"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th>Arthroscopy</th>
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
                          'advise_arthroscopy_right',
                          advise_arthroscopy_right
                        )
                      "
                      v-model="advise_arthroscopy_right"
                      true-value="1"
                      false-value="0"
                      id="advise_arthroscopy_right"
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
                          'advise_arthroscopy_left',
                          advise_arthroscopy_left
                        )
                      "
                      v-model="advise_arthroscopy_left"
                      true-value="1"
                      false-value="0"
                      id="advise_arthroscopy_left"
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
                          'online_consult_patient_willingness_arthroscopy_right',
                          online_consult_patient_willingness_arthroscopy_right
                        )
                      "
                      v-model="
                        online_consult_patient_willingness_arthroscopy_right
                      "
                      true-value="1"
                      false-value="0"
                      id="online_consult_patient_willingness_arthroscopy_right"
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
                          'online_consult_patient_willingness_arthroscopy_left',
                          online_consult_patient_willingness_arthroscopy_left
                        )
                      "
                      v-model="
                        online_consult_patient_willingness_arthroscopy_left
                      "
                      true-value="1"
                      false-value="0"
                      id="online_consult_patient_willingness_arthroscopy_left"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th>TKR</th>
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
                          'advise_tkr_right',
                          advise_tkr_right
                        )
                      "
                      v-model="advise_tkr_right"
                      true-value="1"
                      false-value="0"
                      id="advise_tkr_right"
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
                          'advise_tkr_left',
                          advise_tkr_left
                        )
                      "
                      v-model="advise_tkr_left"
                      true-value="1"
                      false-value="0"
                      id="advise_tkr_left"
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
                          'online_consult_patient_willingness_tkr_right',
                          online_consult_patient_willingness_tkr_right
                        )
                      "
                      v-model="online_consult_patient_willingness_tkr_right"
                      true-value="1"
                      false-value="0"
                      id="online_consult_patient_willingness_tkr_right"
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
                          'online_consult_patient_willingness_tkr_left',
                          online_consult_patient_willingness_tkr_left
                        )
                      "
                      v-model="online_consult_patient_willingness_tkr_left"
                      true-value="1"
                      false-value="0"
                      id="online_consult_patient_willingness_tkr_left"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th>THR</th>
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
                          'advise_thr_right',
                          advise_thr_right
                        )
                      "
                      v-model="advise_thr_right"
                      true-value="1"
                      false-value="0"
                      id="advise_thr_right"
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
                          'advise_thr_left',
                          advise_thr_left
                        )
                      "
                      v-model="advise_thr_left"
                      true-value="1"
                      false-value="0"
                      id="advise_thr_left"
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
                          'online_consult_patient_willingness_thr_right',
                          online_consult_patient_willingness_thr_right
                        )
                      "
                      v-model="online_consult_patient_willingness_thr_right"
                      true-value="1"
                      false-value="0"
                      id="online_consult_patient_willingness_thr_right"
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
                          'online_consult_patient_willingness_thr_left',
                          online_consult_patient_willingness_thr_left
                        )
                      "
                      v-model="online_consult_patient_willingness_thr_left"
                      true-value="1"
                      false-value="0"
                      id="online_consult_patient_willingness_thr_left"
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
  name: "OnlineConsultationTab",
  props: {
    msg: String,
  },
  mounted() {
    this.get_online_consultation();
  },
  data() {
    return {
      advise_arthroscopy_left: "",
      advise_arthroscopy_right: "",
      advise_dfo_left: "",
      advise_dfo_right: "",
      advise_hto_left: "",
      advise_hto_right: "",
      advise_pfo_left: "",
      advise_pfo_right: "",
      advise_svf_left: "",
      advise_svf_right: "",
      advise_thr_left: "",
      advise_thr_right: "",
      advise_tkr_left: "",
      advise_tkr_right: "",
      name: "",
      online_consult_by: "",
      online_consult_date: new Date().toISOString().slice(0, 10),
      online_consult_exercise_shared: "",
      online_consult_follow_up_date: "",
      online_consult_next_follow_up_date: "",
      online_consult_patient_willingness_arthroscopy_left: "",
      online_consult_patient_willingness_arthroscopy_right: "",
      online_consult_patient_willingness_dfo_left: "",
      online_consult_patient_willingness_dfo_right: "",
      online_consult_patient_willingness_hto_left: "",
      online_consult_patient_willingness_hto_right: "",
      online_consult_patient_willingness_pfo_left: "",
      online_consult_patient_willingness_pfo_right: "",
      online_consult_patient_willingness_svf_left: "",
      online_consult_patient_willingness_svf_right: "",
      online_consult_patient_willingness_thr_left: "",
      online_consult_patient_willingness_thr_right: "",
      online_consult_patient_willingness_tkr_left: "",
      online_consult_patient_willingness_tkr_right: "",
      online_consult_request_date_time: "",
      online_consultation_remarks: "",
      online_consultation_remark: "",
    };
  },
  methods: {
    get_online_consultation: async function () {
      await axios
        .get("knee_lead.api.get_online_consultation_by_knee_lead", {
          params: {
            mobile: this.$route.params.id,
          },
        })
        .then((response) => {
          this.online_consultation_remarks =
            response.data.data[0].online_consultation_remarks;
          this.advise_arthroscopy_left =
            response.data.data[0].advise_arthroscopy_left;
          this.advise_arthroscopy_right =
            response.data.data[0].advise_arthroscopy_right;
          this.advise_dfo_left = response.data.data[0].advise_dfo_left;
          this.advise_dfo_right = response.data.data[0].advise_dfo_right;
          this.advise_hto_left = response.data.data[0].advise_hto_left;
          this.advise_hto_right = response.data.data[0].advise_hto_right;
          this.advise_pfo_left = response.data.data[0].advise_pfo_left;
          this.advise_pfo_right = response.data.data[0].advise_pfo_right;
          this.advise_svf_left = response.data.data[0].advise_svf_left;
          this.advise_svf_right = response.data.data[0].advise_svf_right;
          this.advise_thr_left = response.data.data[0].advise_thr_left;
          this.advise_thr_right = response.data.data[0].advise_thr_right;
          this.advise_tkr_left = response.data.data[0].advise_tkr_left;
          this.advise_tkr_right = response.data.data[0].advise_tkr_right;
          this.name = response.data.data[0].name;
          this.online_consult_by = response.data.data[0].online_consult_by;

          this.online_consult_exercise_share =
            response.data.data[0].online_consult_exercise_share;
          this.online_consult_follow_up_date =
            response.data.data[0].online_consult_follow_up_date;
          this.online_consult_next_follow_up_date =
            response.data.data[0].online_consult_next_follow_up_date;
          this.online_consult_patient_willingness_arthroscopy_left =
            response.data.data[0].online_consult_patient_willingness_arthroscopy_left;
          this.online_consult_patient_willingness_arthroscopy_right =
            response.data.data[0].online_consult_patient_willingness_arthroscopy_right;
          this.online_consult_patient_willingness_dfo_left =
            response.data.data[0].online_consult_patient_willingness_dfo_left;
          this.online_consult_patient_willingness_dfo_right =
            response.data.data[0].online_consult_patient_willingness_dfo_right;
          this.online_consult_patient_willingness_hto_left =
            response.data.data[0].online_consult_patient_willingness_hto_left;
          this.online_consult_patient_willingness_hto_right =
            response.data.data[0].online_consult_patient_willingness_hto_right;
          this.online_consult_patient_willingness_pfo_left =
            response.data.data[0].online_consult_patient_willingness_pfo_left;
          this.online_consult_patient_willingness_pfo_right =
            response.data.data[0].online_consult_patient_willingness_pfo_right;
          this.online_consult_patient_willingness_svf_left =
            response.data.data[0].online_consult_patient_willingness_svf_left;
          this.online_consult_patient_willingness_svf_right =
            response.data.data[0].online_consult_patient_willingness_svf_right;
          this.online_consult_patient_willingness_thr_left =
            response.data.data[0].online_consult_patient_willingness_thr_left;
          this.online_consult_patient_willingness_thr_right =
            response.data.data[0].online_consult_patient_willingness_thr_right;
          this.online_consult_patient_willingness_tkr_left =
            response.data.data[0].online_consult_patient_willingness_tkr_left;
          this.online_consult_patient_willingness_tkr_right =
            response.data.data[0].online_consult_patient_willingness_tkr_right;
          this.online_consult_request_date_time =
            response.data.data[0].online_consult_request_date_time;
          this.online_consultation_remarks =
            response.data.data[0].online_consultation_remarks;

          this.online_consult_date = date(
            response.data.data[0].online_consult_date
          );
        })
        .catch((error) => {});
    },
    //

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
          this.get_online_consultation();
        })
        .catch((error) => {});
    },
  },
};
</script>

<style scoped lang="scss"></style>
