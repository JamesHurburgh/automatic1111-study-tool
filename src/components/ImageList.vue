<template>
  <v-card class="fill-height" scrollable>
        <v-toolbar color="primary" dark>
      <v-toolbar-title>Image List</v-toolbar-title>
    </v-toolbar>
    <v-card-text class="fill-height flex-grow-1" style="overflow-y: auto;">
      <!-- <v-list>
        <v-list-item v-for="(image, i) in filteredImages" :key="i" :value="image" active-color="primary"
          :title="imageTitle(image)">
        </v-list-item>
      </v-list> -->
      <v-data-table-virtual :custom-filter="filterImages" v-model:items-per-page="pageSize" :headers="headers"
        fixed-header :items="images" :search="promptSearch" height="400" class="elevation-1">
        <template v-slot:top>
          <v-text-field v-model="promptSearch" append-inner-icon="mdi-magnify" label="Search by prompt"></v-text-field>
        </template>
        <template v-slot:item.id="{ item }">
          <v-img :src="item.value" cover></v-img>
        </template>
        <!-- <template v-slot:item.raw="{ item }">
          {{  item.raw.metaData?.raw }}
        </template> -->

      </v-data-table-virtual>
    </v-card-text>
    <v-card-actions>
      <div class="text-center">
        <v-pagination v-model="pageNumber" :length="totalPages" total-visible="10"></v-pagination>
      </div>
    </v-card-actions>
  </v-card>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import { ImageDatabase } from "@/types/ImageDatabase";
import { LocalImage } from "@/types/LocalImage";
import { DatabaseStats } from "@/types/DatabaseStats";
import { VDataTable } from 'vuetify/labs/VDataTable'
import { VDataTableVirtual } from 'vuetify/labs/VDataTable'


export default defineComponent({
  data() {
    return {
      pageNumber: 1,
      model: null as unknown as LocalImage,
      imageSize: 2,
      showFilters: false,
      selectedArtists: [],
      promptSearch: "",
      images: ImageDatabase.getAll().map(image => ({
        id: image.id,
        prompt: image.metaData?.prompt,
        model: image.metaData?.model,
        sampler: image.metaData?.sampler,
        seed: image.metaData?.seed,
        steps: image.metaData?.steps,
      })),
      headers: [
        {
          title: 'Image',
          align: 'start',
          sortable: false,
          key: 'id',
          value: 'id',
        },
        { title: 'Prompt', align: 'end', value: 'prompt' },
        { title: 'Model', align: 'end', value: 'model' },
        { title: 'Sampler', align: 'end', value: 'sampler' },
        { title: 'Seed', align: 'end', value: 'seed' },
        { title: 'Raw', align: 'end', key: 'raw' },
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
    filterImages(value: string, query: string, item?: any) {
      // console.log("filter")
      return item.raw.metaData?.prompt &&
        value != null &&
        query != null &&
        // typeof value === 'string' &&
        (
          item.raw.metaData?.prompt.toLowerCase().indexOf(query.toLowerCase()) !== -1
          //   ||
          // item.raw.metaData?.seed.toLowerCase().indexOf(query.toLowerCase()) !== -1
        )
    },
  },
  components: {
    VDataTable,
    VDataTableVirtual
  }
});
</script>
  