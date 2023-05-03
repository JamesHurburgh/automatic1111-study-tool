/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import { ImageDatabase } from './types/ImageDatabase'
import { ImageWatcher } from './types/ImageWatcher'
import { ImageDatabaseStats } from './types/ImageDatabaseStats'

const app = createApp(App)

registerPlugins(app)

await ImageDatabase.initialise()
ImageWatcher.initialise()

const worker = new Worker(new URL("./types/ImageWorker.ts", import.meta.url), { type : 'module' })
worker.postMessage({"INSTRUCTION" : "START"})

worker.onmessage = function(event) {
    const data = event.data // Data passed as parameter by the worker is retrieved from 'data' attribute
    ImageDatabaseStats.totalImages = data
  }

app.mount('#app')



