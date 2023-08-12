<template>
  <div class="modal-mask" v-if="show">
    <div class="modal-container rounded">
      <div class="modal-header">
        <h3 class="modal-title fs-5" id="exampleModalLabel">
          Share <strong> {{ Knee_lead }} </strong> With
        </h3>

        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal-mask"
          aria-label="Close"
          @click="$emit('close')"
        ></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-6">
            <label class="form-check-label" for="Group">Group</label>
            <Multiselect
              id="Group"
              v-model="role"
              :options="roles"
              :searchable="true"
              @change="get_user_list_by_role($event)"
            >
            </Multiselect>
          </div>
          <div class="col-sm-6">
            <label class="form-check-label" for="users">User</label>
            <Multiselect
              id="users"
              v-model="selected"
              :options="options"
              :searchable="true"
            >
            </Multiselect>
          </div>
        </div>
        <div class="row mt-4">
          <div class="d-flex justify-content-center">
            <p class="text-success">{{ res_message }}</p>
          </div>

          <div class="col" v-if="selected.length > 0">
            <table class="table table-hover">
              <thead>
                <tr>
                  <td scope="col">User</td>
                  <td scope="col">Read</td>
                  <td scope="col">Write</td>

                  <td scope="col">Share</td>
                </tr>
              </thead>

              <tbody>
                <!-- <tr v-for="item in selected"> -->
                <tr>
                  <th scope="row">{{ selected }}</th>
                  <td>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="read"
                        value=""
                        v-model="read"
                        true-value="1"
                        false-value="0"
                      />
                    </div>
                  </td>
                  <td>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="write"
                        value=""
                        v-model="write"
                        true-value="1"
                        false-value="0"
                      />
                    </div>
                  </td>
                  <!-- <td>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="submit"
                        value=""
                        v-model="submit"
                        true-value="1"
                        false-value="0"
                      />
                    </div>
                  </td> -->
                  <td>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="share"
                        value=""
                        v-model="share"
                        true-value="1"
                        false-value="0"
                      />
                    </div>
                  </td>
                  <!-- <td>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="everyone"
                        value=""
                        v-model="everyone"
                        true-value="1"
                        false-value="0"
                      />
                    </div>
                  </td> -->
                  <!-- <td>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="notify"
                        value=""
                        v-model="notify"
                        true-value="1"
                        false-value="0"
                      />
                    </div>
                  </td> -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-sm btn-primary mt-2" @click="share_doc()">
          <i class="fas fa-share"></i> Share
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Multiselect from "@vueform/multiselect";
export default {
  name: "ModalShare",
  components: { Multiselect },
  props: {
    msg: String,
    show: false,
    exercise_options: [],

    Knee_lead: "",
  },
  mounted() {
    this.get_user_roles();
    // this.get_investigation_advice();
  },
  data() {
    return {
      name: "",
      mobile: "",
      exercise_req: "",
      selected: "",
      options: [],
      role: "",
      roles: [],

      doctype: "Knee Lead",
      user: this.selected,
      read: "0",
      write: "0",
      submit: "0",
      share: "0",
      everyone: "0",
      notify: "0",
      res_message: "",
    };
  },
  methods: {
    share_doc: async function () {
      const formdata = {
        doctype: this.doctype,
        name: this.Knee_lead,
        user: this.selected,
        read: this.read,
        write: this.write,
        submit: this.submit,
        share: this.share,
        everyone: this.everyone,
        notify: this.notify,
      };

      this.loading = !false;
      await axios
        .post("knee_lead.docshare.share_lead", formdata)
        .then((response) => {
          this.res_message = response.data.message;
        })
        .catch((error) => {});
    },

    get_user_list_by_role: async function (e) {
      await axios
        .get("knee_lead.docshare.get_users_by_role?role=" + e)
        .then((response) => {
          this.options = [];
          for (let x in response.data.data) {
            this.options.push(response.data.data[x].users);
          }
        })
        .catch((error) => {});
    },

    get_user_roles: async function () {
      await axios
        .get("knee_lead.docshare.get_specific_roles")
        .then((response) => {
          this.roles = response.data.data;
        })
        .catch((error) => {});
    },
  },
};
</script>

<style lang="scss">
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
  width: 80vw;
  max-width: 50%;
}
</style>
