import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import IndexPage from '../views/Index.vue'
import LoginPage from '../views/Login.vue'
import DashBoard from '../views/DashBoard.vue'
import LeadPage from '../views/Lead.vue'
import LeadDetails from '../views/LeadDetails.vue'
import SharedLead from '../views/SharedLead.vue'

const routes = [
  {
    path: '/',
    name: 'IndexPage',
    component: DashBoard
  },
  {
    path: '/lead',
    name: 'LeadPage',
    component: LeadPage
  },
  {
    path: '/lead/:id',
    name: 'LeadDetails',
    component: LeadDetails
    

  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: DashBoard
  },
  
  {
    path: '/SharedLead',
    name: 'SharedLead',
    component: SharedLead
  },


  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
 
  
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
