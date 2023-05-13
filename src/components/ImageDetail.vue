<template>
  <v-container fluid class="primary fill-height pa-0">
    <v-row  fluid class="fill-height ma-0 pa-0" no-gutters>
      <v-col cols="8" no-gutters>
        <!-- <v-row class="fill-height" justify="center" align="center" :style="`background-image: url(${image.id}); background-size: cover;`">

        </v-row> -->
        <img :src="image.id" :alt="image.metaData?.prompt" />
      </v-col>
      <v-col cols="4">
        <v-toolbar dense 
      dark
      color="primary">
            <v-toolbar-title>Images</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon @click.stop="close()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
        </v-toolbar>
        <v-textarea readonly density="compact" label="Prompt" hide-details="auto" :model-value="image.metaData?.prompt"
          append-outer-icon="mdi-content-copy" @click:append-outer="copy(image.metaData?.prompt)"></v-textarea>
        <v-text-field readonly density="compact" label="Model" hide-details="auto"
          :model-value="image.metaData?.model"></v-text-field>
        <v-text-field readonly density="compact" label="Sampler" hide-details="auto"
          :model-value="image.metaData?.sampler"></v-text-field>
        <v-text-field readonly density="compact" label="Seed" hide-details="auto" :model-value="image.metaData?.seed"
          append-inner-icon="mdi-content-copy" @click:append-inner="copy(image.metaData?.seed.toString())"></v-text-field>
        <v-text-field readonly density="compact" label="CFG Scale" hide-details="auto"
          :model-value="image.metaData?.cfgScale"></v-text-field>
        <v-text-field readonly density="compact" label="Steps" hide-details="auto"
          :model-value="image.metaData?.steps"></v-text-field>

      </v-col>
    </v-row>
  </v-container>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import { ImageDatabase } from "@/types/ImageDatabase";
declare var navigator: Navigator

export default defineComponent({
  props: ["imageId"],
  data() {
    return {
      image: ImageDatabase.getById(this.imageId)
    };
  },
  methods: {
    copy: function (text: string | undefined) {
      if (!text) return
      navigator.clipboard.writeText(text);
    },
  },
  created() {
    ImageDatabase.initialise();
  },
});
</script>
<style>
img{ 
    height:90%; 
    } 
</style>