<template>
  <v-card width="400" elevation="10">
    <!-- <v-toolbar>
      <v-toolbar-title>Image</v-toolbar-title>
    </v-toolbar> -->
    <v-card-text>
      <v-img :src="image.id" :alt="image.metaData?.prompt" cover></v-img>
      <v-text-field 
        readonly
        density="compact"
        label="Prompt"
        variant="solo"
        hide-details="auto"
        :model-value="image.metaData?.prompt"
        append-inner-icon="mdi-content-copy"
        @click:append-inner="copy(image.metaData?.prompt)"></v-text-field>
      <v-text-field 
        readonly
        density="compact"
        label="Model"
        variant="solo"
        hide-details="auto"
        :model-value="image.metaData?.model"></v-text-field>
      <v-text-field 
        readonly
        density="compact"
        label="Sampler"
        variant="solo"
        hide-details="auto"
        :model-value="image.metaData?.sampler"></v-text-field>
      <v-text-field 
        readonly
        density="compact"
        label="Seed"
        variant="solo"
        hide-details="auto"
        :model-value="image.metaData?.seed"
        append-inner-icon="mdi-content-copy"
        @click:append-inner="copy(image.metaData?.seed.toString())"></v-text-field>
      <v-text-field 
        readonly
        density="compact"
        label="CFG Scale"
        variant="solo"
        hide-details="auto"
        :model-value="image.metaData?.cfgScale"></v-text-field>
      <v-text-field 
        readonly
        density="compact"
        label="Steps"
        variant="solo"
        hide-details="auto"
        :model-value="image.metaData?.steps"></v-text-field>
    </v-card-text>
  </v-card>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import { ImageDatabase } from "@/types/ImageDatabase";
declare var navigator: Navigator

export default defineComponent({
  props: [ "imageId" ],
  data() {
    return {
      image: ImageDatabase.getById(this.imageId)
    };
  },
  methods: {
    copy: function(text: string | undefined) {
      if(!text) return
      navigator.clipboard.writeText(text);
    }
  },
  created() {
    ImageDatabase.initialise();
  },
});
</script>
  