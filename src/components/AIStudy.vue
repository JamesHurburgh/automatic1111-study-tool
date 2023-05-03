<template>
  <v-system-bar window>
    <v-spacer></v-spacer>
    <v-icon class="ms-2">mdi-account</v-icon> <span>{{ artists.length }}</span>
    <v-icon class="ms-2">mdi-image</v-icon>
    <span>{{ imageDatabaseStats.totalImages }} / {{ imagesWatched }}</span>
    <v-icon class="ms-2">mdi-image-filter-vintage</v-icon>
    <span>{{ modifiers.length }}</span>
  </v-system-bar>
  <v-navigation-drawer permanent>
    <v-list-item title="AI Study" subtitle="Diffusion prompts made easy">
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item v-for="page in pages" :key="page.title" link @click="selectedPage = page.title"
        :prepend-icon="page.icon" :title="page.title"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <!-- <Images v-if="selectedPage == 'Images'" /> -->
  <ImageList v-if="selectedPage == 'Images'" />
  <ArtistList v-if="selectedPage == 'Artists'" />
  <Modifiers v-if="selectedPage == 'Modifiers'" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Images from './Images.vue'
import ImageList from './ImageList.vue'
import ArtistList from './ArtistList.vue'
import Modifiers from './Modifiers.vue'
import artists from '../assets/artists.json'
import modifiers from '../assets/modifiers.json'
import { ImageDatabase } from '@/types/ImageDatabase';
import { ImageWatcher } from '@/types/ImageWatcher'
import { ImageDatabaseStats } from '@/types/ImageDatabaseStats'

export default defineComponent({
  data() {
    return {
      artists: artists,
      modifiers: modifiers,
      selectedPage: "Images",
      imageDatabaseStats: ImageDatabaseStats,
      pages: [
        { title: "Images", icon: 'mdi-image' },
        { title: "Artists", icon: 'mdi-account' },
        { title: "Modifiers", icon: 'mdi-image-filter-vintage' },
        // { title: "Subjects", icon: 'mdi-drawing' }
        // { title: "Samplers", icon: 'mdi-drawing' }
      ],
    }
  },
  created() {
    
  },
  computed:{
    imagesWatched: function() { return ImageWatcher.imageCount },
    // imagesLoaded: function() { 
    //   return ImageDatabase.reactive.total }
  },
  components: {
    Images,
    ImageList,
    ArtistList,
    Modifiers
  }
})
</script>
