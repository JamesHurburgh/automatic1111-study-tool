<template>
  <v-card class="fill-height" scrollable flat density="compact">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Image List</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn icon="mdi-dots-vertical" @click="showFilters = !showFilters">
    </v-btn>
    </v-toolbar>
    <v-toolbar v-if="showFilters">
      <v-toolbar-title>Filters</v-toolbar-title>
      <v-select
        prepend-inner-icon="mdi-account"
        :items="artists"
        multiple
        label="Artists"
      ></v-select>
    </v-toolbar>
    <v-card-text>
      <v-list :lines="false" density="compact">
        <v-list-item
          v-for="(image, i) in images"
          :key="i"
          :value="image"
          active-color="primary"
          :title="imageTitle(image)"
        >
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
        <v-pagination
          v-model="pageNumber"
          :length="totalPages"
          total-visible="10"
          rounded="circle"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
        ></v-pagination>
      </div>
    </v-card-actions>
  </v-card>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import { ImageDatabase } from "@/types/ImageDatabase";
import { LocalImage } from "@/types/LocalImage";
import { ImageDatabaseStats } from "@/types/ImageDatabaseStats";

export default defineComponent({
  data() {
    return {
      pageNumber: 1,
      model: null as unknown as LocalImage,
      imageSize: 2,
      showFilters: false,
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
    images: function () {
      var page = ImageDatabase.dao.getPage<LocalImage>(
        this.pageNumber,
        this.pageSize
      );
      return page;
    },
    totalPages: function () {
      return Math.ceil(ImageDatabaseStats.totalImages / this.pageSize);
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
  