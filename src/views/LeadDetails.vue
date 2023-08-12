<template>
  <SideBaar></SideBaar>
  <div class="content">
    <Header></Header>
    <div v-if="loading" class="loader" id="kxloader">
      <img alt="Maleyoung" src="../assets/img/kxloader.gif" />
    </div>

    <div class="container-fluid" v-else>
      <div class="card kx-card mt-5" v-on:dblclick="editdetails()">
        <div class="row">
          <div class="col-sm-8">
            <!-- start Basic Details -->
            <BasicDetails
              :editable="editbasicdata"
              :items="items"
              @myVarChanged="health_scheme"
            />
            <!-- end basic details -->
          </div>
          <div class="col-sm-4">
            <div class="row">
              <div class="col">
                <label class="form-select-label kx-label-secondary" for="State"
                  >Status</label
                >

                <select
                  class="form-select"
                  aria-label="State"
                  @change="
                    update_field(
                      'Knee Lead',
                      name,
                      'knee_lead_status',
                      knee_lead_status
                    )
                  "
                  v-model="knee_lead_status"
                >
                  <option v-for="option in lead_status_options" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label class="form-select-label kx-label-secondary" for="State"
                  >Tags</label
                >
                <Multiselect
                  v-model="tags"
                  mode="tags"
                  placeholder="Select your characters"
                  :datasource="tag_options"
                  :fields="tag_options_fields"
                  :options="tag_options"
                  :searchable="true"
                  :createTag="true"
                  :on-select="save_tags()"
                  :on-tag="addTag"
                  :allow-empty="false"
                  :on-remove="(tag) => remove_tags(tag)"
                >
                </Multiselect>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <label class="form-select-label kx-label-secondary" for="State"
                  >Camp
                </label>

                <input
                  list="brow"
                  v-model="camp"
                  class="form-select"
                  @change="update_field('Knee Lead', name, 'camp', camp)"
                />
                <datalist id="brow">
                  <option v-for="option in camp_options" :value="option">
                    {{ option }}
                  </option>
                </datalist>
              </div>
            </div>
            <div class="row">
              <div class="col mt-4">
                <button
                  class="btn btn-sm btn-success kx-button"
                  style="color: white; margin-right: 2px"
                  @click="click2call($route.params.id)"
                >
                  <i class="fa fa-phone icon-rotate" aria-hidden="true"></i>
                  Call
                </button>
                <button
                  class="btn btn-sm btn-info kx-button"
                  style="color: white; margin-right: 2px"
                  @click="fnShowShareModel($route.params.id)"
                >
                  <i class="fas fa-share-alt icon-rotate"></i>
                  Share
                </button>
                <button
                  class="btn btn-sm btn-info kx-button"
                  style="color: white; margin-right: 2px"
                  @click="fnShowShareWaModel(name)"
                >
                  <i class="fas fa-share icon-rotate"></i>
                  Send WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card kx-card">
        <div class="row">
          <div class="col-sm-12">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="pills-Complaint-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-Complaint"
                  type="button"
                  role="tab"
                  aria-controls="pills-Complaint"
                  aria-selected="true"
                  :style="[
                    { background: complaintbcolor, color: complaintfcolor },
                  ]"
                >
                  Complaint
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-X-Ray-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-X-Ray"
                  type="button"
                  role="tab"
                  aria-controls="pills-X-Ray"
                  aria-selected="false"
                  :style="[{ background: XRaybcolor, color: XRayfcolor }]"
                >
                  Files
                </button>
              </li>

              <span v-if="xray_records.length > 0">
                <li
                  class="nav-item"
                  role="presentation"
                  v-if="
                    role[0].role == 'Call Centre Manager' ||
                    role[0].role == 'Physiotherapist'
                  "
                >
                  <button
                    class="nav-link"
                    id="pills-Assessment-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Assessment"
                    type="button"
                    role="tab"
                    aria-controls="pills-Assessment"
                    aria-selected="false"
                    :style="[
                      { background: Assessmentbcolor, color: Assessmentfcolor },
                    ]"
                  >
                    Assessment
                  </button>
                </li>
              </span>

              <li
                class="nav-item"
                role="presentation"
                v-if="
                  role[0].role == 'Call Centre Manager' ||
                  role[0].role == 'Physiotherapist'
                "
              >
                <button
                  class="nav-link"
                  id="pills-Consultation-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-Consultation"
                  type="button"
                  role="tab"
                  aria-controls="pills-Consultation"
                  aria-selected="false"
                  :style="[
                    {
                      background: Consultationbcolor,
                      color: Consultationfcolor,
                    },
                  ]"
                >
                  Consultation
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-FollowUp-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-FollowUp"
                  type="button"
                  role="tab"
                  aria-controls="pills-FollowUp"
                  aria-selected="false"
                >
                  Follow Up
                </button>
              </li>
              <li class="nav-item" role="presentation" v-if="health_scheme">
                <button
                  class="nav-link"
                  id="pills-Mediclaim-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-Mediclaim"
                  type="button"
                  role="tab"
                  aria-controls="pills-Mediclaim"
                  aria-selected="false"
                  :style="[
                    {
                      background: health_schemebcolor,
                      color: health_schemefcolor,
                    },
                  ]"
                >
                  {{ health_scheme }}
                </button>
              </li>

              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-Appointment-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-Appointment"
                  type="button"
                  role="tab"
                  aria-controls="pills-Appointment"
                  aria-selected="false"
                >
                  Appointment
                </button>
              </li>

              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-Comments-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-Comments"
                  type="button"
                  role="tab"
                  aria-controls="pills-Comments"
                  aria-selected="false"
                >
                  Comments
                </button>
              </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-Complaint"
                role="tabpanel"
                aria-labelledby="pills-Complaint-tab"
                tabindex="0"
              >
                <!-- complaint tab -->
                <ComplaintTab />
                <!-- complaint Tab -->
              </div>
              <div
                class="tab-pane fade"
                id="pills-Mediclaim"
                role="tabpanel"
                aria-labelledby="pills-Mediclaim-tab"
                tabindex="0"
              >
                {{ health_scheme }}
                <!-- Mediclaim -->
                <MediclaimTab
                  :msg="health_scheme"
                  :health_scheme="health_scheme"
                />
                <!-- End Mediclaim -->
              </div>
              <div
                class="tab-pane fade"
                id="pills-Investigation"
                role="tabpanel"
                aria-labelledby="pills-Investigation-tab"
                tabindex="0"
              >
                <!-- Investigation -->
                <InvestigationTab />

                <!-- End Investigation -->
              </div>
              <div
                class="tab-pane fade"
                id="pills-Exercise"
                role="tabpanel"
                aria-labelledby="pills-Exercise-tab"
                tabindex="0"
              >
                <!-- Exercise -->
                <ExerciseTab />
                <!-- End Investigation -->
              </div>
              <div
                class="tab-pane fade"
                id="pills-X-Ray"
                role="tabpanel"
                aria-labelledby="pills-X-Ray-tab"
                tabindex="0"
              >
                <!-- Xray record -->
                <FilesTab />
                <!--end  Xray record -->
              </div>
              <div
                class="tab-pane fade"
                id="pills-Assessment"
                role="tabpanel"
                aria-labelledby="pills-Assessment-tab"
                tabindex="0"
              >
                <!-- X-Ray / MRI Assessment -->
                <AssessmentTab />
                <!-- end X-Ray / MRI Assessment -->
              </div>
              <div
                class="tab-pane fade"
                id="pills-Consultation"
                role="tabpanel"
                aria-labelledby="pills-Consultation-tab"
                tabindex="0"
              >
                <!-- Consultation -->
                <ConsultationTab />
                <div class="mt-5">
                  <div class="row">
                    <div class="col-sm-8">
                      <div class="form-check form-check-inline">
                        <input
                          type="radio"
                          id="OnlineConsultation"
                          value="OnlineConsultation"
                          v-model="consultation_tab"
                        />
                        <label for="OnlineConsultation">
                          &nbsp; Online Consultation</label
                        >
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          type="radio"
                          id="OPD"
                          value="OPD"
                          v-model="consultation_tab"
                        />
                        <label for="OPD"> &nbsp; OPD Consultation </label>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div style="float: right"></div>
                    </div>
                  </div>
                </div>
                <div
                  class="card kx-card"
                  v-if="consultation_tab === 'OnlineConsultation'"
                >
                  <OnlineConsultationTab />
                </div>
                <div class="card kx-card" v-if="consultation_tab === 'OPD'">
                  <OpdConsultationTab />
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="pills-FollowUp"
                role="tabpanel"
                aria-labelledby="pills-FollowUp-tab"
                tabindex="0"
              >
                <FollowUpTab />
              </div>
              <div
                class="tab-pane fade"
                id="pills-TimeLine"
                role="tabpanel"
                aria-labelledby="pills-TimeLine-tab"
                tabindex="0"
              >
                <TimeLineTab />
              </div>

              <div
                class="tab-pane fade"
                id="pills-Shared"
                role="tabpanel"
                aria-labelledby="pills-Shared-tab"
                tabindex="0"
              >
                <SharedLeadTab />
              </div>

              <div
                class="tab-pane fade"
                id="pills-Comments"
                role="tabpanel"
                aria-labelledby="pills-Comments-tab"
                tabindex="0"
              >
                <CommentsTab />
              </div>
              <div
                class="tab-pane fade"
                id="pills-Appointment"
                role="tabpanel"
                aria-labelledby="pills-Appointment-tab"
                tabindex="0"
              >
                <AppointmentTab
                  :states="patient_state"
                  :city="patient_city"
                  :lead_details="items"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalWaShare
    @add="ShowShareWaModel = true"
    @close="ShowShareWaModel = false"
    :show="ShowShareWaModel"
    :Knee_lead="whatsapp_no"
    msg="TIkam"
  />
  <ModalShare
    @add="ShowShareModel = true"
    @close="ShowShareModel = false"
    :show="ShowShareModel"
    :Knee_lead="Knee_lead_id"
    msg="TIkam"
  />
  <ChatBot :mobile="$route.params.id" />
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Multiselect from "@vueform/multiselect";

