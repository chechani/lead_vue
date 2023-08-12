<template>
  <div>
    <div class="card kx-card">
      <div class="row">
        <div class="card kx-card">
          <div v-if="loading">loading ..</div>
          <div class="col-sm-12" v-else>
            <div class="row">
              <div class="col-sm-6" v-if="xray_records.length > 0">
                <label for="formFile" class="form-label kx-label-secondary"
                  >Filter
                </label>
                <br />

                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="filterRadioOther"
                    id="filterRadioXray"
                    v-model="search"
                    value="Xray"
                  />
                  <label class="form-check-label" for="filterRadioXray"
                    >Xray</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="filterRadioOther"
                    id="filterRadioMRI"
                    v-model="search"
                    value="MRI"
                  />
                  <label class="form-check-label" for="filterRadioMRI"
                    >MRI</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="filterRadioOther"
                    id="filterRadioScanogram"
                    v-model="search"
                    value="Scanogram"
                  />
                  <label class="form-check-label" for="filterRadioScanogram"
                    >Scanogram</label
                  >
                </div>
                <br />
                <br />
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="filterRadioOther"
                    id="filterold_documents"
                    v-model="search"
                    value="Old Documents"
                  />
                  <label class="form-check-label" for="filterold_documents"
                    >Old Documents</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="filterRadioOther"
                    id="filterRadioOther"
                    v-model="search"
                    value="Other"
                  />
                  <label class="form-check-label" for="filterRadioOther"
                    >Other</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="filterRadioOther"
                    id="filterRadioAll"
                    v-model="search"
                    value="All"
                  />
                  <label class="form-check-label" for="filterRadioAll"
                    >All</label
                  >
                </div>
              </div>

              <div class="col-sm-6">
                <div class="row">
                  <div class="col">
                    <label for="formFile" class="form-label kx-label-secondary"
                      >Upload {{ upload_type }}</label
                    >
                    <input
                      class="form-control"
                      type="file"
                      id="upload_xray_image"
                      @change="handle_xray_upload"
                      accept="image/*, application/pdf"
                      placeholder="Xray"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col kx-label-secondary">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="RadioXray"
                        v-model="upload_type"
                        value="Xray"
                      />
                      <label class="form-check-label" for="RadioXray"
                        >Xray</label
                      >
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="RadioMRI"
                        v-model="upload_type"
                        value="MRI"
                      />
                      <label class="form-check-label" for="RadioMRI">MRI</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="RadioScanogram"
                        v-model="upload_type"
                        value="Scanogram"
                      />
                      <label class="form-check-label" for="RadioScanogram"
                        >Scanogram</label
                      >
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="Radioold_documents"
                        v-model="upload_type"
                        value="Old Documents"
                      />
                      <label class="form-check-label" for="Radioold_documents"
                        >Old Documents</label
                      >
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="RadioOther"
                        v-model="upload_type"
                        value="Other"
                      />
                      <label class="form-check-label" for="RadioOther"
                        >Other</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card kx-card">
        <div class="row">
          <nav v-if="filteredxrayItems.length > 5">
            <button
              class="pagination-button"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              Prev
            </button>
            <span>{{ currentPage }} of {{ totalPages }}</span>
            <button
              class="pagination-button"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              Next
            </button>
          </nav>

          <div
            class="col-sm-3"
            v-for="item in filteredxrayItems"
            :key="item.name"
          >
            <div class="card mt-2">
              <a @click="fnShowXrayModel(item.xray)">
                <img
                  class="card-img-top"
                  v-bind:src="
                    'data:' + detectMimeType(item.xray) + ';base64,' + item.xray
                  "
                  width="200"
                  height="200"
                  :alt="item.type"
                  v-if="
                    detectMimeType(item.xray) == 'image/png' ||
                    detectMimeType(item.xray) == 'image/jpg' ||
                    detectMimeType(item.xray) == 'image/gif'
                  "
                />
                <img
                  class="card-img-top"
                  src="../../assets/img/pdf-file.svg"
                  width="200"
                  height="200"
                  :alt="item.type"
                  v-else
                />
              </a>
              <div class="card-body">
                <h5 class="card-title">{{ item.type }}</h5>
                {{ detectMimeType(item.xray) }}

                <p class="card-text card-date">
                  {{ format_date_time(item.date) }}
                </p>
                <button
                  class="btn btn-info"
                  @click="fnShowXrayModel(item.xray)"
                >
                  Open
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ShowXray
    @add="ShowXrayModel = true"
    @close="ShowXrayModel = false"
    :show="ShowXrayModel"
    :xrayId="xrayId"
    msg="TIkam"
  />
