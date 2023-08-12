<template>
  <Chat
    :height="'95%'"
    :width="'400px'"
    :bgColorIconImage="'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'"
    :onSend="handleSendEvent"
    :offline="wa_status"
    :chat="data"
    :bgColorHeader="darkTheme && '#6ddf97f2'"
    :bgColorChat="darkTheme && '#efeae2'"
    :bgColorInput="darkTheme && '#fff'"
    :bgColorIcon="darkTheme && '#25D366'"
    :bgColorMessageChatbot="darkTheme && '#fff'"
    :bgColorMessagePerson="darkTheme && '#98dd95b3'"
    :textColorMessagePerson="darkTheme && '#000000'"
    :bgColorMessageTimestamp="darkTheme && '#1e1e1e'"
    :textColorInput="darkTheme && '#808080'"
    :textColorHeader="darkTheme && '#fff'"
    :textColorMessageChatbot="darkTheme && '#000000'"
    :textColorMessageTimestamp="darkTheme && '#808080'"
  />
</template>
<script setup>
import axios from "axios";
import { ref } from "vue";
import { Chat } from "@chat-ui/vue3";

const props = defineProps({
  // Add your props here
  mobile: {
    type: String,
    default: () => $route.params.id,
  },
});

const data = ref([]);
const wa_status = ref(true);
const darkTheme = ref(true);

function handleSendEvent(input) {
  if (input == "") return;
  const messagePerson = {
    type: "person",
    timestamp: formatAMPM(new Date()),
    message: input,
  };

  const formdata = {
    mobile: props.mobile,
    text: input,
  };
  this.loading = !false;

  axios
    .post("knee_lead.double_tick_whatsapp.send_non_template_message", formdata)
    .then((response) => {})
    .catch((error) => {});

  data.value.push(messagePerson);

  setTimeout(async () => {
    await axios
      .get("knee_lead.whatsapp.get_whatsapp_chat", {
        params: {
          mobile: props.mobile,
        },
      })
      .then((response) => {
        if (response.data.interactive_message == "Yes") {
          wa_status = ref(false);
        } else {
          wa_status = ref(true);
        }
        data.value = [];
        for (let i in response.data.data) {
          if (response.data.data[i].type == "Incoming") {
            data.value.push({
              type: "chatbot",
              timestamp: formatAMPM(new Date()),
              message:
                response.data.data[i].message + response.data.data[i].attach,
            });
          }
          if (response.data.data[i].type == "Outgoing") {
            data.value.push({
              type: "person",
              timestamp: formatAMPM(new Date()),
              message: response.data.data[i].message,
            });
          }
        }
      })
      .catch((error) => {});
  }, 1000);
}

var time = 1;

async function send_message() {
  const formdata = {
    mobile: props.mobile,
    text: input,
  };
  this.loading = !false;

  await axios
    .post("knee_lead.double_tick_whatsapp.send_non_template_message", formdata)
    .then((response) => {})
    .catch((error) => {});
}

async function get_messages() {
  await axios
    .get("knee_lead.whatsapp.get_whatsapp_chat", {
      params: {
        mobile: props.mobile,
      },
    })
    .then((response) => {
      data.value = [];
      for (let i in response.data.data) {
        if (response.data.data[i].message) {
          if (response.data.data[i].type == "Incoming") {
            data.value.push({
              type: "chatbot",
              timestamp: formatAMPM(new Date(response.data.data[i].creation)),
              message: response.data.data[i].message,
            });
          }
          if (response.data.data[i].type == "Outgoing") {
            data.value.push({
              type: "person",
              timestamp: formatAMPM(new Date(response.data.data[i].creation)),
              message: response.data.data[i].message,
            });
          }
        }
      }
    })
    .catch((error) => {});
}

get_messages();
function getRandomNumber() {
  return Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
}

function formatAMPM(date) {
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime =
    day +
    "/" +
    (month + 1) +
    "/" +
    year +
    "  " +
    hours +
    ":" +
    minutes +
    " " +
    ampm;
  return strTime;
}
</script>
<style></style>
