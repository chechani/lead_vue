import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import '@fortawesome/fontawesome-free/js/all'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import moment from 'moment';
axios.defaults.baseURL = "https://lead.kneexpert.in/api/method/"
createApp(App).use(store).use(router,axios,VueAwesomePaginate).component('VueDatePicker', VueDatePicker).mount('#app')
import "bootstrap/dist/js/bootstrap.js"

