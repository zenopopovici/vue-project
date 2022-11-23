import { createApp } from 'vue'
import App from './App.vue'

// Custom CSS
import './assets/main.css'

// Plugins
import { registerPlugins } from "@/plugins";
// Register plugins
const app = createApp(App);
registerPlugins(app);
