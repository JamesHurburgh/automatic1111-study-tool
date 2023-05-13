<template>
  <v-card class="fill-height" scrollable flat density="compact">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Artists</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-plus" @click="addArtistDialog = !addArtistDialog">
      </v-btn>
      <v-btn icon="mdi-dots-vertical" @click="showFilters = !showFilters">
      </v-btn>
    </v-toolbar>
    <v-toolbar v-if="showFilters">
      <v-toolbar-title>Filters</v-toolbar-title>

    </v-toolbar>
    <v-card-text>
      <v-data-table
        v-model:items-per-page="pageSize"
        :headers="headers"
        :items="artists"
        density="compact"
        show-expand
        item-value="name"
        :search="artistSearch"
        class="elevation-1">
        <template v-slot:top>
          <v-text-field
            v-model="artistSearch"
            append-inner-icon="mdi-magnify"
            label="Search by an artists name"
          ></v-text-field>
        </template>
        <template v-slot:expanded-row="{ columns, item }">
          <tr>
            <td :colspan="columns.length">
              <ImageRow :artist-name="item.raw.name"></ImageRow>
            </td>
          </tr>
        </template>
      </v-data-table>

      <!-- <v-virtual-scroll :items="filteredArtists" class="fill-height">
        <template v-slot:default="{ item }">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-avatar class="ms-2">
                  <v-img :src="artistAvatar(item)"></v-img>
                </v-avatar>
                <span>
                  {{ artistTitle(item) }}
                  {{ artistSubtitle(item) }}
                </span>
                <v-icon>mdi-image</v-icon>
                <span>{{ artistImageCount(item) }}</span>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <ImageRow :artist-name="item.name"></ImageRow>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
      </v-virtual-scroll> -->
    </v-card-text>
    <v-card-actions>
      <div class="text-center">
        <!-- <v-pagination v-model="pageNumber" :length="totalPages" total-visible="10" rounded="circle"
          prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination> -->
      </div>
    </v-card-actions>
    <v-dialog v-model="addArtistDialog" width="800">
      <ArtistUploadDialog></ArtistUploadDialog>
    </v-dialog>
  </v-card>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import { ArtistDatabase } from "@/types/ArtistDatabase";
import { Artist } from "@/types/Artist";
import ArtistUploadDialog from "./ArtistUploadDialog.vue"
import ImageRow from "./ImageRow.vue"
import { ImageDatabase } from "@/types/ImageDatabase";
import { VDataTable } from 'vuetify/labs/VDataTable'

export default defineComponent({
  data() {
    return {
      pageNumber: 1,
      model: null as unknown as Artist,
      pageSize: 10,
      showFilters: false,
      addArtistDialog: false,
      selectedArtists: [],
      imageDetailDialog: false,
      selectedImage: "",
      artistSearch: "",
      artists: ArtistDatabase.getArtists(),
      headers: [
        { title: 'Name', value: 'name' },
        { title: 'Movement', value: 'movement' },
        { title: 'Style', value: 'style' },
        { title: 'Image Count', value: 'imageCount' },
      ],
    };
  },
  created() {
    ArtistDatabase.initialise();
  },
  computed: {
    filteredArtists: function (): Artist[] {
      ArtistDatabase.initialise()
      return ArtistDatabase.getFilteredPage({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      }
      )
    },
    totalPages: function () {
      return Math.ceil(ArtistDatabase.getArtists().length / this.pageSize);
    },
  },
  methods: {
    artistTitle: function (artist: Artist) {
      return artist.name
    },
    artistSubtitle: function (artist: Artist) {
      const imageCount = ImageDatabase.getFilteredPage({ pageNumber: 1, pageSize: 1000, artistFilter: [artist.name] }).length
      return `${artist.movement} ${artist.style}`
    },
    artistImageCount: function (artist: Artist) {
      return ImageDatabase.getFilteredPage({ pageNumber: 1, pageSize: 1000, artistFilter: [artist.name] }).length
    },
    artistAvatar: function (artist: Artist) {
      const image = ImageDatabase.getFilteredPage({ pageNumber: 1, pageSize: 1, artistFilter: [artist.name] })[0]
      if (image) return image.id
      return ""
    },
  },
  components: {
    ArtistUploadDialog,
    ImageRow,
    VDataTable
}
});
</script>
  