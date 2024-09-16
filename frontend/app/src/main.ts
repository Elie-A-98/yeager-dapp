import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

app.mount('#app')


app.config.errorHandler = (err)=>{
    alert('An error occured.')
    
    //log the error to a remote server
    
    return false
}