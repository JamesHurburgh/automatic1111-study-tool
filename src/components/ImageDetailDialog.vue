<template>
  <v-dialog
    fullscreen
    persistent
    v-model="showImageDetailDialog">
    <v-card>
      <v-card-text class="ma-0 pa-0">
        <v-container fluid class="pa-0">
          <v-row
            class="ma-0 pa-0"
            no-gutters>
            <v-col cols="8">
              <v-img
                :src="image.id"
                :alt="image.metaData?.prompt"
                :height="$vuetify.display.height"
              ></v-img>
            </v-col>
            <v-col cols="4">
              <v-toolbar
                density="compact"
                color="primary">
                <v-toolbar-title>Image</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                  icon
                  @click.stop="close()">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-text-field auto-grow readonly density="compact" label="Prompt" hide-details="auto"
                :model-value="image.metaData?.prompt" append-inner-icon="mdi-content-copy"
                @click:append-inner="copy(image.metaData?.prompt)"></v-text-field>
              <v-text-field readonly density="compact" label="Model" hide-details="auto"
                :model-value="image.metaData?.model"></v-text-field>
              <v-text-field readonly density="compact" label="Sampler" hide-details="auto"
                :model-value="image.metaData?.sampler"></v-text-field>
              <v-text-field readonly density="compact" label="Seed" hide-details="auto"
                :model-value="image.metaData?.seed" append-inner-icon="mdi-content-copy"
                @click:append-inner="copy(image.metaData?.seed.toString())"></v-text-field>
              <v-text-field readonly density="compact" label="CFG Scale" hide-details="auto"
                :model-value="image.metaData?.cfgScale"></v-text-field>
              <v-text-field readonly density="compact" label="Steps" hide-details="auto"
                :model-value="image.metaData?.steps"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import { ImageDatabase } from "@/types/ImageDatabase";
import ImageDetail from "./ImageDetail.vue";

export default defineComponent({
  props: ["imageId", "showImageDetailDialog"],
  data() {
    return {
      image: ImageDatabase.getById(this.imageId),
    };
  },
  methods: {
    copy: function (text: string | undefined) {
      if (!text) return
      navigator.clipboard.writeText(text);
    },
    close() {
      console.log("Closing dialog!")
      this.$emit("close");
    }
  },
  created() {
    ImageDatabase.initialise();
  },
  components: {
    ImageDetail
  },
});
</script>
  