<template>
  <div class="container-fluid">
    <ErrorModal
      @test="ShowErrModel = true"
      @close="ShowErrModel = false"
      :show="ShowErrModel"
      :msg="errmessage"
    />
    <div class="forms-container">
      <div class="signin-signup">
        <form
          action=""
          class="sign-in-form"
          v-if="otp_login"
          autocomplete="off"
        >
          <h2 class="title">Login</h2>

          <span v-if="countDown > 0"> Please Wait {{ countDown }} .. </span>

          <div class="input-field form-control">
            <i class="fas fa-user"></i>
            <input
              class="form-control"
              type="password"
              placeholder="Enter OTP"
              required="yes"
              name="otp"
              v-model="customer_otp"
              aria-label="otp"
            />
          </div>
          <p class="text-success">OTP is sent on your Registerd mobile no.</p>
          <br />
          <div class="col-sm-6">
            <div class="row justify-content-center">
              <div class="col">
                <input
                  type="button"
                  @click.prevent="submit_otp"
                  value="Verify OTP"
                  class="otpbtn rounded-pill"
                />
              </div>
              <div class="col" v-if="repeatotp">
                <input
                  type="button"
                  @click.prevent="Get_Otp"
                  value="Resend OTP"
                  class="resendotpbtn rounded-pill"
                />
              </div>
            </div>
          </div>
        </form>

        <form
          action=""
          @submit.prevent="submitForm"
          class="sign-in-form"
          autocomplete="off"
          v-else
        >
          <h2 class="title">Login</h2>
          <div class="input-field form-control">
            <i class="fas fa-user"></i>

            <input
              name="MobileNumber"
              class="form-control"
              :class="{
                valid: isValidMobileNumber,
                invalid: !isValidMobileNumber,
              }"
              v-model="mobile"
              type="text"
              @keyup="validateMobileNumber"
              placeholder="Registered Mobile No."
            />

            <br />
          </div>
          <span className="text-danger" v-if="!isValidMobileNumber">
            Invalid Mobile Number
          </span>
          <button
            @click.prevent="
              Get_Otp();
              countDownTimer();
            "
            class="btn solid"
          >
            Get Otp
          </button>
        </form>
      </div>
    </div>
    <div class="panels-container">
      <div class="panel left-panel">
        <img src="../assets/img/login_page_logo.png" class="image" alt="" />
        <div class="content"></div>
      </div>

      <div class="panel right-panel">
        <div class="content"></div>
        <img src="img/register.svg" class="image" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import ErrorModal from "@/components/modals/ErrorModel.vue";

export default {
  name: "LoginPage",
  components: {
    ErrorModal,
  },
  data() {
    return {
      username: "",
      mobile: "",
      password: "",
      customer_otp: "",
      otp_login: false,
      isValidMobileNumber: true,
      ShowErrModel: false,
      errmessage: "",
      countDown: 30,
      repeatotp: false,
    };
  },
  methods: {
    validateMobileNumber() {
      const validationRegex = /^\d{10}$/;
      if (this.mobile.match(validationRegex)) {
        this.isValidMobileNumber = true;
      } else {
        this.isValidMobileNumber = false;
      }
    },

    switchVisibility: function () {
      const passwordField = document.querySelector("#id_password");
      if (passwordField.getAttribute("type") === "password") {
        passwordField.setAttribute("type", "text");
      } else passwordField.setAttribute("type", "password");
    },
    Get_Otp: function () {
      const formdata = {
        phone: this.mobile,
      };
      axios
        .post("knee_lead.api.send_otp?phone=" + this.mobile)
        .then((response) => {
          if (response) {
            if (response.data.status_code == "200") {
              this.otp_login = true;
            } else {
              this.errmessage = response.data.message;
              this.ShowErrModel = true;
            }
          }
        })
        .catch((err) => {
          this.errmessage = err;
          this.ShowErrModel = true;
        });
    },
    submit_otp: function () {
      const formdata = {
        phone: this.mobile,
        otp: this.customer_otp,
      };
      axios
        .post("knee_lead.api.verify_otp_code", formdata)
        .then((response) => {
          const token =
            "token" +
            " " +
            response.data.data.key_details.api_key +
            ":" +
            response.data.data.key_details.api_secret;
          axios.defaults.headers.common["Authorization"] = "token" + token;
          this.$store.commit("setToken", token);
          localStorage.setItem("Authorization", token);
          localStorage.setItem("full_name", response.data.data.full_name);
          localStorage.setItem(
            "role",
            JSON.stringify(response.data.data.user_details)
          );
          localStorage.setItem(
            "role_details",
            JSON.stringify(response.data.data.role_details)
          );
          localStorage.setItem("status", "Open");
          if (localStorage.getItem("Authorization")) {
            this.$router.push("/lead");
          }
        })
        .catch((err) => {
          this.errmessage = "Invalid OTP";
          this.ShowErrModel = true;
        });
    },

    countDownTimer: function () {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.repeatotp = true;
      }
    },
  },
};
</script>