import { ref } from "vue";
import SideBaar from "@/components/SideBaar.vue";
import Header from "@/components/Header/Header.vue";
import ComplaintTab from "@/components/Tabs/ComplaintTab.vue";
import AppointmentTab from "@/components/Tabs/AppointmentTab.vue";
import MediclaimTab from "@/components/Tabs/MediclaimTab.vue";
import ExerciseTab from "@/components/Tabs/ExerciseTab.vue";
import AssessmentTab from "@/components/Tabs/AssessmentTab.vue";
import InvestigationTab from "@/components/Tabs/InvestigationTab.vue";
import FilesTab from "@/components/Tabs/FilesTab.vue";
import FollowUpTab from "@/components/Tabs/FollowUpTab.vue";
import TimeLineTab from "@/components/Tabs/TimeLineTab.vue";
import OnlineConsultationTab from "@/components/Tabs/OnlineConsultation.vue";
import OpdConsultationTab from "@/components/Tabs/OpdConsultation.vue";
import BasicDetails from "@/components/Tabs/BasicDetails.vue";
import CommentsTab from "@/components/Tabs/Comments.vue";
import ModalWaShare from "@/components/modals/ShareWaModel.vue";
import ModalShare from "@/components/modals/ShareModel.vue";
import ChatBot from "@/components/modals/ChatBot.vue";
import VueAwesomePaginate from "vue-awesome-paginate";
import { FloatMenu } from "vue-float-menu";
import "vue-float-menu/dist/vue-float-menu.css";

