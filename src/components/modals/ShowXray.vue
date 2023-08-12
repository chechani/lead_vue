<template>
  <div class="modal-mask modal-lg" v-if="show">
    <div class="modal-container rounded">
      <div class="modal-header">
        <h3 class="modal-title fs-5" id="exampleModalLabel">
          <strong> </strong>
        </h3>

        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal-mask"
          aria-label="Close"
          @click="$emit('close')"
        ></button>
      </div>
      <div class="modal-body justify-content-center">
        <img
          width="960"
          height="800"
          v-bind:src="'data:' + detectMimeType(xrayId) + ';base64,' + xrayId"
          v-if="
            detectMimeType(xrayId) == 'image/png' ||
            detectMimeType(xrayId) == 'image/jpg' ||
            detectMimeType(xrayId) == 'image/gif'
          "
        />

        <vue-pdf-embed
          :source="'data:' + detectMimeType(xrayId) + ';base64,' + xrayId"
          v-else
        />
      </div>
      <div class="modal-footer"></div>
    </div>
  </div>
  <ModalSuccess
    @success="ShowSuccessModel = true"
    @close="ShowSuccessModel = false"
    :show="ShowSuccessModel"
    msg="X Ray Sent Successfully"
  />
</template>

<script>
import axios from "axios";
import VuePdfEmbed from "vue-pdf-embed";

import Multiselect from "@vueform/multiselect";
import ModalSuccess from "@/components/modals/ModalSuccess.vue";

export default {
  name: "ShowXray",
  components: {
    Multiselect,
    ModalSuccess,
    VuePdfEmbed,
  },
  props: {
    msg: String,
    show: false,
    exercise_options: [],

    Knee_lead: "",
    xrayId: "",
  },
  mounted() {},
  data() {
    return {
      ShowSuccessModel: false,
      whatsapp_templates: [],
      center_list: [],
      selected_centers: [],
      selectedtherapyplan: [],
      name: "",
      mobile: "",
      exercise_req: "",
      selected: "",
      options: [],
      whatsapp_template: "",
      roles: [],

      doctype: "Knee Lead",
      user: this.selected,
      read: "0",
      write: "0",
      submit: "0",
      share: "0",
      everyone: "0",
      notify: "0",
      xray_records: [],
      xray_files: [],
      therapy_plan_template: [],
      lead_basic_details: [],
      pdfUrl: "",
    };
  },
  methods: {
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
        }
      }
    },
    fetch_xray_base64: function () {
      axios
        .get("knee_lead.api.get_direct_xray_base64", {
          params: {
            knee_lead_id: this.$route.params.id,
          },
        })
        .then((response) => {
          this.pdfUrl =
            "data:application/pdf;base64," + response.data.data[0].xray;
        })
        .catch((error) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
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
  width: 90%;
  max-width: 100%;
}

.modal {
  display: block !important; /* I added this to see the modal, you don't need this */
}

/* Important part */
.modal-dialog {
  overflow-y: initial !important;
}
.modal-body {
  height: 80vh;
  overflow-y: auto;
}
</style>
