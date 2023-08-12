<template>
  <div>
    <div class="row" v-for="item in items">
      <div class="col-sm-1">
        <div class="row">
          <div class="col justify-content-center">
            <span v-if="item.gender === 'Male'">
              <span v-if="item.age >= '0' && item.age <= '60'">
                <img
                  alt="Maleyoung"
                  style="height: 50px"
                  src="../../assets/img/45male.png"
                />
              </span>
              <span v-if="item.age >= '61'">
                <img
                  alt="Maleyoung"
                  style="height: 50px"
                  src="../../assets/img/61male.png"
                />
              </span>
            </span>
            <span v-if="item.gender === 'Female'">
              <span v-if="item.age >= '0' && item.age <= '60'">
                <img
                  alt="Maleyoung"
                  style="height: 50px"
                  src="../../assets/img/45Female.png"
                />
              </span>
              <span v-if="item.age >= '61'">
                <img
                  alt="Maleyoung"
                  style="height: 50px"
                  src="../../assets/img/61female.png"
                />
              </span>
            </span>
          </div>
          <div class="col justify-content-center">
            <span>
              <button class="button kx-edit" @click="editdetails()">
                <i class="fas fa-edit"></i>
              </button>
            </span>
          </div>
        </div>

        <div></div>
      </div>
      <div class="col-sm-8">
        <p>
          <b v-if="item.gender === 'Male'" class="patient_name">
            Mr. {{ item.patient_full_name }}</b
          >
          <b v-if="item.gender === 'Female'">
            Miss. {{ item.patient_full_name }}</b
          >
          <span v-if="item.age"> - {{ item.age }} </span>
          <span v-if="item.occupation">, ({{ item.occupation }})</span>
          <span v-if="item.city"> - {{ item.city }}</span>
        </p>
        <p>
          <span v-if="item.knee_complain === 1">
            <span v-if="item.knee_left === 1">
              <img
                alt="Maleyoung"
                style="height: 30px"
                src="../../assets/img/kneeleft.png"
              />
            </span>
            <span v-if="item.knee_right === 1">
              <img
                alt="Maleyoung"
                style="height: 30px"
                src="../../assets/img/RightKnee.png"
              />
            </span>
            Pain &nbsp;</span
          >
          <span v-if="item.pain_location"> {{ item.pain_location }}</span>
          <span v-if="item.hip_complain === 1">
            <span v-if="item.hip_left === 1">
              <img
                alt="Maleyoung"
                style="height: 30px"
                src="../../assets/img/LeftHip.png"
              />
            </span>
            <span v-if="item.hip_right === 1">
              <img
                alt="Maleyoung"
                style="height: 30px"
                src="../../assets/img/RightHip.png"
              />
              Pain
            </span>
          </span>
          <span v-if="item.pain_since_years">
            Since {{ item.pain_since_years }} Years.
          </span>
          <span v-if="item.pain_increase_while">
            The pain increases while {{ item.pain_increase_while }}
          </span>
        </p>
        <p>
          <span v-if="item.pain_complain">
            Patient reports - {{ item.pain_complain }} &emsp;
          </span>
          <span v-if="item.mediclaim_no">
            - Insurance &#x2705; no. {{ item.mediclaim_no }}</span
          >
          <span v-if="health_scheme"> Mediclaim - {{ health_scheme }} </span>
          <span v-if="item.tpa">&nbsp; TPA - {{ Mediclaim_tpa }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NonEditBasicDetails",
  props: {
    msg: String,
    items: [],
    editbasicdata: Boolean,
  },
  mounted() {},
  data() {
    return {
      editbasicdata: true,
    };
  },
  methods: {
    editdetails: function () {
      if (this.editbasicdata) {
        this.editbasicdata = false;
      } else {
        this.editbasicdata = true;
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
