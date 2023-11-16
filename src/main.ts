import { createApp } from 'vue'
import Viog from 'viog-ui'
import 'viog-ui/dist/viog-ui.css'
import './style.css'
import App from './App.vue'

createApp(App)
.use(Viog)
.mount('#app')