</template>

<script>
import axios from "axios";
import pdf from "vue-pdf";
// import ModalSuccess from "@/components/modals/ModalSuccess.vue";
import ShowXray from "@/components/modals/ShowXray.vue";

// ShowXrayModal;

export default {
  name: "FilesTab",
  components: {
    pdf,
    ShowXray,
  },
  props: {
    msg: String,
  },
  mounted() {
    this.get_xray_record();
    this.fetch_xray_base64();
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      perPage: 5,
      xray_records: [],
      search: "All",
      upload_type: "Xray",
      file_type: "",
      xrayId: "",
      ShowXrayModel: false,
      // handle_xray_upload: '',
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
        // return this.xray_records;
      }
    },
    paginatedDatadirectxray() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.xray_records.slice(startIndex, endIndex);
    },
  },

  methods: {
    fnShowXrayModel: function (e) {
      this.xrayId = e;
      this.ShowXrayModel = !this.ShowXrayModel;
    },
    getFileExtension: function (filename) {
      var file_type = filename.slice(
        ((filename.lastIndexOf(".") - 1) >>> 0) + 2
      );
    },

    handle_xray_upload: function (e) {
      const selectedImage = e.target.files[0];
      if (selectedImage["type"] === "image/jpeg") {
        this.file_type = "jpeg";
      }
      if (selectedImage["type"] === "image/jpg") {
        this.file_type = "jpg";
      }

      if (selectedImage["type"] === "image/png") {
        this.file_type = "png";
      }
      if (selectedImage["type"] === "application/pdf") {
        this.file_type = "pdf";
      }

      this.createBase64Imagexray(selectedImage);
    },

    createBase64Imagexray: function (fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        let base_64_file = e.target.result.split(",");
        this.upload_xray_image = base_64_file[1];
        this.upload_xray();
      };
      reader.readAsDataURL(fileObject);
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
        filename:
          this.$route.params.id + this.patient_full_name + "." + this.file_type,
        filedata: this.upload_xray_image,
      };
      this.loading = !false;

      await axios
        .post("knee_lead.api.add_direct_xray", formdata)
        .then((response) => {
          this.get_xray_record();
          this.loading = false;
          this.upload_xray_image = "";

          document.getElementById("upload_xray_image").value = "";
        })
        .catch((error) => {});
    },
    fetch_xray_base64: function () {
      axios
        .get("knee_lead.api.get_direct_xray_base64", {
          params: {
            knee_lead_id: this.$route.params.id,
          },
        })
        .then((response) => {
          this.xray_records = response.data.data;
        })
        .catch((error) => {});
    },

    detectMimeType: function (b64) {
      var signatures = {
        JVBERi0: "application/pdf",
        R0lGODdh: "image/gif",
        R0lGODlh: "image/gif",
        iVBORw0KGgo: "image/png",
        "/9j/": "image/jpg",
      };

      for (var s in signatures) {
        if (b64.indexOf(s) === 0) {
          return signatures[s];
          // return "data:" + signatures[s] + ";base64," + b64;
          // data:application/pdf;base64,
        }
      }
    },

    get_xray_record: async function () {
      await axios
        .get("knee_lead.api.get_direct_xray", {
          params: {
            knee_lead_id: this.$route.params.id,
          },
        })
        .then((response) => {})
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
