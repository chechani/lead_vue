<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <div class="card kx-card mt-2">
      <div class="row">
        <div class="col"></div>
        <div class="col" v-if="health_scheme === 'Mediclaim'">
          <button
            class="btn btn-success"
            style="float: right"
            @click="add_mediclaim"
          >
            Save
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col" v-if="health_scheme === 'OTHER'">
          <div class="col-sm-3">
            <label
              class="form-select-label kx-label-secondary"
              for="OtherHelthScheme"
              >Other</label
            >
            <input
              type="text"
              class="form-control"
              id="OtherHelthScheme"
              @change="
                update_field(
                  'Knee Lead',
                  name,
                  'Other_HelthScheme',
                  Other_HelthScheme
                )
              "
              v-model="OtherHelthScheme"
            />
          </div>
        </div>
        <div class="col" v-if="health_scheme === 'Mediclaim'">
          <label for="Aadhar Card" class="form-select-label kx-label-secondary">
            Company</label
          >

          <select
            class="form-select"
            aria-label="insurance_company"
            v-model="insurance_company"
            placeholder="Company"
          >
            <option v-for="option in Mediclaim_companies" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="col" v-if="health_scheme === 'Mediclaim'">
          <label for="Aadhar Card" class="form-select-label kx-label-secondary">
            TPA
          </label>
          <select
            class="form-select"
            aria-label="Mediclaim_tpa"
            v-model="Mediclaim_tpa"
            placeholder="TPA"
          >
            <option v-for="option in Mediclaim_tpas" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="col" v-if="health_scheme === 'Mediclaim'">
          <label for="Aadhar Card" class="form-select-label kx-label-secondary">
            Policy Type</label
          >
          <select
            class="form-select"
            aria-label="policy_type"
            v-model="policy_type"
            placeholder="Policy type"
          >
            <option v-for="option in Mediclaim_policy_types" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="col" v-if="health_scheme === 'Mediclaim'">
          <label for="Aadhar Card" class="form-select-label kx-label-secondary">
            Sum Insured (Current)</label
          >
          <select
            class="form-select"
            aria-label="Mediclaim_sum_insured"
            v-model="Mediclaim_sum_insured"
            placeholder="Sum insured "
          >
            <option
              v-for="option in Mediclaim_sum_insured_option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
        <div class="col" v-if="health_scheme === 'Mediclaim'">
          <label for="Aadhar Card" class="form-select-label kx-label-secondary">
            Sum Insured (3 Yr Back)</label
          >
          <select
            class="form-select"
            aria-label="Mediclaim_sum_insured_3year_back"
            v-model="Mediclaim_sum_insured_3year_back"
            placeholder="Sum insured 3yr back"
          >
            <option
              v-for="option in Mediclaim_sum_insured_3year_back_option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
        <!-- CGHS -->
        <div class="card kx-card" v-if="health_scheme == 'CGHS'">
          <!-- <div class="card kx-card"  > -->
          <div class="row">
            <div class="col-sm-6">
              <label
                for="cghs_department_name"
                class="form-text-label kx-label-secondary"
                >CGHS Department Name</label
              >
              <input
                type="text"
                class="form-control"
                id="cghs_department_name"
                accept="image/*, application/pdf"
                v-model="cghs_department_name"
                placeholder="CGHS department name"
              />
            </div>
            <div class="col-sm-6">
              <label for="cghsCard" class="form-text-label kx-label-secondary">
                CGHS Card
              </label>
              <input
                class="form-control"
                type="file"
                id="cghsCard"
                :state="Boolean(cghsCard)"
                accept="image/*, application/pdf"
                @change="handle_mediclaim_doc_upload"
                placeholder="CGHS card"
              />
            </div>
          </div>
          <div class="card kx-card">
            <div class="row">
              <div class="col-sm-6">
                <label
                  for="cghsCard"
                  class="form-text-label kx-label-secondary"
                  v-if="mediclaim_CGHS_Card.length > 0"
                >
                  CGHS Card
                </label>

                <div class="row">
                  <div
                    class="col-sm-6"
                    v-for="item in mediclaim_CGHS_Card"
                    :key="item.name"
                  >
                    <div class="card mt-2">
                      <a
                        v-bind:href="
                          'https://lead.kneexpert.in' + item.attachment
                        "
                      >
                        <img
                          class="card-img-top"
                          v-bind:src="
                            'https://lead.kneexpert.in' + item.attachment
                          "
                          width="200"
                          height="200"
                          alt="xray image"
                        />
                      </a>
                      <div class="card-body">
                        <h5 class="card-title">{{ item.document_type }}</h5>
                        <p class="card-text">
                          Date: {{ format_date_time(item.date) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6" v-if="mediclaim_Adhar_Cards.length > 0">
                <label
                  for="cghsCard"
                  class="form-text-label kx-label-secondary"
                >
                  Adhar Card
                </label>

                <div class="row">
                  <div
                    class="col-sm-6"
                    v-for="item in mediclaim_Adhar_Cards"
                    :key="item.name"
                  >
                    <div class="card mt-2">
                      <a
                        v-bind:href="
                          'https://lead.kneexpert.in' + item.attachment
                        "
                      >
                        <img
                          class="card-img-top"
                          v-bind:src="
                            'https://lead.kneexpert.in' + item.attachment
                          "
                          width="200"
                          height="200"
                          alt="xray image"
                        />
                      </a>
                      <div class="card-body">
                        <h5 class="card-title">{{ item.document_type }}</h5>
                        <p class="card-text">
                          Date: {{ format_date_time(item.date) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- state_gov_scheme -->
        <div class="card kx-card" v-if="health_scheme == 'State Gov. Scheme'">
          <div class="row">
            <div class="col-sm-6">
              <label
                for="state_gov_scheme"
                class="form-label kx-label-secondary"
              >
                Name Of Scheme</label
              >
              <input
                type="text"
                class="form-control"
                id="state_gov_scheme"
                v-model="state_gov_scheme"
                placeholder="Name of Scheme"
              />
            </div>
            <div class="col-sm-6">
              <div>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="is_govt_employee"
                  v-model="is_govt_employee"
                />
                <label class="form-check-label" for="is_govt_employee">
                  is govt. Employee
                </label>
              </div>
            </div>
          </div>
        </div>
        <!--  Ayushman Card -->

        <div class="card kx-card" v-if="health_scheme == 'Ayushman Bharat'">
          <div class="row">
            <div class="col-sm-6">
              <label
                for="ayushmanCard"
                class="form-text-label kx-label-secondary"
              >
                Ayushman Card
              </label>
              <input
                class="form-control"
                type="file"
                id="ayushmanCard"
                :state="Boolean(ayushmanCard)"
                accept="image/*, application/pdf"
                @change="handle_mediclaim_doc_upload"
                placeholder="Aushman Card"
              />
            </div>
            <div class="col-sm-6">
              <label
                for="AadharCard"
                class="form-text-label kx-label-secondary"
              >
                Aadhar Card
              </label>
              <input
                class="form-control"
                type="file"
                id="AadharCard"
                :state="Boolean(AadharCard)"
                accept="image/*, application/pdf"
                @change="handle_mediclaim_doc_upload"
                placeholder="Aadhar card"
              />
            </div>
          </div>
          <div class="card kx-card">
            <div class="row">
              <div class="col-sm-6" v-if="mediclaim_Ayushman_Cards.length > 0">
                <label
                  for="AyushmanCard"
                  class="form-text-label kx-label-secondary"
                >
                  Ayushman Card
                </label>

                <div class="row">
                  <div
                    class="col-sm-6"
                    v-for="item in mediclaim_Ayushman_Cards"
                    :key="item.name"
                  >
                    <div class="card mt-2">
                      <a
                        v-bind:href="
                          'https://lead.kneexpert.in' + item.attachment
                        "
                      >
                        <img
                          class="card-img-top"
                          v-bind:src="
                            'https://lead.kneexpert.in' + item.attachment
                          "
                          width="200"
                          height="200"
                          alt="xray image"
                        />
                      </a>
                      <div class="card-body">
                        <h5 class="card-title">{{ item.document_type }}</h5>
                        <p class="card-text">
                          Date: {{ format_date_time(item.date) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6" v-if="mediclaim_Adhar_Cards.length > 0">
                <label
                  for="cghsCard"
                  class="form-text-label kx-label-secondary"
                >
                  Adhar Card
                </label>

                <div class="row">
                  <div
                    class="col-sm-6"
                    v-for="item in mediclaim_Adhar_Cards"
                    :key="item.name"
                  >
                    <div class="card mt-2">
                      <a
                        v-bind:href="
                          'https://lead.kneexpert.in' + item.attachment
                        "
                      >
                        <img
                          class="card-img-top"
                          v-bind:src="
                            'https://lead.kneexpert.in' + item.attachment
                          "
                          width="200"
                          height="200"
                          alt="xray image"
                        />
                      </a>
                      <div class="card-body">
                        <h5 class="card-title">{{ item.document_type }}</h5>
                        <p class="card-text">
                          Date: {{ format_date_time(item.date) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mediclaim -->

        <div class="card kx-card" v-if="health_scheme == 'Mediclaim'">
          <div class="row">
            <div class="col-sm-4">
              <label
                for="policypaper"
                class="form-text-label kx-label-secondary"
              >
                Policy paper (3Yr.)</label
              >
              <input
                class="form-control"
                type="file"
                id="policypaper"
                :state="Boolean(policypaper)"
                accept="image/*, application/pdf"
                @change="handle_mediclaim_doc_upload"
                placeholder="Policy Paper 3 years"
              />
            </div>
            <div class="col-sm-4">
              <label
                for="AadharCard"
                class="form-text-label kx-label-secondary"
              >
                Aadhar Card</label
              >
              <input
                class="form-control"
                type="file"
                id="AadharCard"
                :state="Boolean(AadharCard)"
                accept="image/*, application/pdf"
                @change="handle_mediclaim_doc_upload"
                placeholder="Upload Aadhar card"
              />
            </div>
            <div class="col-sm-4">
              <label for="PanCard" class="form-text-label kx-label-secondary">
                Pan Card</label
              >
              <input
                class="form-control"
                type="file"
                id="PanCard"
                :state="Boolean(PanCard)"
                accept="image/*, application/pdf"
                @change="handle_mediclaim_doc_upload"
                placeholder="Pan Card"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-sm-4">
              <label
                for="DoctorPrescription"
                class="form-text-label kx-label-secondary"
              >
                Doctor Prescription</label
              >
              <input
                class="form-control"
                type="file"
                id="DoctorPrescription"
                :state="Boolean(DoctorPrescription)"
                accept="image/*, application/pdf"
                @change="handle_mediclaim_doc_upload"
                placeholder="Doctor Prescription"
              />
            </div>
            <div class="col-sm-4">
              <label for="XRay" class="form-text-label kx-label-secondary">
                X Ray</label
              >
              <input
                class="form-control"
                type="file"
                id="XRay"
                accept="image/*, application/pdf"
                @change="handle_mediclaim_doc_upload"
              />
            </div>
            <div class="col-sm-4">
              <label
                for="Investigation"
                class="form-text-label kx-label-secondary"
              >
                Investigation
              </label>
              <input
                class="form-control"
                type="file"
                id="Investigation"
                :state="Boolean(Investigation)"
                accept="image/*, application/pdf"
                @change="handle_mediclaim_doc_upload"
                placeholder="Investigation"
              />
            </div>
          </div>
          <div class="card kx-card">
            <div class="col-sm-12">
              <!-- policy Paper -->
              <div class="row" v-if="mediclaim_Policy_paper_3yr.length > 0">
                <label
                  for="cghsCard"
                  class="form-text-label kx-label-secondary"
                >
                  Policy paper (3 yr.)</label
                >
                <div
                  class="col-sm-3"
                  v-for="item in mediclaim_Policy_paper_3yr"
                  :key="item.name"
                >
                  <div class="card mt-2">
                    <a
                      v-bind:href="
                        'https://lead.kneexpert.in' + item.attachment
                      "
                    >
                      <img
                        class="card-img-top"
                        v-bind:src="
                          'https://lead.kneexpert.in' + item.attachment
                        "
                        width="200"
                        height="200"
                        alt="xray image"
                      />
                    </a>
                    <div class="card-body">
                      <h5 class="card-title">{{ item.document_type }}</h5>
                      <p class="card-text">
                        Date: {{ format_date_time(item.date) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- mediclaim_Adhar_Cards -->
              <div class="row" v-if="mediclaim_Adhar_Cards.length > 0">
                <label for="cghsCard" class="form-text-label kx-label-secondary"
                  >Adhar Card
                </label>
                <div
                  class="col-sm-3"
                  v-for="item in mediclaim_Adhar_Cards"
                  :key="item.name"
                >
                  <div class="card mt-2">
                    <a
                      v-bind:href="
                        'https://lead.kneexpert.in' + item.attachment
                      "
                    >
                      <img
                        class="card-img-top"
                        v-bind:src="
                          'https://lead.kneexpert.in' + item.attachment
                        "
                        width="200"
                        height="200"
                        alt="xray image"
                      />
                    </a>
                    <div class="card-body">
                      <h5 class="card-title">{{ item.document_type }}</h5>
                      <p class="card-text">
                        Date: {{ format_date_time(item.date) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- PAN CARD -->
              <div class="row" v-if="mediclaim_Pan_Card.length > 0">
                <label for="cghsCard" class="form-text-label kx-label-secondary"
                  >PAN Card
                </label>
                <div
                  class="col-sm-3"
                  v-for="item in mediclaim_Pan_Card"
                  :key="item.name"
                >
                  <div class="card mt-2">
                    <a
                      v-bind:href="
                        'https://lead.kneexpert.in' + item.attachment
                      "
                    >
                      <img
                        class="card-img-top"
                        v-bind:src="
                          'https://lead.kneexpert.in' + item.attachment
                        "
                        width="200"
                        height="200"
                        alt="xray image"
                      />
                    </a>
                    <div class="card-body">
                      <h5 class="card-title">{{ item.document_type }}</h5>
                      <p class="card-text">
                        Date: {{ format_date_time(item.date) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Doctor Prescription -->

              <div class="row" v-if="mediclaim_Doctor_Prescription.length > 0">
                <label for="cghsCard" class="form-text-label kx-label-secondary"
                  >Doctor Prescription
                </label>
                <div
                  class="col-sm-3"
                  v-for="item in mediclaim_Doctor_Prescription"
                  :key="item.name"
                >
                  <div class="card mt-2">
                    <a
                      v-bind:href="
                        'https://lead.kneexpert.in' + item.attachment
                      "
                    >
                      <img
                        class="card-img-top"
                        v-bind:src="
                          'https://lead.kneexpert.in' + item.attachment
                        "
                        width="200"
                        height="200"
                        alt="xray image"
                      />
                    </a>
                    <div class="card-body">
                      <h5 class="card-title">{{ item.document_type }}</h5>
                      <p class="card-text">
                        Date: {{ format_date_time(item.date) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Xrays  -->

              <div class="row" v-if="mediclaim_xrays.length > 0">
                <label for="cghsCard" class="form-text-label kx-label-secondary"
                  >Xray
                </label>
                <div
                  class="col-sm-3"
                  v-for="item in mediclaim_xrays"
                  :key="item.name"
                >
                  <div class="card mt-2">
                    <a
                      v-bind:href="
                        'https://lead.kneexpert.in' + item.attachment
                      "
                    >
                      <img
                        class="card-img-top"
                        v-bind:src="
                          'https://lead.kneexpert.in' + item.attachment
                        "
                        width="200"
                        height="200"
                        alt="xray image"
                      />
                    </a>
                    <div class="card-body">
                      <h5 class="card-title">{{ item.document_type }}</h5>
                      <p class="card-text">
                        Date: {{ format_date_time(item.date) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Investigation Report -->
              <div
                class="row"
                v-if="mediclaim_Investigation_Report.length > 10"
              >
                <label for="cghsCard" class="form-text-label kx-label-secondary"
                  >Investigation
                </label>
                <div
                  class="col-sm-3"
                  v-for="item in mediclaim_Investigation_Report"
                  :key="item.name"
                >
                  <div class="card mt-2">
                    <a
                      v-bind:href="
                        'https://lead.kneexpert.in' + item.attachment
                      "
                    >
                      <img
                        class="card-img-top"
                        v-bind:src="
                          'https://lead.kneexpert.in' + item.attachment
                        "
                        width="200"
                        height="200"
                        alt="xray image"
                      />
                    </a>
                    <div class="card-body">
                      <h5 class="card-title">{{ item.document_type }}</h5>
                      <p class="card-text">
                        Date: {{ format_date_time(item.date) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MediclaimTab",
  props: {
    msg: String,
    health_scheme: String,
  },
  mounted() {
    this.get_insurance_company();
    this.get_mediclaim();
    this.get_tpa();
    this.get_policy_type();
    this.get_sum_insured();
    this.get_sum_insured_3_years_back();
    this.get_knee_lead_documents();
  },
  data() {
    return {
      Mediclaim_companies: [],
      Mediclaim_tpas: [],
      Mediclaim_policy_types: [],
      Mediclaim_sum_insured_option: [],
      Mediclaim_sum_insured_3year_back_option: [],
      mediclaim_Policy_paper_3yr: [],
      mediclaim_xrays: [],
      mediclaim_Doctor_Prescription: [],
      mediclaim_Doctor_Prescription: [],
      mediclaim_Ayushman_Cards: [],
      mediclaim_Ayushman_Cards: [],
      mediclaim_Investigation_Report: [],
      mediclaim_Pan_Card: [],
      mediclaim_CGHS_Card: [],
      mediclaim_Adhar_Cards: [],

      Mediclaim_tpa: "",

      Mediclaim_sum_insured: "",
      Mediclaim_sum_insured_3year_back: "",
      cghs_department_name: "",
      state_gov_scheme: "",
      is_govt_employee: "",

      insurance_company: "",
      // knee_lead: "8005834930",
      policy_type: "",
      sum_insured: "2.5 Lakh",
      sum_insured_3_years_back: "2.5 Lakh",
      tpa: "Anmol Medicare Insurance TPA Limited",

      policypaper: "",
      AadharCard: "",
      PanCard: "",
      DoctorPrescription: "",
      Investigation: "",
      file_type: "",
      loading: false,
    };
  },
  methods: {
    get_insurance_company: async function () {
      await axios
        .get("knee_lead.api.get_insurance_company")
        .then((response) => {
          for (let x in response.data.data) {
            this.Mediclaim_companies.push(response.data.data[x].name);
          }
        })
        .catch((error) => {});
    },
    get_tpa: async function () {
      await axios
        .get("knee_lead.api.get_tpa")
        .then((response) => {
          for (let x in response.data.data) {
            this.Mediclaim_tpas.push(response.data.data[x].name);
          }
        })
        .catch((error) => {});
    },
    get_policy_type: async function () {
      await axios
        .get("knee_lead.api.get_policy_type")
        .then((response) => {
          this.Mediclaim_policy_types = response.data.message;
        })
        .catch((error) => {});
    },
    get_sum_insured: async function () {
      await axios
        .get("knee_lead.api.get_sum_insured")
        .then((response) => {
          this.Mediclaim_sum_insured_option = response.data.message;
        })
        .catch((error) => {});
    },
    get_sum_insured_3_years_back: async function () {
      await axios
        .get("knee_lead.api.get_sum_insured_3_years_back")
        .then((response) => {
          this.Mediclaim_sum_insured_3year_back_option = response.data.message;
        })
        .catch((error) => {});
    },
    get_mediclaim: async function () {
      await axios
        .get("knee_lead.api.get_mediclaim", {
          params: {
            knee_lead: this.$route.params.id,
          },
        })
        .then((response) => {
          this.Mediclaim_tpa = response.data.data[0].tpa;
          this.insurance_company = response.data.data[0].insurance_company;
          this.policy_type = response.data.data[0].policy_type;
          this.Mediclaim_sum_insured = response.data.data[0].sum_insured;
          this.Mediclaim_sum_insured_3year_back =
            response.data.data[0].sum_insured_3_years_back;
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

    add_mediclaim: async function () {
      const formdata = {
        knee_lead: this.$route.params.id,
        health_scheme: this.health_scheme,
        insurance_company: this.insurance_company,
        tpa: this.Mediclaim_tpa,
        policy_type: this.policy_type,
        sum_insured: this.Mediclaim_sum_insured,
        sum_insured_3_years_back: this.Mediclaim_sum_insured_3year_back,
      };
      await axios
        .post("knee_lead.api.add_mediclaim", formdata)
        .then((response) => {})
        .catch((error) => {});
    },

    handle_mediclaim_doc_upload: function (e) {
      const field_id = e.target.id;
      const selectedImage = e.target.files[0];
      if (selectedImage["type"] === "image/jpeg") {
        this.file_type = "jpeg";
      }
      if (selectedImage["type"] === "application/pdf") {
        this.file_type = "pdf";
      }

      this.createbase64image1(selectedImage, e.target.id);
    },

    createbase64image1: function (fileObject, file_id) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (file_id == "Investigation") {
          this.Investigation = e.target.result;
        }
        if (file_id == "ayushmanCard") {
          this.ayushmanCard = e.target.result;
        }
        if (file_id == "AadharCard") {
          this.AadharCard = e.target.result;
        }
        if (file_id == "cghsCard") {
          this.cghsCard = e.target.result;
        }
        if (file_id == "policypaper") {
          this.policypaper = e.target.result;
        }
        if (file_id == "PanCard") {
          this.PanCard = e.target.result;
        }
        if (file_id == "DoctorPrescription") {
          this.DoctorPrescription = e.target.result;
        }
        if (file_id == "XRay") {
          this.XRay = e.target.result;
        }

        this.add_mediclaim_doc(file_id);
      };
      reader.readAsDataURL(fileObject);
    },

    add_mediclaim_doc: async function (upload_doc) {
      if (upload_doc == "Investigation") {
        var doc_type = "Investigation Report";
        var file_data = this.Investigation;
        document.getElementById("Investigation").value = "";
      }
      if (upload_doc == "AadharCard") {
        var doc_type = "Adhar Card";
        var file_data = this.AadharCard;
        document.getElementById("AadharCard").value = "";
      }
      if (upload_doc == "ayushmanCard") {
        var doc_type = "Ayushman Card";
        var file_data = this.ayushmanCard;
        document.getElementById("ayushmanCard").value = "";
      }
      if (upload_doc == "cghsCard") {
        var doc_type = "CGHS Card";
        var file_data = this.cghsCard;
        document.getElementById("cghsCard").value = "";
      }
      if (upload_doc == "policypaper") {
        var doc_type = "Policy paper 3yr";
        var file_data = this.policypaper;
        document.getElementById("policypaper").value = "";
      }
      if (upload_doc == "PanCard") {
        var doc_type = "Pan Card";
        var file_data = this.PanCard;
        document.getElementById("PanCard").value = "";
      }
      if (upload_doc == "DoctorPrescription") {
        var doc_type = "Doctor Prescription";
        var file_data = this.DoctorPrescription;
        document.getElementById("DoctorPrescription").value = "";
      }
      if (upload_doc == "XRay") {
        var file_data = this.XRay;
        document.getElementById("XRay").value = "";
      }

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
        document_type: doc_type,
        filename:
          this.$route.params.id + this.patient_full_name + "." + this.file_type,
        filedata: file_data,
      };
      this.loading = !false;

      await axios
        .post("knee_lead.api.add_knee_lead_documents", formdata)
        .then((response) => {
          this.loading = false;
          this.get_knee_lead_documents();
          this.policypaper = "";
          this.AadharCard = "";
          this.PanCard = "";
          this.DoctorPrescription = "";
          this.Investigation = "";
        })
        .catch((error) => {});
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
  },
};
</script>

<style scoped lang="scss"></style>
