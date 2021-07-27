import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import axios from 'axios'

axios.defaults.baseURL = 'https://quizz-django.herokuapp.com'

createApp(App).use(store).use(router,axios).mount('#app')