export default {
  name: "LeadDetails",
  components: {
    Header,
    SideBaar,
    VueAwesomePaginate,
    FloatMenu,
    Multiselect,
    AssessmentTab,
    ComplaintTab,
    ExerciseTab,
    MediclaimTab,
    InvestigationTab,
    FilesTab,
    FollowUpTab,
    TimeLineTab,
    OnlineConsultationTab,
    OpdConsultationTab,
    BasicDetails,
    CommentsTab,
    ModalWaShare,
    ModalShare,
    ChatBot,
    AppointmentTab,
  },

  created() {
    this.get_data_from_lead();
    this.get_deformities();
    this.get_knee_lead_status();
    this.get_knee_xray_diagnosis();
    this.get_mri_diagnosis();
    this.get_mri_deformity();
    this.get_xray_record();
    this.get_timeline_record();
    this.get_city_state();
    this.get_followup_stages();
    this.get_health_scheme();
    this.get_knee_lead_documents();
    this.set_default_date();
    this.get_exercise_advice();
    this.get_knee_lead_exercise_advice();
    this.get_tags();
    this.get_camp_list();
  },
  data() {
    return {
      tags: [],
      role: JSON.parse(localStorage.getItem("role_details")),
      tag_data: [],
      tag_options: [],
      camp: "",
      camp_options: [],
      search: "",
      city: "",
      perPage: 5,
      currentPage: 1,
      disabled: 1,
      tab_active: "",
      patient_state: "",
      session_user: localStorage.getItem("full_name"),
      display_folloup_form: false,
      consultation_tab: "OnlineConsultation",
      editbasicdata: true,
      loading: false,
      opened: [],
      rows: [],
      items: [],
      knee_complain: false,
      hip_complain: Boolean(1),
      patient_full_name: "",
      mobile: "",
      name: "",
      gender: "",
      age: "",
      occupation: "",
      pain_complain: "",
      knee_left: "",
      hip_left: "",
      knee_right: "",
      hip_right: "",
      pain_since: "",
      pain_since_option: ["Months", "Years", "Days"],
      pain_since_years: "",
      pain_increase_while: "",
      pain_increase_while_options: [],
      pain_location: "",
      pain_location_option: [],
      xray_request_date_time: "",
      next_request_follow_up_date: new Date().toISOString().slice(0, 10),
      mode_of_request: "",
      xray_upload_request_date_time: "",
      xray_upload_follow_up_date: "",
      new_xray_request_date_time: "",
      new_xray_follow_up_date: "",
      xray_diagnosis_left: "",
      xray_diagnosis_right: "",
      hip_xray_diagnosis_left: "",
      hip_xray_diagnosis_right: "",
      deformity_right: "",
      deformity_left: "",
      deformity_right_options: [],
      deformity_left_options: [],
      xray_diagnosis_left_options: [],
      xray_diagnosis_right_options: [],
      xray_advise_svf_left: "",
      xray_advise_pfo_left: "",
      xray_advise_hto_left: "",
      xray_advise_dfo_left: "",
      xray_advise_arthroscopy_left: "",
      xray_advise_tkr_left: "",
      xray_advise_thr_left: "",
      xray_advise_svf_right: "",
      xray_advise_pfo_right: "",
      xray_advise_hto_right: "",
      xray_advise_dfo_right: "",
      xray_advise_arthoscopy_right: "",
      xray_advise_tkr_right: "",
      xray_advise_thr_right: "",
      xray_assessment_next_follow_up_date: "",
      online_consult_request_date_time: "",
      online_consult_date: new Date().toISOString().slice(0, 10),
      online_consult_follow_up_date: "",
      online_consult_by: localStorage.getItem("full_name"),
      online_consult_next_follow_up_date: "",
      advise_svf_left: "",
      advise_pfo_left: "",
      advise_hto_left: "",
      advise_dfo_left: "",
      advise_arthroscopy_left: "",
      advise_tkr_left: "",
      advise_thr_left: "",
      advise_svf_right: "",
      advise_pfo_right: "",
      advise_hto_right: "",
      advise_dfo_right: "",
      advise_arthroscopy_right: "",
      advise_tkr_right: "",
      advise_thr_right: "",
      online_consult_patient_willingness_svf_left: "",
      online_consult_patient_willingness_pfo_left: "",
      online_consult_patient_willingness_hto_left: "",
      online_consult_patient_willingness_dfo_left: "",
      online_consult_patient_willingness_arthroscopy_left: "",
      online_consult_patient_willingness_tkr_left: "",
      online_consult_patient_willingness_thr_left: "",
      online_consult_patient_willingness_svf_right: "",
      online_consult_patient_willingness_pfo_right: "",
      online_consult_patient_willingness_hto_right: "",
      online_consult_patient_willingness_dfo_right: "",
      online_consult_patient_willingness_arthroscopy_right: "",
      online_consult_patient_willingness_tkr_right: "",
      online_consult_patient_willingness_thr_right: "",
      opd_request_date_time: "",
      opd_date: "",
      opd_by: localStorage.getItem("full_name"),
      opd_follow_up_date: "",
      opd_exercise_shared: "",
      opd_next_follow_up_date: "",
      opd_advise_svf_left: "",
      opd_advise_pfo_left: "",
      opd_advise_hto_left: "",
      opd_advise_dfo_left: "",
      opd_advise_arthro_left: "",
      opd_advise_tkr_left: "",
      opd_advise_thr_left: "",
      opd_advise_svf_right: "",
      opd_advise_pfo_right: "",
      opd_advise_pfo_right: "",
      opd_advise_hto_right: "",
      opd_advise_dfo_right: "",
      opd_advise_arthro_right: "",
      opd_advise_tkr_right: "",
      opd_advise_thr_right: "",
      opd_patient_willingness_svf_left: "",
      opd_patient_willingness_pfo_left: "",
      opd_patient_willingness_hto_left: "",
      opd_patient_willingness_dfo_left: "",
      opd_patient_willingness_arthro_left: "",
      opd_patient_willingness_tkr_left: "",
      opd_patient_willingness_thr_left: "",
      opd_patient_willingness_svf_right: "",
      opd_patient_willingness_pfo_right: "",
      opd_patient_willingness_hto_right: "",
      opd_patient_willingness_dfo_right: "",
      opd_patient_willingness_arthro_right: "",
      opd_patient_willingness_tkr_right: "",
      opd_patient_willingness_thr_right: "",
      knee_lead_status: "",
      lead_status_options: [],
      whatsapp_no: "",
      same_whatsapp_no: false,
      follow_up_count: "",
      xray_records: [],
      OnlineConsultation: true,
      opdConsultation: true,
      FollowUps: [],
      followup_stage: "",
      followup_stages: [],
      event_category_wa: "",
      event_category: "",
      event_category_sms: "",
      event_category_call: "",
      folloup_remark: "",
      timeline_changes: [],
      timeline_comments: [],
      upload_xray_image: "",
      xray_diagnosis_remarks: "",
      mri_assessment_remarks: "",
      mri_diagnosis_left: "",
      mri_diagnosis_left_options: [],
      mri_diagnosis_right: "",
      mri_diagnosis_right_options: [],
      mri_deformity_left: "",
      mri_deformity_left_options: [],
      mri_deformity_right: "",
      mri_deformity_right_options: [],
      online_consultation_remarks: "",
      health_scheme: "",
      health_scheme_options: [],
      investigation_req_options: [],
      investigation_req: "",
      Mediclaim_company: [],
      Mediclaim_companies: [],
      Mediclaim_tpa: "",
      Mediclaim_tpas: [],
      Mediclaim_policy_type: "",
      Mediclaim_policy_types: [],
      Mediclaim_sum_insured: "",
      Mediclaim_sum_insured_option: [],
      Mediclaim_sum_insured_3year_back: "",
      Mediclaim_sum_insured_3year_back_option: [],
      investigation_advice: [],
      MediclaimXRay: "",
      upload_type: "Xray",
      upload_types: ["Xray", "MRI"],
      exercise_options: [],
      exercise_req: "",
      exercise_advices: [],
      mediclaim_doc: [],
      mediclaim_xrays: [],
      mediclaim_Doctor_Prescription: [],
      mediclaim_Ayushman_Cards: [],
      mediclaim_Investigation_Report: [],
      mediclaim_Pan_Card: [],
      mediclaim_CGHS_Card: [],
      mediclaim_Policy_paper_3yr: [],
      mediclaim_Adhar_Cards: [],
      health_scheme_disabled: false,
      pain_since_disable: false,
      complaintcolor: "",
      complaintbcolor: "",
      complaintfcolor: "",
      health_schemebcolor: "",
      health_schemefcolor: "",
      Exercisebcolor: "",
      Exercisefcolor: "",
      Investigationbcolor: "",
      Investigationfcolor: "",
      XRaybcolor: "",
      XRayfcolor: "",
      Assessmentbcolor: "",
      Assessmentfcolor: "",
      Consultationbcolor: "",
      Consultationfcolor: "",
      ShowShareWaModel: ref(false),
      ShowShareModel: ref(false),
      status: "",
      currentPage: null,
      status_data: [],
      nextLead: null,
    };
  },
  computed: {
    filteredxrayItems() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      if (this.search) {
        if (this.search == "All") {
          return this.xray_records.slice(startIndex, endIndex);
        }
        return this.xray_records.filter((item) =>
          item.type.toLowerCase().includes(this.search.toLowerCase())
        );
      } else {
        return this.xray_records.slice(startIndex, endIndex);
      }
    },
    paginatedDataexercise() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.exercise_advices.slice(startIndex, endIndex);
    },
    paginatedDatainvestigationadvice() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.investigation_advice.slice(startIndex, endIndex);
    },
    paginatedDatadirectxray() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.xray_records.slice(startIndex, endIndex);
    },
    paginatedDataFollowUps() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.FollowUps.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.tableData.length / this.perPage);
    },
  },
  methods: {
    calculate_bmi: function () {
      this.patient_bmi = (
        this.patient_weight /
        ((this.patient_height * this.patient_height) / 10000)
      ).toFixed(2);
    },
    changePage: function (page) {
      this.currentPage = page;
    },
    nextPage: function () {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage: function () {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    Filterxraydoc: function () {
      let result = this.events;
      if (!this.search) return result;
      const filterValue = this.search.toLowerCase();
      const filter = (event) =>
        event.name.toLowerCase().includes(filterValue) ||
        event.state.toLowerCase().includes(filterValue) ||
        event.tags.some((tag) => tag.toLowerCase().includes(filterValue));
      return result.filter(filter);
    },
    format_date_time: function (e) {
      if (e) {
        var date_time = e.split(" ");
        var date = date_time[0];
        var time = date_time[1];

        var final_date = date.split("-");
        if (time) {
          var final_date_time =
            final_date[2] +
            "-" +
            final_date[1] +
            "-" +
            final_date[0] +
            " " +
            time;
        }
        var final_date_time =
          final_date[2] + "-" + final_date[1] + "-" + final_date[0];

        return final_date_time;
      }
      return;
    },
    fnShowShareWaModel: function (e) {
      this.Knee_lead_id = e;
      this.ShowShareWaModel = !this.ShowShareWaModel;
    },
    click2call: function (e) {
      (this.loading = !false),
        axios
          .get("knee_lead.api.click2call?number=" + e)
          .then((response) => {
            this.loading = false;
          })
          .catch((error) => {
            this.errmessage = error;
            this.ShowErrModel = true;
          }); 
    },
    fnShowShareModel: function (e) {
      this.Knee_lead_id = e;
      this.ShowShareModel = !this.ShowShareModel;
    },

    handle_xray_upload: function (e) {
      const selectedImage = e.target.files[0];
      this.createBase64Imagexray(selectedImage);
    },

    createBase64Imagexray: function (fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.upload_xray_image = e.target.result;
        this.upload_xray();
      };
      reader.readAsDataURL(fileObject);
    },
    matchesSearch: function (row) {
      return Object.keys(row).some((key) => {
        const fieldValue = row[key];
        if (fieldValue === this.search) {
          return fieldValue.toLowerCase().includes(this.search.toLowerCase());
        }
        return false; // Ignore non-string fields
      });
    },
    get_data_from_lead: async function () {
      this.loading = !false;
      var formdata = JSON.stringify({
        mobile: this.$route.params.id,
      });
      await axios
        .get("knee_lead.api.get_single_knee_lead", {
          params: {
            mobile: this.$route.params.id,
          },
        })
        .then((response) => {
          this.items = response.data.data;
          this.patient_full_name = this.items[0].patient_full_name;
          this.camp = this.items[0].camp;
          this.mobile = this.items[0].mobile;
          this.name = this.items[0].name;
          this.gender = this.items[0].gender;
          this.age = this.items[0].age;
          this.occupation = this.items[0].occupation;
          this.pain_complain = this.items[0].pain_complain;
          this.knee_complain = this.items[0].knee_complain;
          this.hip_complain = this.items[0].hip_complain;
          this.knee_left = this.items[0].knee_left;
          this.hip_left = this.items[0].hip_left;
          this.knee_right = this.items[0].knee_right;
          this.hip_right = this.items[0].hip_right;
          this.pain_since_years = this.items[0].pain_since_years;
          this.pain_increase_while = this.items[0].pain_increase_while;
          this.pain_location = this.items[0].pain_location;
          this.xray_request_date_time = new Date(
            this.items[0].xray_request_date_time
          );
          this.mode_of_request = this.items[0].mode_of_request;
          this.xray_upload_request_date_time = new Date(
            this.items[0].xray_upload_request_date_time
          );
          this.xray_upload_follow_up_date = new Date(
            this.items[0].xray_upload_follow_up_date
          );
          this.new_xray_request_date_time = new Date(
            this.items[0].new_xray_request_date_time
          );
          this.new_xray_follow_up_date = new Date(
            this.items[0].new_xray_follow_up_date
          );
          this.xray_diagnosis_left = this.items[0].xray_diagnosis_left;
          this.xray_diagnosis_right = this.items[0].xray_diagnosis_right;
          this.hip_xray_diagnosis_left = this.items[0].hip_xray_diagnosis_left;
          this.hip_xray_diagnosis_right =
            this.items[0].hip_xray_diagnosis_right;
          this.deformity_right = this.items[0].deformity;
          this.deformity_left = this.items[0].deformity_left;
          this.xray_advise_svf_left = this.items[0].xray_advise_svf_left;
          this.xray_advise_pfo_left = this.items[0].xray_advise_pfo_left;
          this.xray_advise_hto_left = this.items[0].xray_advise_hto_left;
          this.xray_advise_dfo_left = this.items[0].xray_advise_dfo_left;
          this.xray_advise_arthroscopy_left =
            this.items[0].xray_advise_arthroscopy_left;
          this.xray_advise_tkr_left = this.items[0].xray_advise_tkr_left;
          this.xray_advise_thr_left = this.items[0].xray_advise_thr_left;
          this.xray_advise_svf_right = this.items[0].xray_advise_svf_right;
          this.xray_advise_pfo_right = this.items[0].xray_advise_pfo_right;
          this.xray_advise_hto_right = this.items[0].xray_advise_hto_right;
          this.xray_advise_dfo_right = this.items[0].xray_advise_dfo_right;
          this.xray_advise_arthoscopy_right =
            this.items[0].xray_advise_arthoscopy_right;
          this.xray_advise_tkr_right = this.items[0].xray_advise_tkr_right;
          this.xray_advise_thr_right = this.items[0].xray_advise_thr_right;
          this.xray_assessment_next_follow_up_date = new Date(
            this.items[0].xray_assessment_next_follow_up_date
          );
          this.online_consult_request_date_time = new Date(
            this.items[0].online_consult_request_date_time
          );
          if (this.items[0].online_consult_date) {
            this.online_consult_dwhaate = new Date(
              this.items[0].online_consult_date
            );
          }
          this.online_consult_follow_up_date = new Date(
            this.items[0].online_consult_follow_up_date
          );
          if (this.items[0].online_consult_by) {
            this.online_consult_by = this.items[0].online_consult_by;
          }
          this.online_consult_next_follow_up_date = new Date(
            this.items[0].online_consult_next_follow_up_date
          );
          this.advise_svf_left = this.items[0].advise_svf_left;
          this.advise_pfo_left = this.items[0].advise_pfo_left;
          this.advise_hto_left = this.items[0].advise_hto_left;
          this.advise_dfo_left = this.items[0].advise_dfo_left;
          this.advise_arthroscopy_left = this.items[0].advise_arthroscopy_left;
          this.advise_tkr_left = this.items[0].advise_tkr_left;
          this.advise_thr_left = this.items[0].advise_thr_left;
          this.advise_svf_right = this.items[0].advise_svf_right;
          this.advise_pfo_right = this.items[0].advise_pfo_right;
          this.advise_hto_right = this.items[0].advise_hto_right;
          this.advise_dfo_right = this.items[0].advise_dfo_right;
          this.advise_arthroscopy_right =
            this.items[0].advise_arthroscopy_right;
          this.advise_tkr_right = this.items[0].advise_tkr_right;
          this.advise_thr_right = this.items[0].advise_thr_right;
          this.online_consult_patient_willingness_svf_left =
            this.items[0].online_consult_patient_willingness_svf_left;
          this.online_consult_patient_willingness_pfo_left =
            this.items[0].online_consult_patient_willingness_pfo_left;
          this.online_consult_patient_willingness_hto_left =
            this.items[0].online_consult_patient_willingness_hto_left;
          this.online_consult_patient_willingness_dfo_left =
            this.items[0].online_consult_patient_willingness_dfo_left;
          this.online_consult_patient_willingness_arthroscopy_left =
            this.items[0].online_consult_patient_willingness_arthroscopy_left;
          this.online_consult_patient_willingness_tkr_left =
            this.items[0].online_consult_patient_willingness_tkr_left;
          this.online_consult_patient_willingness_thr_left =
            this.items[0].online_consult_patient_willingness_thr_left;
          this.online_consult_patient_willingness_svf_right =
            this.items[0].online_consult_patient_willingness_svf_right;
          this.online_consult_patient_willingness_pfo_right =
            this.items[0].online_consult_patient_willingness_pfo_right;
          this.online_consult_patient_willingness_hto_right =
            this.items[0].online_consult_patient_willingness_hto_right;
          this.online_consult_patient_willingness_dfo_right =
            this.items[0].online_consult_patient_willingness_dfo_right;
          this.online_consult_patient_willingness_arthroscopy_right =
            this.items[0].online_consult_patient_willingness_arthroscopy_right;
          this.online_consult_patient_willingness_tkr_right =
            this.items[0].online_consult_patient_willingness_tkr_right;
          this.online_consult_patient_willingness_thr_right =
            this.items[0].online_consult_patient_willingness_thr_right;
          this.opd_request_date_time = new Date(
            this.items[0].opd_request_date_time
          );
          if (this.items[0].opd_date) {
            this.opd_date = new Date(this.items[0].opd_date);
          }
          if (this.items[0].opd_by) {
            this.opd_by = this.items[0].opd_by;
          }
          this.opd_follow_up_date = new Date(this.items[0].opd_follow_up_date);
          this.opd_exercise_shared = this.items[0].opd_exercise_shared;
          this.opd_next_follow_up_date = new Date(
            this.items[0].opd_next_follow_up_date
          );
          this.opd_advise_svf_left = this.items[0].opd_advise_svf_left;
          this.opd_advise_pfo_left = this.items[0].opd_advise_pfo_left;
          this.opd_advise_hto_left = this.items[0].opd_advise_hto_left;
          this.opd_advise_dfo_left = this.items[0].opd_advise_dfo_left;
          this.opd_advise_arthro_left = this.items[0].opd_advise_arthro_left;
          this.opd_advise_tkr_left = this.items[0].opd_advise_tkr_left;
          this.opd_advise_thr_left = this.items[0].opd_advise_thr_left;
          this.opd_advise_svf_right = this.items[0].opd_advise_svf_right;
          this.opd_advise_pfo_right = this.items[0].opd_advise_pfo_right;
          this.opd_advise_hto_right = this.items[0].opd_advise_hto_right;
          this.opd_advise_dfo_right = this.items[0].opd_advise_dfo_right;
          this.opd_advise_arthro_right = this.items[0].opd_advise_arthro_right;
          this.opd_advise_tkr_right = this.items[0].opd_advise_tkr_right;
          this.opd_advise_thr_right = this.items[0].opd_advise_thr_right;
          this.opd_patient_willingness_svf_left =
            this.items[0].opd_patient_willingness_svf_left;
          this.opd_patient_willingness_pfo_left =
            this.items[0].opd_patient_willingness_pfo_left;
          this.opd_patient_willingness_hto_left =
            this.items[0].opd_patient_willingness_hto_left;
          this.opd_patient_willingness_dfo_left =
            this.items[0].opd_patient_willingness_dfo_left;
          this.opd_patient_willingness_arthro_left =
            this.items[0].opd_patient_willingness_arthro_left;
          this.opd_patient_willingness_tkr_left =
            this.items[0].opd_patient_willingness_tkr_left;
          this.opd_patient_willingness_thr_left =
            this.items[0].opd_patient_willingness_thr_left;
          this.opd_patient_willingness_svf_right =
            this.items[0].opd_patient_willingness_svf_right;
          this.opd_patient_willingness_pfo_right =
            this.items[0].opd_patient_willingness_pfo_right;
          this.opd_patient_willingness_hto_right =
            this.items[0].opd_patient_willingness_hto_right;
          this.opd_patient_willingness_dfo_right =
            this.items[0].opd_patient_willingness_dfo_right;
          this.opd_patient_willingness_arthro_right =
            this.items[0].opd_patient_willingness_arthro_right;
          this.opd_patient_willingness_tkr_right =
            this.items[0].opd_patient_willingness_tkr_right;
          this.opd_patient_willingness_thr_right =
            this.items[0].opd_patient_willingness_thr_right;
          this.xray_diagnosis_remarks = this.items[0].xray_diagnosis_remarks;
          this.mri_assessment_remarks = this.items[0].mri_assessment_remarks;
          this.mri_deformity_left = this.items[0].mri_deformity_left;
          this.mri_deformity_right = this.items[0].mri_deformity_right;
          this.mri_diagnosis_left = this.items[0].mri_diagnosis_left;
          this.mri_diagnosis_right = this.items[0].mri_diagnosis_right;
          this.follow_up_count = this.items[0].follow_up_count;
          this.online_consultation_remarks =
            this.items[0].online_consultation_remarks;
          this.city = this.items[0].city;
          this.patient_state = this.items[0].state;
          this.knee_lead_status = this.items[0].knee_lead_status[0].name;
          this.pain_since = this.items[0].pain_since;
          if (this.items[0].pain_since) {
            this.pain_since_disable = true;
          }
          this.tag_data = this.items[0]._user_tags;
          for (let x in this.items[0]._user_tags) {
            this.tags.push(this.items[0]._user_tags[x].name);
          }
          this.health_scheme = this.items[0].health_scheme;
          this.whatsapp_no = this.items[0].whatsapp_no;
          this.loading = false;
          this.validate_complaint();
        })
        .catch((error) => {});
    },

    get_state_by_city: function () {
      let patient_city_state_data = this.city_state_options;
      for (let x in patient_city_state_data) {
        if (patient_city_state_data[x].city == this.city) {
          this.patient_state = patient_city_state_data[x].state;
          this.update_field(
            "Knee Lead",
            this.items[0].name,
            "city",
            patient_city_state_data[x].city
          );
          this.update_field(
            "Knee Lead",
            this.items[0].name,
            "state",
            patient_city_state_data[x].state
          );
        }
      }
    },
    set_default_date: function () {
      function checkZero(data) {
        if (data.length == 1) {
          data = "0" + data;
        }
        return data;
      }
      var today = new Date();
      var day = today.getDate() + "";
      var month = today.getMonth() + 1 + "";
      var year = today.getFullYear() + "";
      var hour = today.getHours() + "";
      var minutes = today.getMinutes() + "";
      var seconds = today.getSeconds() + "";
      day = checkZero(day);
      month = checkZero(month);
      year = checkZero(year);
      var date_final = year + "-" + month + "-" + day;
      this.opd_date = today;
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
    get_camp_list: async function () {
      await axios
        .get("knee_lead.api.get_camp_list")
        .then((response) => {
          var res_data = response.data.data[0];
          for (let x in res_data) {
            this.camp_options.push(res_data[x].name);
          }
        })
        .catch((error) => {});
    },
    get_knee_lead_investigation_advice: async function () {
      await axios
        .get("knee_lead.api.get_knee_lead_investigation_advice", {
          params: {
            knee_lead: this.$route.params.id,
          },
        })
        .then((response) => {
          this.investigation_advice = response.data.data;
        })
        .catch((error) => {});
    },
    get_knee_lead_status: async function () {
      await axios
        .get("knee_lead.api.knee_lead_status")
        .then((response) => {
          for (let x in response.data.message) {
            this.lead_status_options.push(response.data.message[x].name);
          }
        })
        .catch((error) => {});
    },
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
    get_xray_record: async function () {
      await axios
        .get("knee_lead.api.get_direct_xray", {
          params: {
            knee_lead_id: this.$route.params.id,
          },
        })
        .then((response) => {
          this.xray_records = response.data.data;
        })
        .catch((error) => {});
    },
    get_followups: async function () {
      await axios
        .get("knee_lead.api.get_follow_up", {
          params: {
            knee_lead_id: this.$route.params.id,
          },
        })
        .then((response) => {
          this.FollowUps = response.data.data["All Follow Ups"];
          //
          this.followup_stage =
            response.data.data["last_follow_up"][0].event_stage;
        })
        .catch((error) => {});
    },
    get_followup_stages: async function () {
      await axios
        .get("knee_lead.api.get_stage")
        .then((response) => {
          for (let x in response.data.data) {
            this.followup_stages.push(response.data.data[x].stage);
          }
        })
        .catch((error) => {});
    },
    create_followup: async function () {
      function checkZero(data) {
        if (data.length == 1) {
          data = "0" + data;
        }
        return data;
      }
      var today_date = new Date();
      var today_date_iso = today_date.toISOString().split("T")[0];
      var today_hour = today_date.getHours() + "";
      var today_minutes = today_date.getMinutes() + "";
      var today_seconds = today_date.getSeconds() + "";
      today_hour = checkZero(today_seconds);
      today_minutes = checkZero(today_seconds);
      today_seconds = checkZero(today_seconds);
      var today_time =
        today_date_iso +
        " " +
        today_hour +
        ":" +
        today_minutes +
        ":" +
        today_seconds;
      var date = new Date(this.next_request_follow_up_date);
      var time =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      let date_iso = date.toISOString().split("T")[0];
      let new_date = date_iso + " " + 0 + time + 0;
      const formdata = {
        knee_lead: this.$route.params.id,
        subject: this.followup_stage,
        event_category: this.event_category,
        event_type: "Private",
        event_stage: this.followup_stage,
        starts_on: today_time,
        repeat_event_on: new_date,
        status: "Open",
        description: this.folloup_remark,
      };
      this.loading = !false;
      await axios
        .post("knee_lead.api.add_knee_lead_follow_up", formdata)
        .then((response) => {
          this.get_followups();
          this.loading = false;
          this.fn_display_folloup_form();
        })
        .catch((error) => {});
    },
    send_investigation_advice: async function () {
      var date = new Date();
      var time =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      let date_iso = date.toISOString().split("T")[0];
      let new_date = date_iso + " " + time;
      const formdata = {
        knee_lead: this.$route.params.id,
        investigation: this.investigation_req,
        message: this.investigation_req,
        date: date_iso,
        time: time,
        status: "Delivered",
      };
      this.loading = !false;

      await axios
        .post("knee_lead.api.add_investigation_advice", formdata)
        .then((response) => {
          this.get_knee_lead_investigation_advice();
          this.loading = false;
        })
        .catch((error) => {});
    },
    get_knee_lead_exercise_advice: async function () {
      await axios
        .get("knee_lead.api.get_knee_lead_exercise_advice", {
          params: {
            knee_lead: this.$route.params.id,
          },
        })
        .then((response) => {
          this.exercise_advices = response.data.data;
        })
        .catch((error) => {});
    },
    get_exercise_advice: async function () {
      await axios
        .get("knee_lead.api.get_exercise_advice")
        .then((response) => {
          for (let x in response.data.data) {
            this.exercise_options.push(response.data.data[x].name);
          }
        })
        .catch((error) => {});
    },
    get_city_state: async function () {
      await axios
        .get("knee_lead.api.get_city")
        .then((response) => {
          for (let x in response.data.data) {
            this.city_options.push(response.data.data[x].city);
            this.patient_state_options.push(response.data.data[x].state);
          }
          this.city_state_options = response.data.data;
          // this.
        })
        .catch((error) => {});
    },
    get_timeline_record: async function () {
      await axios
        .get("knee_lead.api.get_knee_lead_timeline", {
          params: {
            knee_lead_id: this.$route.params.id,
          },
        })
        .then((response) => {
          this.timeline_changes = response.data.data.changes[0];
          this.timeline_comments = response.data.data.comments[0];
        })
        .catch((error) => {});
    },
    get_knee_lead_documents: async function () {
      await axios
        .get("knee_lead.api.get_knee_lead_documents", {
          params: {
            knee_lead: this.$route.params.id,
          },
        })
        .then((response) => {
          this.mediclaim_doc = response.data.data;
          for (let x in response.data.data) {
            if (response.data.data[x].document_type == "Xray") {
              this.mediclaim_xrays.push(response.data.data[x]);
            }
            if (response.data.data[x].document_type == "Doctor Prescription") {
              this.mediclaim_Doctor_Prescription.push(response.data.data[x]);
            }
            if (response.data.data[x].document_type == "Doctor Prescription") {
              this.mediclaim_Doctor_Prescription.push(response.data.data[x]);
            }
            if (response.data.data[x].document_type == "Ayushman Card") {
              this.mediclaim_Ayushman_Cards.push(response.data.data[x]);
            }
            if (response.data.data[x].document_type == "Ayushman Card") {
              this.mediclaim_Ayushman_Cards.push(response.data.data[x]);
            }
            if (response.data.data[x].document_type == "Investigation Report") {
              this.mediclaim_Investigation_Report.push(response.data.data[x]);
            }
            if (response.data.data[x].document_type == "Pan Card") {
              this.mediclaim_Pan_Card.push(response.data.data[x]);
            }
            if (response.data.data[x].document_type == "CGHS Card") {
              this.mediclaim_CGHS_Card.push(response.data.data[x]);
            }
            if (response.data.data[x].document_type == "Policy paper 3yr") {
              this.mediclaim_Policy_paper_3yr.push(response.data.data[x]);
            }
            if (response.data.data[x].document_type == "Adhar Card") {
              this.mediclaim_Adhar_Cards.push(response.data.data[x]);
            }
          }
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

    get_investigation_advice: async function () {
      await axios
        .get("knee_lead.api.get_investigation_advice")
        .then((response) => {
          for (let x in response.data.data) {
            this.investigation_req_options.push(response.data.data[x].name);
          }
        })
        .catch((error) => {});
    },
    upload_xray: async function () {
      function checkZero(data) {
        if (data.length == 1) {
          data = "0" + data;
        }
        return data;
      }

      var today = new Date();
      var day = today.getDate() + "";
      var month = today.getMonth() + 1 + "";
      var year = today.getFullYear() + "";
      var hour = today.getHours() + "";
      var minutes = today.getMinutes() + "";
      var seconds = today.getSeconds() + "";

      day = checkZero(day);
      month = checkZero(month);
      year = checkZero(year);
      var date_final = year + "-" + month + "-" + day;
      const formdata = {
        mobile: this.$route.params.id,
        date: date_final,
        type: this.upload_type,
        mode: "Direct",
        filename: this.$route.params.id + this.patient_full_name + ".jpg",
        filedata: this.upload_xray_image,
      };
      this.loading = !false;

      await axios
        .post("knee_lead.api.add_direct_xray", formdata)
        .then((response) => {
          this.get_xray_record();
          this.loading = false;
          this.upload_xray_image = "";
        })
        .catch((error) => {});
    },
    add_knee_lead_documents: async function () {
      function checkZero(data) {
        if (data.length == 1) {
          data = "0" + data;
        }
        return data;
      }

      var today = new Date();
      var day = today.getDate() + "";
      var month = today.getMonth() + 1 + "";
      var year = today.getFullYear() + "";
      var hour = today.getHours() + "";
      var minutes = today.getMinutes() + "";
      var seconds = today.getSeconds() + "";

      day = checkZero(day);
      month = checkZero(month);
      year = checkZero(year);
      var date_final = year + "-" + month + "-" + day;  
      const formdata = {
        mobile: this.$route.params.id,
        date: date_final,
        document_type: "xray",
        filename: this.$route.params.id + this.patient_full_name + date_final,
        filedata: this.MediclaimXRay,
      };
      this.loading = !false;

      await axios
        .post("knee_lead.api.add_knee_lead_documents", formdata)
        .then((response) => {
          this.loading = false;
        })
        .catch((error) => {});
    },

    add_investigation_advice: async function () {
      function checkZero(data) {
        if (data.length == 1) {
          data = "0" + data;
        }
        return data;
      }

      var today = new Date();
      var day = today.getDate() + "";
      var month = today.getMonth() + 1 + "";
      var year = today.getFullYear() + "";
      var hour = today.getHours() + "";
      var minutes = today.getMinutes() + "";
      var seconds = today.getSeconds() + "";

      day = checkZero(day);
      month = checkZero(month);
      year = checkZero(year);

      hour = checkZero(hour);
      minutes = checkZero(minutes);
      seconds = checkZero(seconds);
      var date_final = year + "-" + month + "-" + day;
      var time_final = hour + ":" + minutes + ":" + seconds;
      const formdata = {
        knee_lead: this.$route.params.id,
        investigation: this.investigation_req,
        message: "Hello123123",
        date: date_final,
        time: time_final,
        status: "Delivered",
      };
      this.loading = !false;

      await axios
        .post("knee_lead.api.add_investigation_advice", formdata)
        .then((response) => {
          this.loading = false;
        })
        .catch((error) => {});
    },

    editdetails: function () {
      if (this.editbasicdata) {
        this.editbasicdata = false;
      } else {
        this.editbasicdata = true;
      }
    },
    fn_display_folloup_form: function () {
      if (this.display_folloup_form) {
        this.display_folloup_form = false;
      } else {
        this.display_folloup_form = true;
      }
    },
    set_wa_field: function () {
      if (this.same_whatsapp_no) {
        this.whatsapp_no = this.mobile;
      } else {
        this.whatsapp_no = "";
      }
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
          if (pain_since) {
          } else {
            this.get_data_from_lead();
          }
        })
        .catch((error) => {});
    },
    get_tags: function () {
      axios
        .get("knee_lead.api.get_tag")
        .then((response) => {
          (this.loading = false), (this.tag_options = response.data.data);
          for (let x in response.data.data) {
            this.tag_options.push(response.data.data[x].name);
          }
          // this.tags = response.data.data
        })
        .catch((error) => {
          window.location.reload();
        });
    },
    validate_complaint() {
      if (this.items[0].knee_complain | this.items[0].hip_complain) {
        if (
          this.items[0].knee_left |
          this.items[0].knee_right |
          this.items[0].hip_left |
          this.items[0].hip_right
        ) {
          if (this.items[0].pain_since_years) {
            if (this.items[0].pain_increase_while) {
              if (this.items[0].pain_complain) {
                this.complaintbcolor = "green";
                this.complaintfcolor = "white";
              }
            }
          }
        }

        this.items[0].pain_location;
      }
    },
    remove_tags: function (e) {},
    addTag: function () {},

    save_tags: function () {
      for (let x in this.tags) {
        const formdata = {
          knee_lead: this.$route.params.id,
          tag: this.tags[x],
        };
        axios
          .put("knee_lead.api.add_tag", formdata)
          .then((response) => {})
          .catch((error) => {});
      }
    },

    get_all_lead_by_status: async function () {
      let lead_status = localStorage.getItem("status");
      this.currentPage = 1;
      this.urllink = "knee_lead.api.get_knee_leads_with_status?status=";

      await axios
        .get(this.urllink + lead_status + "&page=1" + "&size=100")
        .then((response) => {
          this.status_data = response.data.data.knee_leads;
        })
        .catch((error) => {});
    },
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>

<style>
.kx-card {
  border: none;
  padding: 1rem;
  /* border-color: #36549b59; */
}

.nav-pills .nav-link.active {
  background-color: var(--primary);
  /* background-color :  v-bind(complaintcolor) */
}

.nav-pills .nav-link {
  /* background: white; */
  /* margin-left: 1rem; */
  color: var(--primary);
  /* border: 2.5px solid #36549b; */
}

.pagination-container {
  display: flex;
  column-gap: 10px;
}

.card-date {
  font-size: small;
  font-weight: 800;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}

.kx-edit {
  background: none;
  border: none;
  color: #3498db;
  margin-left: 1rem;
}

.floating-share {
  /* font-size: 10px; */
  width: 1rem;
  /* margin-right: 2rem; */
  /* margin-top: 0.15rem; */
}

.floating-img {
  width: 70px;
  float: right;
  margin-left: 2rem;
  padding: 1rem;
}

.nav-pills .nav-link {
  background: gainsboro;
  margin-left: 0.5rem;
}

.nav-pills .nav-link:hover {
  /* background: gainsboro; */
  /* margin-left: 0.5rem; */
  background: #36549b57;
}

.tab-heading {
  background: darkgrey;
  padding: 0.5rem;
  color: white;
}

.kx-label-primary {
  color: var(--primary);
  /* padding : 0.5rem;
    margin-bottom : 10px; */
}
.kx-label-secondary {
  color: var(--dark);
  /* padding: 0.5rem; */
  margin-bottom: 5px;
  margin-top: 1rem;
}

#patient_full_name {
  text-transform: uppercase;
}

.patient_name {
  text-transform: uppercase;
}

.form-control:focus {
  border-color: var(--primary);
}

thead tr {
  background-color: #2bb0ce;
  color: white;
}

.pagination {
  float: right;
}

.pagination-button {
  background: #2bb0ce;
  color: white;
  border: 1px solid white;
  padding: 3px;
  border-radius: 5px;
}
.loader {
  color: rgba(54, 84, 155, 0.3490196078);
  text-align: center;
  margin-left: 1px;
  margin-top: 15rem;
  padding: 2rem;
}

@media only screen and (max-width: 600px) {
  .kx-brand-logo {
    height: 25px;
  }

  .opened {
    font-size: 12px;
  }
  .display-content {
    font-size: 12px;
  }
  tr {
    font-size: 12px;
  }
  .tag-button {
    margin-left: 56px !important;
    margin-bottom: 20px;
  }

  .kx-logout-button {
    /* height: 25px; */
    background: none;
    border: none;
    color: #ffff;
    /* padding: 1rem; */
    font-size: 12px;
  }

  .text-center {
    text-align: center !important;
    font-size: 10px;
    margin-top: 20px;
  }

  .kx-button {
    font-size: 10px;
  }
  .nav-item {
    width: 260px;
  }
  .nav-pills .nav-link {
    width: 260px;
    margin-top: 2px;
  }
}

@media only screen and (min-width: 300px) {
  /* For tablets: */

  .col-s-1 {
    width: 8.33%;
  }
  .kx-tab-priority {
    font-size: 12px;
  }
  .kx-tab-status {
    font-size: 12px;
  }
  .col-s-2 {
    width: 16.66%;
  }
  .col-s-3 {
    width: 25%;
  }
  .col-s-4 {
    width: 33.33%;
  }
  .col-s-5 {
    width: 41.66%;
  }
  .col-s-6 {
    width: 50%;
  }
  .col-s-7 {
    width: 58.33%;
  }
  .col-s-8 {
    width: 66.66%;
  }
  .col-s-9 {
    width: 75%;
  }
  .col-s-10 {
    width: 83.33%;
  }
  .col-s-11 {
    width: 91.66%;
  }
  .col-s-12 {
    width: 100%;
  }
}
</style>
