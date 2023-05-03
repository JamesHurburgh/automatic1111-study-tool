<template>
  <v-card class="fill-height" scrollable flat density="compact">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Artist List</v-toolbar-title>
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
        <v-list-item v-for="(artist, i) in filteredArtists" :key="i" :value="artist" active-color="primary"
          :title="artistTitle(artist)">
          <template v-slot:prepend>
            <v-avatar rounded="0" size="x-large">
              <!-- <v-img :src="artist.id"></v-img> -->
            </v-avatar>
          </template>

          <v-list-item-subtitle>
            {{ artistSubtitle(artist) }}
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
import { ArtistDatabase } from "@/types/ArtistDatabase";
import { Artist } from "@/types/Artist";

export default defineComponent({
  data() {
    return {
      pageNumber: 1,
      model: null as unknown as Artist,
      artistSize: 2,
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
    ArtistDatabase.initialise();
  },
  computed: {
    filteredArtists: function (): Artist[] {
      return ArtistDatabase.getFilteredPage({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      }
      )
    },
    totalPages: function () {
      return Math.ceil(this.filteredArtists.length / this.pageSize);
    },
    pageSize: function (): number {
      return 24 / this.artistSize;
    },
  },
  methods: {
    artistTitle: function (artist: Artist) {
      return artist.name
    },
    artistSubtitle: function (artist: Artist) {
      return `${artist.movement} ${artist.style}`
    },
  },
});
</script>
  