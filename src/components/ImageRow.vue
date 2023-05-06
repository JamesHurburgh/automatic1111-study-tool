<template>
  <v-item-group selected-class="bg-primary">
    <v-container>
      <v-responsive class="d-flex align-center text-center fill-height">
        <v-row no-gutters>
          <v-col v-for="image in images" :key="image.id" cols="4" md="1">
            <v-img :src="image.id" :alt="image.metaData?.prompt" cover @click.stop="viewImage(image.id)">
            </v-img>
              <v-dialog v-model="imageDetailDialog" max-width="400">
                <ImageDetail :image-id="selectedImage"></ImageDetail>
              </v-dialog>
          </v-col>
        </v-row>
      </v-responsive>
    </v-container>
  </v-item-group>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import { ImageDatabase } from "@/types/ImageDatabase";
import { LocalImage } from "@/types/LocalImage";
import ImageDetail from "./ImageDetail.vue";

export default defineComponent({
  props: ['artistName'],
  data() {
    return {
      imageDetailDialog: false,
      selectedImage: ""
    };
  },
  created() {
    ImageDatabase.initialise();
  },
  methods: {
    viewImage: function (imageId: string){
      this.imageDetailDialog = true
      this.selectedImage = imageId
    }
  },
  computed: {
    images: function (): LocalImage[] {
      return ImageDatabase.getFilteredPage({
        pageNumber: 1,
        pageSize: 100,
        artistFilter: [this.artistName]
      }
      )
    },
  },
  components: {
    ImageDetail
  },
});
</script>
  