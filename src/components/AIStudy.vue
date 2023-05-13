<template>
  <v-system-bar window>
    <v-spacer></v-spacer>
    <v-icon class="ms-2">mdi-account</v-icon>
    <span>{{ databaseStats.totalArtists }}</span>
    <v-icon class="ms-2">mdi-image</v-icon>
    <span>{{ databaseStats.totalImages }} / {{ imagesWatched }}</span>
    <v-icon class="ms-2">mdi-image-filter-vintage</v-icon>
    <span>{{ databaseStats.totalModifiers }}</span>
  </v-system-bar>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false">
    <v-list-item
      nav
      prepend-icon="mdi-image"
      title="AI Study">
      <template v-slot:append>
        <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
      </template>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item
        v-for="page in pages"
        link
        :key="page.title"
        :prepend-icon="page.icon"
        :title="page.title"
        @click="selectedPage = page.title">
        <!-- <v-icon>mdi-view-comfy</v-icon>
      <v-icon>mdi-view-list</v-icon> -->
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <!-- <Images v-if="selectedPage == 'Images'" /> -->
  <Images v-if="selectedPage == 'Images'" />
  <ImageList v-if="selectedPage == 'ImageList'" />
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
import { ImageWatcher } from '@/types/ImageWatcher'
import { DatabaseStats } from '@/types/DatabaseStats'

export default defineComponent({
  data() {
    return {
      drawer: true,
      rail: true,
      artists: artists,
      modifiers: modifiers,
      selectedPage: "Images",
      databaseStats: DatabaseStats,
      pages: [
        { title: "Images", icon: 'mdi-view-comfy' },
        { title: "ImageList", icon: 'mdi-view-list' },
        { title: "Artists", icon: 'mdi-account' },
        { title: "Modifiers", icon: 'mdi-image-filter-vintage' },
        // { title: "Subjects", icon: 'mdi-drawing' }
        // { title: "Samplers", icon: 'mdi-drawing' }
      ],
    }
  },
  created() {

  },
  computed: {
    imagesWatched: function () { return ImageWatcher.imageCount },
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