<style scoped>
:root {
  --bg-color: #f5f5f5;
  --bg-round-a: #4481eb;
  --bg-round-b: #04befe;
  --panel-color: #4a4a4a;
  --title: #444;
  --bg-input: #444;
  --input-icon: #8a8a8a;
  --input: #333;
  --input-hover: #222;
  --btn-color: #5995fd;
  --btn-text: #fff;
  --btn-hover: #4d84e2;
  --social-text: #444;
  --social-icon: #4481eb;
  --icon-color: #333;
  --check-text: #333;
  --check-hover: #333;
  --check-link: #4d84e2;
  --pass-color: #444;
  --key-color: #777;
  --pass-hover-color: #4d84e2;
  --keyboard-color: #e0e0e0;
  --key-letter: #333;
}

:root[data-theme="dark"] {
  --bg-color: #222;
  --bg-round-a: #4a4a4a;
  --bg-round-b: #2e2e2e;
  --panel-color: #fff;
  --title: #f2f2f2;
  --bg-input: #444;
  --input-icon: #ccc;
  --input: #ccc;
  --input-hover: #aaa;
  --btn-color: #333;
  --btn-text: #f2f2f2;
  --btn-hover: #444;
  --social-text: #ccc;
  --social-icon: #fff;
  --icon-color: #aaa;
  --check-text: #fff;
  --check-hover: #fff;
  --check-link: #5995fd;
  --pass-color: #fff;
  --pass-hover-color: #5995fd;
  --key-color: #f0f0f0;
  --keyboard-color: #444;
  --key-letter: #fff;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.container-fluid {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-color);
  overflow: hidden;
}

.container-fluid:before {
  content: "";
  position: absolute;
  width: 2000px;
  height: 2000px;
  border-radius: 50%;
  background: linear-gradient(-45deg, var(--bg-round-a), var(--bg-round-b));
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  z-index: 6;
  transition: 1.8s ease-in-out;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.signin-signup {
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
  width: 50%;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
  transition: 1s 0.7s ease-in-out;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 5rem;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  transition: 0.2s 0.7s ease-in-out;
}

form.sign-in-form {
  z-index: 2;
}

form.sign-up-form {
  z-index: 1;
  opacity: 0;
}

/* MODAL */

.btn-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: pink;
  font-size: 20px;
  color: white;
  padding: 10px 30px;
  cursor: pointer;
}

#popUpBox {
  width: 500px;
  overflow: hidden;
  background: pink;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  padding: 10px;
  text-align: center;
  display: none;
}

.title {
  font-size: 2.2rem;
  color: var(--title);
  margin-bottom: 10px;
}

.input-field {
  width: 60%;
  height: 55px;
  background-color: var(--bg-input);
  margin: 10px 0;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 70% 15%;
  /* padding: 1 0 0.4rem; */
  padding: 1rem;
}

.input-field i {
  text-align: center;
  line-height: 55px;
  color: var(--input-icon);
  font-size: 1.1rem;
}

.key {
  color: var(--key-color);
  text-decoration: none;
}

.key:hover {
  color: var(--pass-hover-color);
}

.pass {
  margin: 12px 0;
  color: var(--pass-color);
}

.pass:hover {
  color: var(--pass-hover-color);
}

#togglePassword {
  text-align: center;
  color: var(--input-icon);
}

#toggleReg {
  text-align: center;
  color: var(--input-icon);
}

.input-field input {
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--input);
}

.input-field input::placeholder {
  color: var(--input-hover);
  font-weight: 500;
}

.btn {
  width: 150px;
  height: 49px;
  border: none;
  outline: none;
  border-radius: 49px;
  cursor: pointer;
  background-color: var(--btn-color);
  color: var(--btn-text);
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  transition: 0.5s;
}

.otpbtn {
  width: 108px;
  height: 30px;
  border-radius: 49px;
  border-color: #1db0d0;
  cursor: pointer;
  background-color: #1db0d0;
  color: white;
  margin: 10px 0;
  transition: 0.5s;
}

.resendotpbtn {
  width: 108px;
  height: 30px;
  border-radius: 49px;
  border-color: #ffa500bf;
  cursor: pointer;
  background-color: #ffa500bf;
  color: white;
  margin: 10px 0;
  transition: 0.5s;
}

.btn:hover {
  background-color: gainsboro;
  /* var(--btn-hover); */
}

.solid {
  background: #1db0d0;
  color: white;
}

.check {
  display: block;
  position: relative;
  margin: 12px 0;
  cursor: pointer;
  font-size: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.checkmark {
  color: var(--check-text);
}

.checkmark a {
  color: var(--check-link);
  text-decoration: underline;
}

.checkmark a:hover {
  color: var(--check-hover);
}

.social-text {
  padding: 0.7rem 0;
  font-size: 1rem;
  color: var(--social-text);
}

.social-media {
  display: flex;
  justify-content: center;
}

.social-icon {
  height: 46px;
  width: 46px;
  border: 1px solid var(--icon-color);
  margin: 0 0.45rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: var(--icon-color);
  font-size: 1.1rem;
  border-radius: 50%;
  transition: 0.3s;
}

.social-icon:hover {
  color: var(--social-icon);
  border-color: var(--social-icon);
}

.icon-mode {
  height: 32px;
  width: 32px;
  border: 1px solid var(--icon-color);
  margin: 40px 5px 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: var(--icon-color);
  font-size: 1rem;
  border-radius: 50%;
  transition: 0.3s;
}

.icon-mode:hover {
  color: var(--social-icon);
  border-color: var(--social-icon);
}

.text-mode {
  padding: 0.5rem 0;
  font-size: 0.8rem;
  font-style: italic;
  color: var(--social-text);
}

.panels-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 7;
}

