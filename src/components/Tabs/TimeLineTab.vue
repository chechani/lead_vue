<template>
  <div>
    <div class="timeline">
      <div class="container-card timelineleft">
        <div class="timelinecontent shadow-lg p-3 mb-5 bg-white rounded">
          <h3>09-03-2023</h3>
          <p>
            Lead Created By <strong>Administrator</strong> On 09-03-2023 first
            call is done on 09-03-2023 4:30 PM Profile Completed On 09-03-2023
            WhatsApp No. Verified
            <i style="font-size: 20px; color: green" class="fa">&#xf058;</i>
          </p>
        </div>
      </div>
      <div class="container-card timelineright">
        <div class="timelinecontent shadow-lg p-3 mb-5 bg-white rounded">
          <h3>09-03-2023</h3>
          <p>
            Complaint is Done By <strong>Tikam </strong> On 09-03-2023 is that
            Patient having <strong> Left Knee Pain </strong> since
            <strong> 10 Years </strong> and Pain increase while
            <strong> Stair climbing </strong>
            Complaint Completed On 09-03-2023
          </p>
        </div>
      </div>
      <div class="container-card timelineleft">
        <div class="timelinecontent shadow-lg p-3 mb-5 bg-white rounded">
          <h3>09-03-2023</h3>
          <p>
            Mediclaim is Done By <strong>Tikam </strong> On 09-03-2023 is that
            Patient having Mediclaim of <strong> Ayushman Bharat </strong>
          </p>
        </div>
      </div>
      <div class="container-card timelineright">
        <div class="timelinecontent shadow-lg p-3 mb-5 bg-white rounded">
          <h3>09-03-2023</h3>
          <p>
            Exercise Shared for
            <strong
              >Isometric Quadricepts, Isometric Hemstring, Dynamic
              Quaads</strong
            >
            is shared by <strong>Tikam </strong> On 09-03-2023
          </p>
        </div>
      </div>

      <div class="container-card timelineleft">
        <div class="timelinecontent shadow-lg p-3 mb-5 bg-white rounded">
          <h3>09-03-2023</h3>
          <p>
            Investigation for
            <strong>X-Ray, Fitness Test, Blood Test, Scanogram</strong> is
            shared by <strong>Tikam </strong> On 09-03-2023
          </p>
        </div>
      </div>

      <div class="container-card timelineleft">
        <div class="timelinecontent shadow-lg p-3 mb-5 bg-white rounded">
          <h3>09-03-2023</h3>
          <p>
            Online Consultation for <strong>Knee Left </strong> is done by
            <strong>Tikam </strong> On 09-03-2023 and
            <strong> SVF </strong> Surgery is recomended and patient willing to
            get Surgery of <strong> SVF </strong> in
            <strong> Left Knee </strong>
          </p>
        </div>
      </div>

      <div class="container-card timelineright">
        <div class="timelinecontent shadow-lg p-3 mb-5 bg-white rounded">
          <h3>09-03-2023</h3>
          <p>
            OPD Consultation for <strong>Knee Left </strong> is done by
            <strong>Tikam </strong> On 09-03-2023 and
            <strong> SVF </strong> Surgery is recomended
          </p>
        </div>
      </div>

      <div class="container-card timelineleft">
        <div class="timelinecontent shadow-lg p-3 mb-5 bg-white rounded">
          <h3>09-03-2023</h3>
          <p>
            Follow up for <strong>X-Ray </strong> is done by
            <strong>Tikam </strong> On 09-03-2023
          </p>
        </div>
      </div>
      <div class="container-card timelineright">
        <div class="timelinecontent shadow-lg p-3 mb-5 bg-white rounded">
          <h3>09-03-2023</h3>
          <p>
            Follow up for <strong>Online Consultation </strong> is done by
            <strong>Tikam </strong> On 09-03-2023
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeLineTab",
  props: {
    msg: String,
  },
};
</script>

<style scoped lang="scss">
.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

/* The actual timeline (the vertical ruler) */
.timeline::after {
  content: "";
  position: absolute;
  width: 6px;
  background-color: #2db2d2;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}

/* Container around content */
.container-card {
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;
}

/* The circles on the timeline */
.container-card::after {
  content: "";
  position: absolute;
  width: 25px;
  height: 25px;
  right: -13px;
  background-color: white;
  border: 4px solid #2db2d2;
  top: 15px;
  border-radius: 50%;
  z-index: 1;
}

/* Place the container to the left */
.timelineleft {
  left: 0;
}

/* Place the container to the right */
.timelineright {
  left: 50%;
}

/* Add arrows to the left container (pointing right) */
.timelineright::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  right: 30px;
  border: medium solid white;
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent white;
}

/* Add arrows to the right container (pointing left) */
.timelineright::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  left: 30px;
  border: medium solid white;
  border-width: 10px 10px 10px 0;
  border-color: transparent white transparent transparent;
}

/* Fix the circle for containers on the right side */
.timelineright::after {
  left: -12px;
}

/* The actual content */
.timelinecontent {
  padding: 20px 30px;
  background-color: white;
  position: relative;
  border-radius: 6px;
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 600px) {
  /* Place the timelime to the left */
  .timeline::after {
    left: 31px;
  }

  /* Full-width containers */
  .container-card {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }

  /* Make sure that all arrows are pointing leftwards */
  .container-card::before {
    left: 60px;
    border: medium solid white;
    border-width: 10px 10px 10px 0;
    border-color: transparent white transparent transparent;
  }

  /* Make sure all circles are at the same spot */
  .timelineleft::after,
  .timelineright::after {
    left: 15px;
  }

  /* Make all right containers behave like the left ones */
  .timelineright {
    left: 0%;
  }

  .custom-select .custom-select-sm {
    width: -webkit-fill-available;
  }

  .nav-link {
    background-color: red;
  }
}
</style>
