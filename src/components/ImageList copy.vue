<template>
  <v-card class="fill-height" flat density="compact" scrollable>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Image List</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-dots-vertical" @click="showFilters = !showFilters">
      </v-btn>
    </v-toolbar>
    <v-toolbar v-if="showFilters">
      <v-toolbar-title>Filters</v-toolbar-title>
      <v-autocomplete clearable prepend-inner-icon="mdi-account" :items="artists" v-model="selectedArtists" multiple
        label="Artists" density="compact"></v-autocomplete>
    </v-toolbar>
    <v-card-text>
      <v-list :lines="false" density="compact">
        <v-list-item v-for="(image, i) in filteredImages" :key="i" :value="image" active-color="primary"
          :title="imageTitle(image)">
          <template v-slot:prepend>
            <v-avatar rounded="0" size="x-large">
              <v-img :src="image.id"></v-img>
            </v-avatar>
          </template>

          <v-list-item-subtitle>
            {{ imageSubtitle(image) }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <div class="text-center">
        <v-pagination v-model="pageNumber" :length="totalPages" total-visible="10" rounded="circle"
          prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
      </div>
    </v-card-actions>
  </v-card>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import { ImageDatabase } from "@/types/ImageDatabase";
import { LocalImage } from "@/types/LocalImage";
import { DatabaseStats } from "@/types/DatabaseStats";

export default defineComponent({
  data() {
    return {
      pageNumber: 1,
      model: null as unknown as LocalImage,
      imageSize: 2,
      showFilters: false,
      selectedArtists: [],
      artists: [
        "Anna Dittman",
        "Van Gogh",
        "Francis Bacon",
        "William Blake",
        "Henry Bone",
      ],
    };
  },
  created() {
    ImageDatabase.initialise();
  },
  computed: {
    filteredImages: function (): LocalImage[] {
      return ImageDatabase.getFilteredPage({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        artistFilter: this.selectedArtists
      }
      )
    },
    totalPages: function () {
      return Math.ceil(this.filteredImages.length / this.pageSize);
    },
    pageSize: function (): number {
      return 24 / this.imageSize;
    },
  },
  methods: {
    imageTitle: function (image: LocalImage) {
      return image.metaData?.prompt;
    },
    imageSubtitle: function (image: LocalImage) {
      if (!image.metaData) return "";
      return Object.entries(image.metaData)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ");
    },
  },
});
</script>
  