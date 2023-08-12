<template>
  <div id="content">
    <SideBaar></SideBaar>
    <Header></Header>

    <div v-if="loading" class="loader" id="kxloader">
      <img alt="Maleyoung" src="../assets/img/kxloader.gif" />
    </div>

    <div class="container-fluid" v-else>
      <!-- new radio -->
      <div class="row">
        <div class="radio-toolbar">
          <div class="row">
            <div class="col-sm-2" v-for="item in lead_couns_lead_status">
              <input
                type="radio"
                :id="item.knee_lead_status"
                :name="item.knee_lead_status"
                :value="item.knee_lead_status"
                v-model="status"
                @change="get_data_from_status"
              />
              <label
                v-if="item.knee_lead_status == 'Xray Received (Opportunity)'"
                :for="item.knee_lead_status"
              >
                Xray Received
                <br />
                <p>
                  {{ item.count }}
                </p>
              </label>
              <label :for="item.knee_lead_status" v-else
                >{{ item.knee_lead_status }}
                <p>
                  {{ item.count }}
                </p></label
              >
            </div>
          </div>
        </div>
      </div>
      <!-- end new radio -->

      <div class="row">
        <div class="col-sm-12">
          <div class="radio-toolbar">
            <div class="row">
              <div class="col-sm-2" v-for="item in followup_Options">
                <input
                  type="radio"
                  :id="item"
                  :name="item"
                  :value="item"
                  v-model="status"
                  @change="followup_stage_search"
                />

                <label :for="item"
                  >{{ item }}
                  <p v-if="item == 'Today'">
                    {{ TodayLead }}
                  </p>
                  <p v-if="item == 'This Week'">
                    {{ This_Week }}
                  </p>

                  <p v-if="item == 'Next Week'">
                    {{ Next_Week }}
                  </p>

                  <p v-if="item == 'Missed'">
                    {{ Missed_Follow_ups }}
                  </p>
                  <!-- <p v-if="item == 'Shared'">
                    {{ shared_leads.length }}
                  </p> -->
                  <!-- Show All -->
                  <p v-if="item == 'Show All'">
                    {{ total_knee_lead_counts }}
                  </p>
                </label>
              </div>
            </div>
            <div class="row">
              <!-- showallLeads -->

              <div class="col-sm-4 mt-3">
                <div class="card">
                  <table style="width:100% text-align:center;">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>0 - 30</th>
                        <th>30 - 60</th>
                        <th>60+</th>
                        <th>Total</th>
                      </tr>
                    </thead>

                    <tr v-for="item in incalls">
                      <td>IN</td>
                      <td>{{ item.calls_0_to_30 }}</td>
                      <td>{{ item.calls_30_to_60 }}</td>
                      <td>{{ item.calls_60_plus }}</td>
                      <td>{{ item.calls_made_today }}</td>
                    </tr>
                    <tr v-for="item in outcalls">
                      <td>Out</td>
                      <td>{{ item.calls_0_to_30 }}</td>
                      <td>{{ item.calls_30_to_60 }}</td>
                      <td>{{ item.calls_60_plus }}</td>
                      <td>{{ item.calls_made_today }}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="table-responsive">
            <div class="row">
              <div class="row mt-4">
                <div class="col-sm-6">
                  <div class="row">
                    <div class="col-sm-10">
                      <div class="input-group mb-3">
                        <input
                          type="text"
                          class="form-control form-control-sm"
                          v-model="global_search_lead"
                          placeholder="Search Globaly"
                          aria-label="Search Globaly"
                          aria-describedby="basic-addon2"
                        />
                        <div class="input-group-append">
                          <button style="margin-left: 10px;"
                            :disabled="!global_search_lead"
                            class="btn btn-primary"
                            @click="searchGlobal"
                          >
                            <i class="fa fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <button style="margin-top: 2px;"
                        type="button"
                        class="btn btn-primary btn-sm mb-2"
                        @click="openmodal"
                      >
                        <i class="fas fa-plus-circle"></i>
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="row">
                    <div class="col">
                      <div class="row">
                        <div class="col-sm-5">
                          <Multiselect
                            v-if="showFilter"
                            v-model="filterSelected"
                            :options="fileterOptions"
                            :searchable="true"
                          >
                          </Multiselect>

                          <Multiselect
                            v-else
                            v-model="tags"
                            mode="tags"
                            placeholder="Select your Tags"
                            :datasource="tag_options"
                            :fields="tag_options_fields"
                            :options="tag_options"
                            :searchable="true"
                            :createTag="true"
                            @search-change="search_tags"
                            :on-tag="search_tags"
                            :allow-empty="false"
                            :on-remove="(tag) => remove_tags(tag)"
                          >
                          </Multiselect>

                          <Multiselect
                            class="mt-2 mb-2"
                            v-if="showFilter"
                            v-model="filterSelected2"
                            :options="fileterOptions"
                            :searchable="true"
                          >
                          </Multiselect>
                        </div>
                        <div class="col-sm-5">
                          <div class="input-group mb-3" v-if="showFilter">
                            <select
                              v-if="filterSelected == 'funnel_stage'"
                              class="form-select"
                              id="filtervalue"
                              aria-label="filtervalue"
                              v-model="filtervalue"
                            >
                              <option
                                v-for="option in funnel_stage_options"
                                :value="option"
                              >
                                {{ option }}
                              </option>
                            </select>

                            <select
                              v-else-if="filterSelected == 'gender'"
                              class="form-select"
                              id="gender"
                              aria-label="gender"
                              v-model="filtervalue"
                            >
                              <option
                                v-for="option in gender_options"
                                :value="option"
                              >
                                {{ option }}
                              </option>
                            </select>

                            <select
                              v-else-if="filterSelected == 'pain_since'"
                              class="form-select"
                              id="pain_since"
                              aria-label="pain_since"
                              v-model="filtervalue"
                            >
                              <option
                                v-for="option in pain_since_options"
                                :value="option"
                              >
                                {{ option }}
                              </option>
                            </select>

                            <select
                              v-else-if="
                                filterSelected == 'pain_increase_while'
                              "
                              class="form-select"
                              id="pain_increase_while"
                              aria-label="pain_increase_while"
                              v-model="filtervalue"
                            >
                              <option
                                v-for="option in pain_increase_while_options"
                                :value="option"
                              >
                                {{ option }}
                              </option>
                            </select>
                            <!-- pain_location_options -->

                            <select
                              v-else-if="filterSelected == 'pain_location'"
                              class="form-select"
                              id="pain_location"
                              aria-label="pain_location"
                              v-model="filtervalue"
                            >
                              <option
                                v-for="option in pain_location_options"
                                :value="option"
                              >
                                {{ option }}
                              </option>
                            </select>

                            <!-- mode_of_request_options -->

                            <select
                              v-else-if="
                                filterSelected == 'xray_request_status'
                              "
                              class="form-select"
                              id="pain_location"
                              aria-label="pain_location"
                              v-model="filtervalue"
                            >
                              <option
                                v-for="option in xray_request_status_options"
                                :value="option"
                              >
                                {{ option }}
                              </option>
                            </select>

                            <select
                              v-else-if="
                                filterSelected == 'xray_diagnosis_left'
                              "
                              class="form-select"
                              id="pain_location"
                              aria-label="pain_location"
                              v-model="filtervalue"
                            >
                              <option
                                v-for="option in xray_diagnosis_left_options"
                                :value="option"
                              >
                                {{ option }}
                              </option>
                            </select>

                            <select
                              v-else-if="
                                filterSelected == 'xray_diagnosis_right'
                              "
                              class="form-select"
                              id="pain_location"
                              aria-label="pain_location"
                              v-model="filtervalue"
                            >
                              <option
                                v-for="option in xray_diagnosis_right_options"
                                :value="option"
                              >
                                {{ option }}
                              </option>
                            </select>

                            <select
                              v-else-if="
                                filterSelected == 'knee_xray_grade_left'
                              "
                              class="form-select"
                              id="knee_xray_grade_left"
                              aria-label="knee_xray_grade_left"
                              v-model="filtervalue"
                            >
                              <option
                                v-for="option in knee_xray_grade_left_options"
                                :value="option"
                              >
                                {{ option }}
                              </option>
                            </select>

                            <select
                              v-else-if="
                                filterSelected == 'knee_xray_grade_right'
                              "
                              class="form-select"
                              id="knee_xray_grade_right"
                              aria-label="knee_xray_grade_right"
                              v-model="filtervalue"
                            >
                              <option
                                v-for="option in knee_xray_grade_right_options"
                                :value="option"
                              >
                                {{ option }}
                              </option>
                            </select>

                            <select
                              v-else-if="
                                filterSelected == 'hip_xray_diagnosis_left'
                              "
                              class="form-select"
                              id="hip_xray_diagnosis_left"
                              aria-label="hip_xray_diagnosis_left"
                              v-model="filtervalue"
                            >
                              <option
                                v-for="option in hip_xray_diagnosis_left_options"
                                :value="option"
                              >
                                {{ option }}
                              </option>
                            </select>

                            <select
                              v-else-if="
                                filterSelected == 'hip_xray_diagnosis_right'
                              "
                              class="form-select"
                              id="hip_xray_diagnosis_right"
                              aria-label="hip_xray_diagnosis_right"
                              v-model="filtervalue"
                            >
                              <option
                                v-for="option in hip_xray_diagnosis_right_options"
                                :value="option"
                              >
                                {{ option }}
                              </option>
                            </select>

                            <select
                              v-else-if="filterSelected == 'deformity_left'"
                              class="form-select"
                              id="deformity_left"
                              aria-label="deformity_left"
                              v-model="filtervalue"
                            >
                              <option
                                v-for="option in deformity_left_options"
                                :value="option"
                              >
                                {{ option }}
                              </option>
                            </select>

                            <select
                              v-else-if="filterSelected == 'deformity'"
                              class="form-select"
                              id="deformity"
                              aria-label="deformity"
                              v-model="filtervalue"
                            >
                              <option
                                v-for="option in deformity_options"
                                :value="option"
                              >
                                {{ option }}
                              </option>
                            </select>

                            <select
                              v-else-if="filterSelected == 'mri_diagnosis_left'"
                              class="form-select"
                              id="mri_diagnosis_left"
                              aria-label="mri_diagnosis_left"
                              v-model="filtervalue"
                            >
                              <option
                                v-for="option in mri_diagnosis_left_options"
                                :value="option"
                              >
                                {{ option }}
                              </option>
                            </select>

                            <select
                              v-else-if="
                                filterSelected == 'mri_diagnosis_right'
                              "
                              class="form-select"
                              id="mri_diagnosis_right"
                              aria-label="mri_diagnosis_right"
                              v-model="filtervalue"
                            >
                              <option
                                v-for="option in mri_diagnosis_right_options"
                                :value="option"
                              >
                                {{ option }}
                              </option>
                            </select>

                            <select
                              v-else-if="filterSelected == 'mri_deformity_left'"
                              class="form-select"
                              id="mri_deformity_left"
                              aria-label="mri_deformity_left"
                              v-model="filtervalue"
                            >
                              <option
                                v-for="option in mri_deformity_left_options"
                                :value="option"
                              >
                                {{ option }}
                              </option>
                            </select>

                            <select
                              v-else-if="filterSelected == 'mri_deformity_left'"
                              class="form-select"
                              id="mri_deformity_left"
                              aria-label="mri_deformity_left"
                              v-model="filtervalue"
                            >
                              <option
                                v-for="option in mri_deformity_left_options"
                                :value="option"
                              >
                                {{ option }}
                              </option>
                            </select>

                            <select
                              v-else-if="
                                filterSelected == 'mri_deformity_right'
                              "
                              class="form-select"
                              id="mri_deformity_right"
                              aria-label="mri_deformity_right"
                              v-model="filtervalue"
                            >
                              <option
                                v-for="option in mri_deformity_right_options"
                                :value="option"
                              >
                                {{ option }}
                              </option>
                            </select>

                            <select
                              v-else-if="filterSelected == 'mode_of_request'"
                              class="form-select"
                              id="pain_location"
                              aria-label="pain_location"
                              v-model="filtervalue"
                            >
                              <option
                                v-for="option in mode_of_request_options"
                                :value="option"
                              >
                                {{ option }}
                              </option>
                            </select>
                            <select
                              v-else-if="filterSelected == 'pain_location'"
                              class="form-control"
                              id="pain_location"
                              aria-label="pain_location"
                              v-model="filtervalue"
                            >
                              <option
                                v-for="option in pain_location_options"
                                :value="option"
                              >
                                {{ option }}
                              </option>
                            </select>

                            <VueDatePicker
                              v-else-if="filterSelected == 'opd_date'"
                              id="opd_date"
                              v-model="filtervalue"
                              format="dd/MM/yyyy H:I"
                            ></VueDatePicker>

                            <VueDatePicker
                              v-else-if="filterSelected == 'date_and_time'"
                              id="opd_date"
                              v-model="filtervalue"
                              format="dd/MM/yyyy H:I"
                            ></VueDatePicker>

                            <VueDatePicker
                              v-else-if="
                                filterSelected == 'next_follow_up_date'
                              "
                              id="opd_date"
                              v-model="filtervalue"
                              format="dd/MM/yyyy"
                            ></VueDatePicker>
                            <VueDatePicker
                              v-else-if="
                                filterSelected == 'xray_request_date_time'
                              "
                              id="opd_date"
                              v-model="filtervalue"
                              format="dd/MM/yyyy H:I"
                            ></VueDatePicker>

                            <input
                              v-else
                              type="text"
                              v-model="filtervalue"
                              class="form-control"
                              placeholder="Filter"
                              aria-label="Filter"
                              aria-describedby="basic-addon2"
                            />
                            <div class="input-group-append"></div>
                          </div>
                          <!--  -->
                          <div class="input-group mb-2" v-if="showFilter">
                            <input
                              type="text"
                              v-model="filtervalue2"
                              class="form-control"
                              placeholder="Filter"
                              aria-label="Filter"
                              aria-describedby="basic-addon2"
                            />
                            <div class="input-group-append"></div>
                          </div>
                        </div>
                        <div class="col-sm-2">
                          <button
                            class="btn btn-sm btn-primary m-1"
                            @click="showFilterfn"
                          >
                            <i class="fa fa-filter" aria-hidden="true"></i>
                          </button>
                          <button
                            class="btn btn-sm btn-primary m-1"
                            @click="showtagFilterfn"
                          >
                            <i class="fa fa-tag" aria-hidden="true"></i>
                          </button>
                          <button
                            v-if="showFilter"
                            class="btn btn-primary mb-2"
                            @click="SearchFilter((currentPage = '1'))"
                          >
                            <i class="fa fa-search"></i>
                          </button>
                          <button style="height: 33px; width: 40px;"
                            v-else
                            class="btn btn-primary mb-2"
                            @click="search_tags((currentPage = '1'))"
                          >
                            <i class="fa fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <table
              ref="table"
              class="table"
              @keydown.arrow-up.prevent="selectPreviousRow"
              @keydown.arrow-down.prevent="selectNextRow"
            >
              <!-- v-if="loading" -->

              <thead>
                <tr>
                  <th scope="col" @click="tableFilter('name')">Name</th>
                  <th scope="col" @click="tableFilter('Last Interaction')">
                    Last Interaction
                  </th>
                  <th scope="col" @click="tableFilter('Next Followup')">
                    Next Followup
                  </th>
                  <th scope="col" @click="tableFilter('Priority')">Priority</th>
                  <th scope="col" @click="tableFilter('Status')">Status</th>
                  <th scope="col" @click="tableFilter('Users')">Users</th>
                  <th scope="col" @click="tableFilter('Owner')">Owner</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tr>
                <td>
                  <input
                    v-if="tableFilterVal == 'name'"
                    class="form-control"
                    list="mainSearcbarOptions"
                    id="mainSearcbar"
                    v-model="search"
                    placeholder=""
                    v-on:keyup="intableFilter(tableFilterVal, search)"
                  />
                </td>
                <td>
                  <input
                    v-if="tableFilterVal == 'Last Interaction'"
                    class="form-control"
                    list="mainSearcbarOptions"
                    id="mainSearcbar"
                    v-model="search"
                    placeholder=""
                    v-on:keyup="intableFilter(tableFilterVal, search)"
                  />
                </td>
                <td>
                  <input
                    v-if="tableFilterVal == 'Next Followup'"
                    class="form-control"
                    list="mainSearcbarOptions"
                    id="mainSearcbar"
                    v-model="search"
                    placeholder=""
                  />
                </td>
                <td>
                  <input
                    v-if="tableFilterVal == 'Priority'"
                    class="form-control"
                    list="mainSearcbarOptions"
                    id="mainSearcbar"
                    v-model="search"
                    placeholder=""
                  />
                </td>
                <td>
                  <input
                    v-if="tableFilterVal == 'Status'"
                    class="form-control"
                    list="mainSearcbarOptions"
                    id="mainSearcbar"
                    v-model="search"
                    placeholder=""
                  />
                </td>
                <td>
                  <input
                    v-if="tableFilterVal == 'Users'"
                    class="form-control"
                    list="mainSearcbarOptions"
                    id="mainSearcbar"
                    v-model="search"
                    placeholder=""
                  />
                </td>
                <td>
                  <input
                    v-if="tableFilterVal == 'Owner'"
                    class="form-control"
                    list="mainSearcbarOptions"
                    id="mainSearcbar"
                    v-model="search"
                    placeholder=""
                  />
                </td>
              </tr>

              <tbody>
                <template v-for="row in filteredPeople" :key="row.name">
                  <tr
                    @click="toggle(row.name)"
                    :class="{ opened: opened.includes(row.name) }"
                  >
                    <td>
                      <div class="row">
                        <div class="col-sm-2">
                          <span v-if="row.gender === 'Male'">
                            <span v-if="row.age >= '0' && row.age <= '60'">
                              <img
                                alt="Maleyoung"
                                style="height: 30px"
                                src="../assets/img/45male.png"
                              />
                            </span>
                            <span v-if="row.age > '60'">
                              <img
                                alt="Maleyoung"
                                style="height: 30px"
                                src="../assets/img/61male.png"
                              />
                            </span>
                          </span>
                          <span v-if="row.gender === 'Female'">
                            <span v-if="row.age >= '0' && row.age <= '60'">
                              <img
                                alt="Maleyoung"
                                style="height: 30px"
                                src="../assets/img/45Female.png"
                              />
                            </span>
                            <span v-if="row.age > '60'">
                              <img
                                alt="Maleyoung"
                                style="height: 30px"
                                src="../assets/img/61female.png"
                              />
                            </span>
                          </span>
                        </div>
                        <div class="col">
                          <strong
                            ><span class="capital_latter">
                              {{ row.patient_full_name }}
                            </span></strong
                          >
                          <br />
                          <span class="secondrow">{{ row.mobile }} </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <strong
                        ><span>{{ row.last_follow_up_subject }} </span>
                      </strong>
                      <br />
                      <span
                        class="secondrow"
                        v-if="row.days_since_last_follow_up < 0"
                      >
                        {{ format_date_time(row.last_follow_up_start_date) }}
                      </span>
                      <span v-else>
                        <span
                          class="secondrow"
                          v-if="row.days_since_last_follow_up"
                          >{{ row.days_since_last_follow_up }} Days ago /
                          <span v-if="row.follow_up_count"
                            >{{ row.follow_up_count }} Time
                          </span>
                        </span>
                        <span class="secondrow" v-else>
                          <span v-if="row.follow_up_count">
                            Today {{ row.follow_up_count }} Time
                          </span>
                        </span>
                      </span>
                    </td>

                    <td>
                      <strong
                        ><span>{{ row.last_follow_up_subject }}</span>
                      </strong>
                      <br />
                      <span class="secondrow">{{
                        format_date_time(row.last_follow_up_repeat_event_on)
                      }}</span>
                    </td>

                    <td @click="show_priority_field(row.name, true)">
                      <span v-if="show_priority[row.name]">
                        <select
                          class="form-select"
                          @change="
                            update_field(
                              'Knee Lead',
                              row.name,
                              'priority',
                              row.priority[0].name
                            )
                          "
                          v-model="row.priority[0].name"
                        >
                          <option
                            v-for="option in lead_priority_options"
                            :value="option"
                          >
                            {{ option }}
                          </option>
                        </select>
                      </span>
                      <span v-if="!show_priority[row.name]">
                        <button
                          class="kx-tab-priority btn"
                          :style="[{ background: row.priority[0].color }]"
                        >
                          <i class="fas fa-edit"></i>
                          {{ row.priority[0].name }}
                        </button>
                      </span>
                    </td>

                    <td @click="show_status_field(row.name, true)">
                      <span v-if="show_status[row.name]">
                        <select
                          class="form-select"
                          @change="
                            update_field(
                              'Knee Lead',
                              row.name,
                              'knee_lead_status',
                              row.knee_lead_status[0].name
                            )
                          "
                          v-model="row.knee_lead_status[0].name"
                        >
                          <option
                            v-for="option in lead_status_options"
                            :value="option"
                          >
                            {{ option }}
                          </option>
                        </select>
                      </span>
                      <span v-if="!show_status[row.name]">
                        <button
                          class="kx-tab-status btn"
                          :style="[
                            { background: row.knee_lead_status[0].color },
                          ]"
                        >
                          <i class="fas fa-edit"></i>
                          {{ row.knee_lead_status[0].name }}
                        </button>
                      </span>
                    </td>
                    <td v-if="row.shared_with">
                      <img
                        v-for="item in row.shared_with"
                        :title="item.full_name"
                        alt="Maleyoung"
                        style="height: 30px; margin-left: -1rem"
                        class="rounded-circle"
                        :src="'https://lead.kneexpert.in/' + item.image"
                      />
                    </td>
                    <td v-else>
                      <img
                        :title="'No User'"
                        alt="No User"
                        style="height: 30px"
                        class="rounded-circle"
                        :src="'https://lead.kneexpert.in/files/adminc672b3.jpg'"
                      />
                    </td>
                    <td v-if="row.assigned_to.length > 0">
                      <img
                        v-for="item in row.assigned_to"
                        :title="item.full_name"
                        :alt="item.full_name"
                        style="height: 30px"
                        class="rounded-circle"
                        :src="'https://lead.kneexpert.in/' + item.image"
                      />
                    </td>
                    <td v-else>
                      <img
                        :title="'No User'"
                        alt="No User"
                        style="height: 30px"
                        class="rounded-circle"
                        :src="'https://lead.kneexpert.in/files/adminc672b3.jpg'"
                      />
                    </td>

                    <td>
                      <a
                        class="text-success kx-button"
                        @click="$router.push('/lead/' + row.name)"
                      >
                        <i class="fas fa-edit"></i>
                      </a>
                    </td>
                  </tr>
                  <tr v-if="opened.includes(row.name)">
                    <td
                      colspan="12"
                      class="display-content"
                      style="background: #e7f5f8"
                    >
                      <div class="row">
                        <div class="col-sm-7" style="margin-left: 56px">
                          <p>
                            <span v-if="row.age">
                              Aged - {{ row.age }} Years
                            </span>
                            <span v-if="row.occupation"
                              >, ({{ row.occupation }})</span
                            >
                            <span v-if="row.city"> - {{ row.city }}</span>
                          </p>
                          <p>
                            <span v-if="row.knee_complain === 1">
                              <b v-if="row.knee_left === 1">
                                <img
                                  alt="Maleyoung"
                                  style="height: 30px"
                                  src="../assets/img/kneeleft.png"
                                />
                              </b>

                              <b v-if="row.knee_right === 1">
                                <img
                                  alt="Maleyoung"
                                  style="height: 30px"
                                  src="../assets/img/RightKnee.png"
                                />
                              </b>
                              Pain
                              <span v-if="row.pain_location">
                                {{ row.pain_location }}</span
                              >
                            </span>

                            <b v-if="row.hip_complain === 1">
                              <b v-if="row.hip_left === 1">
                                <img
                                  alt="Maleyoung"
                                  style="height: 30px"
                                  src="../assets/img/LeftHip.png"
                                />
                              </b>
                              <b v-if="row.hip_right === 1">
                                <img
                                  alt="Maleyoung"
                                  style="height: 30px"
                                  src="../assets/img/RightHip.png"
                                />
                                Pain
                              </b>
                            </b>

                            <!-- {{ row }} -->
                            <span v-if="row.pain_since_years">
                              Since {{ row.pain_since_years }}
                              {{ row.pain_since }}.
                            </span>
                            <span v-if="row.pain_increase_while">
                              The pain increases while
                              {{ row.pain_increase_while }}
                            </span>
                          </p>
                          <p>
                            <span v-if="row.pain_complain">
                              Patient reports - {{ row.pain_complain }} &emsp;
                            </span>
                            <span v-if="row.mediclaim_no">
                              - Insurance &#x2705; no.
                              {{ row.mediclaim_no }}</span
                            >
                            <span v-if="row.tpa"> &nbsp; {{ row.tpa }}</span>
                            <span v-if="row.health_scheme">
                              Health Scheme - {{ row.health_scheme }}</span
                            >
                          </p>
                        
                          <span v-if="row.comments">
                            <span
                              v-for="(comment, index) in row.comments"
                              :key="index"
                            >
                              <div>
                                <template v-if="comment.creation">
                                  {{ new Date(comment.creation).getDate() }}
                                  {{
                                    new Date(comment.creation).toLocaleString(
                                      "default",
                                      { month: "long" }
                                    )
                                  }}
                                  {{ new Date(comment.creation).getFullYear() }}
                                  {{
                                    (new Date(comment.creation).getHours() %
                                      12 || 12) +
                                    ":" +
                                    new Date(comment.creation)
                                      .getMinutes()
                                      .toString()
                                      .padStart(2, "0") +
                                    " " +
                                    (new Date(comment.creation).getHours() >= 12
                                      ? "PM"
                                      : "AM")
                                  }}
                                  -
                                </template>
                                {{ comment.content }}
                              </div>
                              <br v-if="index !== row.comments.length - 1" />
                            </span>
                          </span>

                          <br />
                        </div>
                        <div class="col-sm-4">
                          <div class="row">
                            <div class="col">
                              <span v-for="item in row._user_tags">
                                <button
                                  class="tag-button"
                                  :style="[{ background: item.color }]"
                                  v-on:mouseover="RemoveButtonactive = true"
                                  v-on:mouseleave="RemoveButtonactive = false"
                                >
                                  {{ item.name }}
                                </button>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col" style="margin-left: 50px">
                            <span>
                              <button
                                class="btn btn-sm btn-success kx-button"
                                @click="click2call(row.name)"
                              >
                                <i
                                  class="fa fa-phone icon-rotate"
                                  aria-hidden="true"
                                ></i>
                                Call
                              </button>

                              <button
                                class="btn btn-sm btn-info kx-button"
                                @click="fnShowShareModel(row.name)"
                              >
                                <i class="fas fa-share-alt icon-rotate"></i>
                                Share
                              </button>
                              <button
                                class="btn btn-sm btn-info kx-button"
                                @click="fnShowShareWaModel(row.name)"
                              >
                                <i class="fas fa-share icon-rotate"></i>
                                Send WhatsApp
                              </button>
                            </span>
                            <span
                              class="secondrow mt-4 m-4 mb-0"
                              style="float: right"
                            >
                              <b>Created </b>{{ calculateAge(row.creation) }}
                            </span>
                            <span
                              class="secondrow mt-4 mb-0"
                              style="float: right"
                            >
                              <b>Modified</b> {{ calculateAge(row.modified) }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>

            <div class="d-flex justify-content-center">
              <span class="pagination-button">
                <!-- page_size_options -->
                <select
                  @change="get_next_page_data((currentPage = '1'))"
                  v-model="page_size"
                >
                  <option v-for="option in page_size_options" :value="option">
                    {{ option }}
                  </option>
                </select>
              </span>
              <span class="pagination-button">
                <span v-if="start_length">{{ start_length }}</span>
                <span v-else>{{ page_size }}</span>

                / {{ total_knee_lead_count }}
              </span>
              <nav>
                <button
                  class="pagination-button"
                  @click="prevpage(currentPage)"
                  v-if="currentPage > 1"
                >
                  Prev
                </button>

                <button
                  class="pagination-button"
                  @click="nextpage(currentPage)"
                  v-if="filteredPeople.length > 0"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <SearchData /> -->
    <NewLeadPopupModel
      @add="ShowModel = true"
      @close="ShowModel = false"
      :show="ShowModel"
    />
    <SendExerciseModal
      @add="ShowexModel = true"
      @close="ShowexModel = false"
      :show="ShowexModel"
      :Knee_lead="Knee_lead_id"
      msg=""
      :exercise_options="exercise_options"
    />
    <ModalShare
      @add="ShowShareModel = true"
      @close="ShowShareModel = false"
      :show="ShowShareModel"
      :Knee_lead="Knee_lead_id"
      msg=""
    />
    <ModalWaShare
      @add="ShowShareWaModel = true"
      @close="ShowShareWaModel = false"
      :show="ShowShareWaModel"
      :Knee_lead="Knee_lead_id"
      msg=""
    />
    <SendInvestigationModal
      @close="ShowinvModel = false"
      :show="ShowinvModel"
      :Knee_lead="Knee_lead_id"
      msg=""
      :investigation_req_options="investigation_req_options"
    />

    <ModalSuccess
      @success="ShowSuccessModel = true"
      @close="ShowSuccessModel = false"
      :show="ShowSuccessModel"
      msg="Added Successfull.."
    />
    <!-- ErrorModal -->

    <ErrorModal
      @close="ShowErrModel = false"
      :show="ShowErrModel"
      :msg="errmessage"
    />
  </div>
</template>
<script>
import { ref, defineComponent, teleport } from "vue";
import axios from "axios";
import Multiselect from "@vueform/multiselect";
import SideBaar from "@/components/SideBaar.vue";
import NewLeadPopupModel from "@/components/modals/NewLeadModal.vue";
import SendExerciseModal from "@/components/modals/SendExerciseModal.vue";
import SendInvestigationModal from "@/components/modals/SendInvestigationModal.vue";
import ModalSuccess from "@/components/modals/ModalSuccess.vue";
import ModalShare from "@/components/modals/ShareModel.vue";
import ModalWaShare from "@/components/modals/ShareWaModel.vue";
import Header from "@/components/Header/Header.vue";
import ErrorModal from "@/components/modals/ErrorModel.vue";

export default {
  name: "LeadPage",
  components: {
    Header,
    SideBaar,
    Multiselect,
    NewLeadPopupModel,
    SendExerciseModal,
    SendInvestigationModal,
    ModalSuccess,
    ModalShare,
    ErrorModal,
    ModalWaShare,
  },
  beforeCreate() {},

  mounted() {
    this.get_all_leads();
    this.get_knee_lead_counts();
    this.get_date();
    this.get_tags();
    this.$refs.table.focus();
    this.get_knee_lead_status();
    this.get_knee_lead_priority();
    this.get_investigation_advice();
    this.get_exercise_advice();
    this.get_call_stats();
    this.get_shared_knee_lead_count();
    this.get_knee_lead_this_week_count();
    this.get_knee_lead_today_count();
    this.get_knee_lead_next_week_count();
    this.get_knee_lead_missed_follow_ups_count();
    this.get_data_from_status();
    this.followup_stage_search();
  },
  data() {
    return {
      tableFilterVal: "",
      filtervalue: "",
      // follow_status: localStorage.getItem("category"),
      followup_Options: [
        "Today",
        "This Week",
        "Next Week",
        "Missed",
        // "Shared",
        "Show All",
      ],
      fileterOptions: [
        {
          value: "patient_full_name",
          label: "Patient Full Name",
        },
        {
          value: "gender",
          label: "Gender",
        },
        {
          value: "age",
          label: "Age",
        },
        {
          value: "present_age",
          label: "Present Age",
        },
        {
          value: "mobile",
          label: "Mobile",
        },
        {
          value: "whatsapp_no",
          label: "WhatsApp No",
        },
        {
          value: "pincode",
          label: "Pincode",
        },
        {
          value: "mediclaim_no",
          label: "Mediclaim No",
        },
        {
          value: "life_of_lead",
          label: "Life of Lead",
        },
        {
          value: "funnel_stage",
          label: "Funnel Stage",
        },
        {
          value: "record_type",
          label: "Record Source",
        },
        {
          value: "datentime",
          label: "Date and Time",
        },
        {
          value: "pain_since_years",
          label: "Pain Since Years",
        },
        {
          value: "pain_since",
          label: "Pain Since",
        },
        {
          value: "pain_increase_while",
          label: "Pain Increase While",
        },
        {
          value: "pain_location",
          label: "Pain Location",
        },
        {
          value: "pain_complain",
          label: "Pain Complain",
        },
        {
          value: "comments",
          label: "Comments",
        },
        {
          value: "next_follow_up_date",
          label: "Next Follow Up Date",
        },
        {
          value: "remarks",
          label: "Remarks",
        },
        {
          value: "xray_request_status",
          label: "Request Status",
        },
        {
          value: "xray_request_date_time",
          label: "Request Date and Time",
        },
        {
          value: "mode_of_request",
          label: "Mode of Request",
        },
        {
          value: "next_request_follow_up_date",
          label: "Follow Up Date",
        },
        {
          value: "xray_upload_request_date_time",
          label: " Request Date Time",
        },
        {
          value: "xray_upload_follow_up_date",
          label: "Follow-up Date",
        },
        {
          value: "new_xray_request_date_time",
          label: "New Request Date Time",
        },
        {
          value: "new_xray_follow_up_date",
          label: "Next Follow-up Date",
        },
        {
          value: "send_xray_position",
          label: "Send Xray Position",
        },
        {
          value: "xray_upload_link",
          label: "Xray Upload Link",
        },
        {
          value: "how_xray_photo",
          label: "How Xray Photo",
        },
        {
          value: "xray_diagnosis_left",
          label: "Knee Xray Diagnosis Left",
        },
        {
          value: "xray_diagnosis_right",
          label: "Knee Xray Diagnosis Right",
        },
        {
          value: "knee_xray_grade_left",
          label: "Knee Xray Grade Left",
        },
        {
          value: "knee_xray_grade_right",
          label: "Knee Xray Grade Right",
        },
        {
          value: "hip_xray_diagnosis_left",
          label: "Hip Xray Diagnosis Left",
        },
        {
          value: "hip_xray_diagnosis_right",
          label: "Hip Xray Diagnosis Right",
        },
        {
          value: "deformity_left",
          label: "Deformity Left",
        },
        {
          value: "deformity",
          label: "Deformity Right",
        },
        {
          value: "xray_diagnosis_remarks",
          label: "Xray Diagnosis Remarks",
        },
        {
          value: "xray_assessment_next_follow_up_date",
          label: "Next Follow-up Date",
        },
        {
          value: "xray_assess_position",
          label: "Xray Position",
        },
        {
          value: "xray_assess_upload_link",
          label: "Xray Upload Link",
        },
        {
          value: "xray_assess_how_to_xray",
          label: "How to Take Xray Photo",
        },
        {
          value: "xray_assess_request_scanogram",
          label: "Request Scanogram",
        },
        {
          value: "mri_diagnosis_left",
          label: "MRI Diagnosis Left",
        },
        {
          value: "mri_diagnosis_right",
          label: "MRI Diagnosis Right",
        },
        {
          value: "mri_deformity_left",
          label: "MRI Deformity Left",
        },
        {
          value: "mri_deformity_right",
          label: "MRI Deformity Right",
        },
        {
          value: "mri_assessment_remarks",
          label: "MRI Assessment Remarks",
        },
        {
          value: "online_consult_request_date_time",
          label: "Request Date Time",
        },
        {
          value: "online_consult_date",
          label: "Date of Consultation",
        },
        {
          value: "online_consult_follow_up_date",
          label: "Follow-up Date",
        },
        {
          value: "online_consultation_remarks",
          label: "Online Consultation Remarks",
        },
        {
          value: "online_consult_next_follow_up_date",
          label: "Next Follow-up Date",
        },
        {
          value: "opd_request_date_time",
          label: "Request Date Ttime",
        },
        {
          value: "opd_date",
          label: "OPD Date",
        },
        {
          value: "opd_follow_up_date",
          label: "Follow-up Date",
        },
        {
          value: "opd_next_follow_up_date",
          label: "Next Follow-up Date",
        },
        {
          value: "opd_remarks",
          label: "OPD Remarks",
        },
      ],
      filterSelected: "",
      filterSelected2: "",
      filtervalue2: "",
      showFilter: false,
      showtagFilter: false,
      Missed_Follow_ups: "",
      global_search_lead: "",
      total_knee_lead_counts: "",
      Next_Week: "",
      This_Week: "",
      TodayLead: "",
      urllink: "",
      start_length: "",
      total_knee_lead_count: "",
      page_size: 10,
      page_size_options: ["10", "20", "30", "40", "50", "100"],
      errmessage: "",
      shared_leads: [],
      value: [],
      status: localStorage.getItem("status"),
      Knee_lead_id: "",
      investigation_req_options: [],
      exercise_options: [],
      RemoveButtonactive: ref(false),
      ShowModel: ref(false),
      ShowexModel: ref(false),
      ShowinvModel: ref(false),
      ShowSuccessModel: ref(false),
      ShowShareModel: ref(false),
      ShowShareWaModel: ref(false),
      ShowErrModel: ref(false),

      lead_status_options: [],
      lead_priority_options: [],
      priority: "",

      selectedIndex: -1,
      show_status: [],
      show_priority: [],
      options: ["Batman", "Robin", "Joker"],

      opened: [],
      open: false,
      rows: [],
      filteredData: [],
      lead_couns: "",
      loading: false,
      lead_couns_lead_status: [],
      selectedCategory: "Xray Requested",
      search: "",
      pageSize: 5,
      currentPage: 1,
      lead_couns_next_followup: [],

      Today_date: "",
      next_sevenday_date: "",
      next_sevenday_date: "",
      tag_options: [],
      tag_options1: ["Batman", "Robin", "Joker"],
      tag: "",
      tag1: [],
      tags: [],
      searchTerm: "",
      call_report: [],
      incalls: [],
      outcalls: [],
      gender_options: ["Male", "Female", "Other"],
      pain_location_options: [
        "Behind Knee Cap",
        "Above Knee Cap",
        "Below Knee Cap (Joint Line)",
        "Medial Joint Line",
        "Lateral Joint Line",
        "Behind Knee Joint",
      ],
      mode_of_request_options: ["Phone Call", "WhatsApp", "SMS"],
      funnel_stage_options: [
        "Marketing Qualified Lead",
        "Sales Qualified Lead",
        "Opportunity",
        "Prospect",
        "Customer",
        "Post Customer Engagement",
      ],
      pain_since_options: ["Days", "Months", "Years"],
      pain_increase_while_options: [
        "Stair climbing",
        "Cross leg sitting",
        "Long walking",
        "Standing up from sitting",
        "Always in Pain",
        "In Household activities",
      ],
      pain_location_options: [
        "Behind Knee Cap",
        "Above Knee Cap",
        "Below Knee Cap (Joint Line)",
        "Medial Joint Line",
        "Lateral Joint Line",
        "Behind Knee Joint",
      ],
      xray_request_status_options: ["Requested", "Upload", "New"],

      xray_diagnosis_left_options: [
        "None",
        "Early OA",
        "Moderate OA",
        "Late OA",
        "TKR Done",
      ],

      xray_diagnosis_right_options: [
        "None",
        "Early OA",
        "Moderate OA",
        "Late OA",
        "TKR Done",
      ],

      knee_xray_grade_left_options: [
        "Normal",
        "Grade 1",
        "Grade 2",
        "Grade 3",
        "Grade 4",
      ],

      knee_xray_grade_right_options: [
        "Normal",
        "Grade 1",
        "Grade 2",
        "Grade 3",
        "Grade 4",
      ],

      hip_xray_diagnosis_left_options: [
        "Normal",
        "Grade I AVN",
        "Grade II AVN",
        "Grade III AVN",
        "Grade IV AVN",
        "Core Decompression Done",
        "THR Done",
      ],

      hip_xray_diagnosis_right_options: [
        "Normal",
        "Grade I AVN",
        "Grade II AVN",
        "Grade III AVN",
        "Grade IV AVN",
        "Core Decompression Done",
        "THR Done",
      ],

      hip_xray_diagnosis_right_options: [
        "Normal",
        "Grade I AVN",
        "Grade II AVN",
        "Grade III AVN",
        "Grade IV AVN",
        "Core Decompression Done",
        "THR Done",
      ],

      deformity_left_options: ["No Deformity", "Varus", "Valgus"],

      deformity: ["No Deformity", "Varus", "Valgus"],

      mri_diagnosis_left_options: [
        "AVN",
        "Meniscus Injury",
        "Ligament Injury",
        "Chondromalacia Patella",
        "Loose Bodies",
      ],

      mri_diagnosis_right_options: [
        "AVN",
        "Meniscus Injury",
        "Ligament Injury",
        "Chondromalacia Patella",
        "Loose Bodies",
      ],

      mri_deformity_left_options: ["No Deformity", "Varus", "Valgus"],

      mri_deformity_right_options: ["No Deformity", "Varus", "Valgus"],
    };
  },

  computed: {
    formattedStyleCodes: {
      get() {
        return this.styleCodes.join(",");
      },
      set(value) {
        this.styleCodes = value.split(",");
      },
    },

    filteredPeople() {
      if (!this.search) {
        const start = (this.currentPage - 1) * this.page_size;

        return this.filteredPatients();
      }
      const searchLower = this.search.toLowerCase();

      return this.rows.filter((row) => this.matchesSearch(row));
    },

    totalPages() {
      return Math.ceil(this.rows.length / this.page_size);
    },
  },

  methods: {
    nextpage: function (currentPage) {
      this.currentPage++;
      this.start_length = this.currentPage * this.page_size;

      this.get_next_page_data();
    },
    prevpage: function (currentPage) {
      this.currentPage--;
      this.start_length = this.start_length - this.page_size;
      this.get_next_page_data();
    },
    openmodal: function () {
      this.ShowModel = !this.ShowModel;
    },

    filteredPatients() {
      const start = this.currentPage * this.pageSize;
      return this.rows;
    },

    fnShowexModel: function (e) {
      this.Knee_lead_id = e;

      this.ShowexModel = !this.ShowexModel;
    },
    fnShowinvModel: function (e) {
      this.Knee_lead_id = e;
      this.ShowinvModel = !this.ShowinvModel;
    },

    fnShowShareModel: function (e) {
      this.Knee_lead_id = e;
      this.ShowShareModel = !this.ShowShareModel;
    },

    fnShowShareWaModel: function (e) {
      this.Knee_lead_id = e;
      this.ShowShareWaModel = !this.ShowShareWaModel;
    },

    show_status_field: function (id, status) {
      this.show_status = [];
      if (status) {
        this.show_status[id] = true;
      } else {
        this.show_status[id] = false;
      }
    },
    show_priority_field: function (id, status) {
      this.show_priority = [];
      if (status) {
        this.show_priority[id] = true;
      } else {
        this.show_priority[id] = false;
      }
    },

    selectPreviousRow: function () {
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
      }
    },
    selectNextRow: function () {
      if (this.selectedIndex < this.items.length - 1) {
        this.selectedIndex++;
      }
    },
    toggle: function (id) {
      const index = this.opened.indexOf(id);
      if (index > -1) {
        this.opened.splice(index, 1);
      } else {
        this.opened.push(id);
      }
    },
    filteredItems: function (e) {
      this.search = e;
    },
    matchesSearch: function (row) {
      return Object.keys(row).some((key) => {
        const fieldValue = row[key];
        if (typeof fieldValue === "string") {
          var ret_data = fieldValue
            .toLowerCase()
            .includes(this.search.toLowerCase());

          return ret_data;
        }
        return false; // Ignore non-string fields
      });
    },

    filteredstatusItems() {
      this.filteredData = this.rows.filter(function (item) {
        const kneeLeadStatus = item.knee_lead_status.find(function (status) {
          return status.name === "Open";
        });
        return kneeLeadStatus !== undefined;
      });
    },

    filteredTagItems() {
      this.filteredData = this.rows.filter(function (item) {
        const kneeLeadStatus = item._user_tags.find(function (tag) {
          return tag.name === "FB OA";
        });
        return kneeLeadStatus !== undefined;
      });
    },

    get_date: function () {
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

      var days = 7;
      var seven_day = new Date();
      var res = seven_day.setTime(
        seven_day.getTime() + days * 24 * 60 * 60 * 1000
      );
      var new_seven_date = new Date(res);
      var new_seven_day = new_seven_date.getDate() + "";
      var new_seven_month = new_seven_date.getMonth() + 1 + "";
      var new_seven_year = new_seven_date.getFullYear() + "";
      new_seven_day = checkZero(new_seven_day);
      new_seven_month = checkZero(new_seven_month);
      new_seven_year = checkZero(new_seven_year);
      var new_seven_date =
        new_seven_year + "-" + new_seven_month + "-" + new_seven_day;
      this.Today_date = date_final;
    },

    todays_followups: function () {
      for (let x in this.rows) {
        if (this.rows[x].next_follow_up_date == this.Today_date) {
        }
      }
    },
    showFilterfn: function () {
      this.showFilter = true;
      this.showtagFilter = false;
    },
    showtagFilterfn: function () {
      this.showtagFilter = true;
      this.showFilter = false;
    },

    get_knee_lead_status: async function () {
      this.urllink = "knee_lead.api.knee_lead_status";
      await axios
        .get(this.urllink)
        .then((response) => {
          for (let x in response.data.message) {
            this.lead_status_options.push(response.data.message[x].name);
          }
        })
        .catch((error) => {});
    },
    get_knee_lead_priority: async function () {
      await axios
        .get("knee_lead.api.get_priority")
        .then((response) => {
          for (let x in response.data.message) {
            this.lead_priority_options.push(response.data.message[x].name);
          }
        })
        .catch((error) => {});
    },
    format_date_time: function (e) {
      if (e) {
        var date_time = e.split(" ");
        var date = date_time[0];
        var time = date_time[1];
        var sp_time = time.split(":");

        var final_time = sp_time[0] + ":" + sp_time[1];

        var final_date = date.split("-");
        var final_date_time =
          final_date[2] +
          "/" +
          final_date[1] +
          "/" +
          final_date[0] +
          " " +
          final_time;

        return final_date_time;
      }

      return;
    },

    get_all_leads: async function () {
      this.urllink = "knee_lead.api.get_knee_leads?";

      await axios
        .get(
          this.urllink + "page=" + this.currentPage + "&size=" + this.page_size
        )
        .then((response) => {
          this.rows = response.data.data.knee_leads;
          this.total_knee_lead_count =
            response.data.data.knee_lead_count[0].count;
          this.total_knee_lead_counts =
            response.data.data.knee_lead_count[0].count;
        })

        .catch((error) => {});
    },
    SearchFilter: async function () {
      const formdata = {
        page: this.currentPage,
        size: this.page_size,
        search_field_1: this.filterSelected,
        search_field_value_1: this.filtervalue,
        search_field_2: this.filterSelected2,
        search_field_value_2: this.filtervalue2,
      };
      await axios
        .post("knee_lead.api.get_knee_leads_filtered", formdata)
        .then((response) => {
          
          if (response.data.status_code == "200") {
            this.rows = response.data.data.knee_leads;
            this.total_knee_lead_counts =
              response.data.data.knee_lead_count[0].count;
          } else {
            this.rows = [];

            this.errmessage = response.data.message;
            this.ShowErrModel = true;
          }
        })
        .catch((error) => {});
    },

    get_data_from_status: async function () {
      localStorage.setItem("status", this.status);
      this.currentPage = 1;
      this.urllink = "knee_lead.api.get_knee_leads_with_status?status=";

      await axios
        .get(
          this.urllink +
            this.status +
            "&page=" +
            this.currentPage +
            "&size=" +
            this.page_size
        )
        .then((response) => {
          this.rows = response.data.data.knee_leads;
          this.total_knee_lead_count =
            response.data.data.knee_lead_count[0].count;
        })
        .catch((error) => {});
    },

    get_next_page_data: function () {
      if (this.tags[0]) {
        const formdata = {
          page: this.currentPage,
          size: this.page_size,
          tag: this.tags[0],
        };
        axios
          .post("knee_lead.api.get_knee_leads_with_tag",formdata)
          .then((response) => {
            if (response.data.status_code == 200) {
              this.rows = response.data.data.knee_leads;
          this.total_knee_lead_count =
            response.data.data.knee_lead_count[0].count;              
            } else {
              this.rows = [];
            }
          })
          .catch((error) => {
            this.ShowErrModel = true;
          });
      } else {
      }
      axios
        .get(
          this.urllink +
            this.status +
            "&page=" +
            this.currentPage +
            "&size=" +
            this.page_size
        )
        .then((response) => {
          this.rows = response.data.data.knee_leads;
          this.total_knee_lead_count =
            response.data.data.knee_lead_count[0].count;
        })
        .catch((error) => {});
    },

    get_shared_knee_lead_count: function () {
      this.urllink = "knee_lead.docshare.get_shared_knee_lead";
      axios
        .get(this.urllink)
        .then((response) => {
          this.shared_leads = response.data.data;

          this.total_knee_lead_count = response.data.data.length;
        })
        .catch((error) => {
          this.errmessage = error;
          this.ShowErrModel = true;
        });
    },

    get_shared_knee_lead: function () {
      this.urllink = "knee_lead.docshare.get_shared_knee_lead";
      axios
        .get(this.urllink)
        .then((response) => {
          this.shared_leads = response.data.data;
          this.rows = response.data.data;
          this.total_knee_lead_count = response.data.data.length;
        })
        .catch((error) => {
          this.errmessage = error;
          this.ShowErrModel = true;
        });
    },

    filterShared: function () {
      this.rows = this.shared_leads;
    },

    showallLeads: function () {
      this.get_all_leads();
    },

    get_tags: function () {
      axios
        .get("knee_lead.api.get_tag")
        .then((response) => {
          this.loading = false;
          this.tag_options = response.data.data
            .map((tag) => tag.name)
            .filter((name) => name !== "");
        })
        .catch((error) => {
          this.errmessage = error;
          this.ShowErrModel = true;
        });
    },

    select_tags: function (e) {
      this.tags.push(e);
    },
    remove_tags: function (e) {
      this.tags.splice(e, 1);
    },
    save_tags: function (e) {
      for (let x in this.tags) {
        const formdata = {
          knee_lead: e,
          tag: this.tags[x],
        };
        axios
          .put("knee_lead.api.add_tag", formdata)
          .then((response) => {})
          .catch((error) => {
            this.errmessage = error;
            this.ShowErrModel = true;
          });
      }
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
    get_knee_lead_counts: function () {
      (this.loading = !false),
        axios
          .get("knee_lead.api.get_knee_lead_counts")
          .then((response) => {
            this.loading = false;
            this.lead_couns_next_followup = response.data.message[1];
            this.lead_couns_lead_status = response.data.message[0];
          })
          .catch((error) => {
            this.$router.go(this.$router.currentRoute);
          });
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
          this.show_status = [];
          this.show_priority = [];
          if (this.pain_since) {
          } else {
            this.get_all_leads();
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
    search_tags: async function () {
      this.urllink = "knee_lead.api.get_knee_leads_with_tag";

      const formdata = {
        page: "1",
        size: "10",
        tag: this.tags[0],
      };
      await axios
        .post("knee_lead.api.get_knee_leads_with_tag", formdata)
        .then((response) => {
          if (response.data.status_code == 200) {
            this.rows = response.data.data.knee_leads;
            this.total_knee_lead_count =
            response.data.data.knee_lead_count[0].count;            
          } else {
            this.rows = [];
          }
        })
        .catch((error) => {
          this.ShowErrModel = true;
        });
    },

    get_knee_lead_today: async function () {
      this.urllink = "knee_lead.kneelead.get_knee_lead_today?";
      await axios
        .get(
          this.urllink + "page=" + this.currentPage + "&size=" + this.page_size
        )
        .then((response) => {
          this.rows = response.data.data.knee_leads;
          this.total_knee_lead_count =
            response.data.data.knee_lead_count[0].count;
        })
        .catch((error) => {});
    },
    get_knee_lead_this_week_count: async function () {
      this.urllink = "knee_lead.kneelead.get_knee_lead_this_week?";
      await axios
        .get(
          this.urllink + "page= " + this.currentPage + "&size=" + this.page_size
        )
        .then((response) => {
          this.This_Week = response.data.data.knee_lead_count[0].count;
        })
        .catch((error) => {});
    },
    get_knee_lead_today_count: async function () {
      this.urllink = "knee_lead.kneelead.get_knee_lead_today?";
      await axios
        .get(
          this.urllink + "page= " + this.currentPage + "&size=" + this.page_size
        )
        .then((response) => {
          this.TodayLead = response.data.data.knee_lead_count[0].count;
        })
        .catch((error) => {});
    },
    get_knee_lead_next_week_count: async function () {
      this.urllink = "knee_lead.kneelead.get_knee_lead_next_week?";
      await axios
        .get(
          this.urllink + "page= " + this.currentPage + "&size=" + this.page_size
        )
        .then((response) => {
          this.Next_Week = response.data.data.knee_lead_count[0].count;
        })
        .catch((error) => {});
    },
    get_knee_lead_missed_follow_ups_count: async function () {
      // page=
      this.urllink = "knee_lead.kneelead.get_knee_lead_missed_follow_ups?";
      await axios
        .get(
          this.urllink + "page= " + this.currentPage + "&size=" + this.page_size
        )
        .then((response) => {
          this.Missed_Follow_ups = response.data.data.knee_lead_count[0].count;
        })
        .catch((error) => {});
    },

    get_knee_lead_this_week: async function () {
      this.urllink = "knee_lead.kneelead.get_knee_lead_this_week?";
      await axios
        .get(
          this.urllink + "page=" + this.currentPage + "&size=" + this.page_size
        )
        .then((response) => {
          this.rows = response.data.data.knee_leads;
          this.total_knee_lead_count =
            response.data.data.knee_lead_count[0].count;
        })
        .catch((error) => {});
    },

    get_knee_lead_next_week: async function () {
      this.urllink = "knee_lead.kneelead.get_knee_lead_next_week?";
      await axios
        .get(
          this.urllink + "page=" + this.currentPage + "&size=" + this.page_size
        )
        .then((response) => {
          this.rows = response.data.data.knee_leads;

          this.total_knee_lead_count =
            response.data.data.knee_lead_count[0].count;
        })
        .catch((error) => {});
    },
    get_knee_lead_missed_follow_ups: async function () {
      this.urllink = "knee_lead.kneelead.get_knee_lead_missed_follow_ups?";
      await axios
        .get(
          this.urllink + "page=" + this.currentPage + "&size=" + this.page_size
        )
        .then((response) => {
          this.rows = response.data.data.knee_leads;
          this.Missed_Follow_ups = response.data.data.knee_lead_count[0].count;
          this.total_knee_lead_count =
            response.data.data.knee_lead_count[0].count;
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

    get_call_stats: async function () {
      await axios
        .get("knee_lead.api.get_call_stats")
        .then((response) => {
          this.call_report = response.data.data;
          this.incalls.push(response.data.data.incoming);
          this.outcalls.push(response.data.data.outgoing);
        })
        .catch((error) => {});
    },
    intableFilter: function (e, search) {
      if (e == "name") {
        let obj = this.rows.find((o) => o.name === search);
      }
    },
    tableFilter: function (e) {
      if (this.tableFilterVal == e) {
        this.tableFilterVal = "";
      }
      this.tableFilterVal = e;
    },

    days_between: function (date2) {
      var EndDate = new Date();
      var StartDate = Date(date2);
      // The number of milliseconds in one day
      const ONE_DAY = 1000 * 60 * 60 * 24;

      const end = new Date(StartDate).getTime();
      const start = new Date(EndDate).getTime();

      return (start - end) / ONE_DAY;
    },

    calculateAge: function (birthdate) {
      var date1 = new Date(birthdate);
      var date2 = new Date();

      var timeDiff = Math.abs(date2.getTime() - date1.getTime());

      var hours = Math.floor(timeDiff / (1000 * 60 * 60));
      var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      return hours + " hrs, " + minutes + " min, " + seconds + " sec ago";
    },
    searchGlobal: async function () {
      await axios
        .get("knee_lead.api.get_single_knee_lead", {
          params: {
            mobile: "+91" + this.global_search_lead,
          },
        })
        .then((response) => {
          if (response.data.status_code == "200") {
            this.rows = response.data.data;
            this.res_message = response.data.message;
          } else {
            this.ShowErrModel = true;
            this.errmessage = response.data.message;
          }
        })
        .catch((error) => {});
    },
    split_characters: function (str) {
      var i,
        frags = str.split("_");
      for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
      }
      return frags.join(" ");
    },

    sort_by: function () {
      this.rows = _.sortBy(this.rows, "last_follow_up_repeat_event_on");
    },
    followup_stage_search: function () {
      localStorage.setItem("status", this.status);
      if (this.status == "Today") {
        this.get_knee_lead_today((this.currentPage = "1"));
      }
      if (this.status == "This Week") {
        this.get_knee_lead_this_week((this.currentPage = "1"));
      }
      if (this.status == "Next Week") {
        this.get_knee_lead_next_week((this.currentPage = "1"));
      }
      if (this.status == "Missed") {
        this.get_knee_lead_missed_follow_ups((this.currentPage = "1"));
      }
      // if (this.follow_status == "Shared") {
      //   this.get_shared_knee_lead((this.currentPage = "1"));
      // }
      if (this.status == "Show All") {
        this.showallLeads();
      }
    },
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
tr {
  background: white;
}

.secondrow {
  font-size: small;
}

.opened {
  background-color: #b0dfea;
  color: black;
}

thead tr {
  background-color: #2bb0ce;
  color: white;
}

td .display-content {
  background: #e7f5f8;
}

.kx-button {
  color: white;
  margin: 4px 2px;
}

input[type="radio"]:checked + label {
  font-weight: bold;
}

.pagination-button {
  background: #2bb0ce;
  color: white;
  border: 1px solid white;
  padding: 3px;
  border-radius: 5px;
}

.tag-button {
  border: none;
  border-radius: 15%;
  background-image: linear-gradient(to right, #2bb0ce, #39549b);
  color: white;
  font-size: small;
  padding: 0.3rem;
  margin-top: 10px;
  margin-left: 0.5rem;
}

.capital_latter {
  text-transform: uppercase;
}

.kx-tab-status {
  padding: 0.5rem;
  border-radius: 5px;
  color: white;
}

.kx-tab-priority {
  padding: 0.5rem;
  border-radius: 5px;
  color: white;
}
p {
  margin-bottom: 1rem;
}

.form-select {
  max-width: 50%;
}

.kx-button:hover > .icon-rotate {
  transform: rotate(-0.25turn);
}

#kxloader {
  background-color: #ffffff;
  width: 100%;
  margin-right: 50%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}

.radio-toolbar input[type="radio"] {
  display: none;
}
.radio-toolbar label {
  display: inline-block;
  cursor: pointer;
  width: 100%;
  padding: 0.5rem;
  text-align: center;
  color: #fff;
  height: 4rem;
  margin-top: 1rem;
  background: linear-gradient(to bottom, var(--primary) 50%, white 50%);
  cursor: -webkit-grabbing;
  cursor: grabbing;
  border: 1px solid var(--primary);
  border-radius: 5px;
}
.radio-toolbar input[type="radio"]:checked + label {
  color: white;
  background: linear-gradient(to top, var(--primary) 50%, #2E8B57
 50%);
}
.radio-toolbar label p {
  color: var(--primary);
}
.radio-toolbar input[type="radio"]:checked + label p {
  color: #fff;
}
.radio-toolbar input[type="radio"] + label:hover {
  transition: transform 0.2s;
  transform: scale(1.2);
}

/* end css new radio */

.loader {
  color: rgba(54, 84, 155, 0.3490196078);
  text-align: center;
  margin-left: 50%;

  margin-top: 15rem;
  padding: 2rem;
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