.left-panel {
  pointer-events: all;
  background: #1db0d0;
  padding: 3rem 17% 2rem 12%;

  /* border-top-right-radius: 1%; */
  border-bottom-right-radius: 100%;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}

.panel .content {
  color: var(--panel-color);
  transition: 0.9s 0.6s ease-in-out;
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 1.5rem;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

.btn.transparent {
  margin: 0;
  background: none;
  border: 2px solid #fff;
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8rem;
}

.image {
  width: 90%;
  margin-top: 10px;
  transition: 1.1s 0.4s ease-in-out;
}

.right-panel .content,
.right-panel .image {
  transform: translateX(800px);
}

/* ANIMATION */

.container-fluid.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}

.container-fluid.sign-up-mode .left-panel .image,
.container-fluid.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}

.container-fluid.sign-up-mode .right-panel .content,
.container-fluid.sign-up-mode .right-panel .image {
  transform: translateX(0px);
}

.container-fluid.sign-up-mode .left-panel {
  pointer-events: none;
}

.container-fluid.sign-up-mode .right-panel {
  pointer-events: all;
}

.container-fluid.sign-up-mode .signin-signup {
  left: 25%;
}

.container-fluid.sign-up-mode form.sign-in-form {
  z-index: 1;
  opacity: 0;
}

.container-fluid.sign-up-mode form.sign-up-form {
  z-index: 2;
  opacity: 1;
}

/* KEYBOARD */

.keyboard {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 5px 0;
  background: var(--keyboard-color);
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  user-select: none;
  transition: bottom 0.4s;
  z-index: 999;
}

.keyboard--hidden {
  bottom: -100%;
}

.keyboard__keys {
  text-align: center;
}

.keyboard__key {
  height: 45px;
  width: 6%;
  max-width: 90px;
  margin: 3px;
  border-radius: 4px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: var(--key-letter);
  font-size: 1.05rem;
  outline: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: top;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
  position: relative;
}

.keyboard__key:active {
  background: rgba(255, 255, 255, 0.12);
}

.keyboard__key--wide {
  width: 12%;
}

.keyboard__key--extra-wide {
  width: 36%;
  max-width: 500px;
}

.keyboard__key--activatable::after {
  content: "";
  top: 10px;
  right: 10px;
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
}

.keyboard__key--active::after {
  background: #08ff00;
}

.keyboard__key--dark {
  background: rgba(0, 0, 0, 0.25);
}

/* MEDIA SCREEN */

@media (max-width: 870px) {
  .container-fluid {
    min-height: 800px;
    height: 100vh;
  }

  .container-fluid::before {
    width: 1500px;
    height: 1500px;
    left: 30%;
    bottom: 68%;
    transform: translateX(-50%);
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }

  .signin-signup {
    width: 100%;
    left: 50%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }

  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
  }

  .panel .content {
    padding-right: 15%;
    transition: 0.9s 0.8s ease-in-out;
  }

  .panel h3 {
    font-size: 1.2rem;
  }

  .panel p {
    font-size: 0.7rem;
    padding: 0.5rem 0;
  }

  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7rem;
  }

  .image {
    display: none;
  }

  /*.image {
        width: 200px;
        transition: 0.9s 0.6s ease-in-out;
    }*/

  .left-panel {
    grid-row: 1 / 2;
  }

  .right-panel {
    grid-row: 3 / 4;
  }

  .right-panel .content,
  .right-panel .image {
    transform: translateY(300px);
  }

  .container-fluid.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .container-fluid.sign-up-mode .left-panel .image,
  .container-fluid.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }

  .container-fluid.sign-up-mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0);
    left: 50%;
  }

  .keyboard,
  .key {
    opacity: 0;
    visibility: hidden;
    font-size: 0.1px;
  }
}

@media (max-width: 570px) {
  form {
    padding: 0 1.5rem;
  }

  .image {
    display: none;
  }

  .panel .content {
    padding: 0.5rem 1rem;
  }

  .panel p {
    opacity: 0;
  }

  .container-fluid:before {
    bottom: 75%;
    left: 50%;
  }

  .container-fluid.sign-up-mode:before {
    bottom: 24%;
    left: 50%;
  }

  .field-icon {
    float: right;
    margin-left: 300px;
    margin-top: -55px;
    position: relative;
    z-index: 1;
  }
}

@media (max-width: 385px) {
  .field-icon {
    float: right;
    margin-left: 260px;
    margin-top: -55px;
    position: relative;
    z-index: 1;
  }
}

@media (max-width: 350px) {
  .field-icon {
    float: right;
    margin-left: 200px;
    margin-top: -55px;
    position: relative;
    z-index: 1;
  }
}
</style>
