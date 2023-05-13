<!-- A Vue component for lazy loading an image-->
<template>
  <div>
    <v-img :src="imageId" cover @click.stop="showImageDetailDialog = true">
    </v-img>
    <ImageDetailDialog :image-id="imageId"
    :show-image-detail-dialog="showImageDetailDialog"
    @close="showImageDetailDialog = false"></ImageDetailDialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ImageDatabase } from "@/types/ImageDatabase";
import ImageDetailDialog from './ImageDetailDialog.vue';

export default defineComponent({
  name: 'LazyImage',
  props: ["imageId"],
  data() {
    return {
      image: ImageDatabase.getById(this.imageId),
      showImageDetailDialog: false
    };
  },
  components: {
    ImageDetailDialog
},
});

</script>